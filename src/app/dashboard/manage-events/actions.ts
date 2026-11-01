
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { UpdateEventData } from "@/components/dashboard/manage-events/types";



const API_URL =
  process.env.API_URL;

async function sendRequest(
  id: string,
  method: "PATCH" | "DELETE",
  data?: UpdateEventData
) {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      throw new Error("Please log in again.");
    }

    const response = await fetch(
      `${API_URL}/api/events/${id}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(data
            ? { "Content-Type": "application/json" }
            : {}),
        },
        body: data ? JSON.stringify(data) : undefined,
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Request failed."
      );
    }

    revalidatePath("/dashboard/manage-events");

    return {
      success: true,
      message: result.message || "Success!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
}

export async function updateManagedEvent(
  id: string,
  data: UpdateEventData
) {
  return sendRequest(id, "PATCH", data);
}

export async function deleteManagedEvent(id: string) {
  return sendRequest(id, "DELETE");
}
