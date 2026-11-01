
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function leaveJoinedEvent(eventId: string) {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return {
        success: false,
        message: "Unauthorized! Please login again.",
      };
    }

    const response = await fetch(
      `${API_URL}/api/my-joined-events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to leave event!",
      };
    }

    revalidatePath("/dashboard/joined-events");
    revalidatePath(`/upcoming-events/${eventId}`);

    return {
      success: true,
      message: "Successfully left the event!",
    };
  } catch (error) {
    console.error("Leave event error:", error);

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}
