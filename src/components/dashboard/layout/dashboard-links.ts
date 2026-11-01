
import {
  LayoutDashboard,
  UserRound,
  CalendarPlus,
  CalendarRange,
  BookmarkCheck,
} from "lucide-react";

export const dashboardGroups = [
  {
    label: "Workspace",
    links: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "My Profile",
        href: "/dashboard/profile",
        icon: UserRound,
      },
    ],
  },
  {
    label: "Event Management",
    links: [
      {
        label: "Create Event",
        href: "/dashboard/create-event",
        icon: CalendarPlus,
      },
      {
        label: "Manage Events",
        href: "/dashboard/manage-events",
        icon: CalendarRange,
      },
      {
        label: "Joined Events",
        href: "/dashboard/joined-events",
        icon: BookmarkCheck,
      },
    ],
  },
];

export function isActiveRoute(
  pathname: string,
  href: string
) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export function getDashboardTitle(pathname: string) {
  const links = dashboardGroups.flatMap(
    (group) => group.links
  );

  return (
    links.find((link) =>
      isActiveRoute(pathname, link.href)
    )?.label ?? "Dashboard"
  );
}
