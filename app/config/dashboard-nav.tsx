import {
  FaHome, FaBook, FaChartLine, FaCalendarAlt, FaComments,
  FaUsers, FaBullhorn, FaHistory, FaUserCircle, FaBell
} from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";

export type UserRole = "student" | "admin" | "super_admin";

// Define the menu items with their allowed roles
export const DASHBOARD_NAV = [
  // --- COMMON (Everyone) ---
  {
    title: "Overview",
    href: "/dashbaord",
    icon: <FaHome />,
    roles: ["student", "admin", "super_admin"]
  },
  {
    title: "Academic Materials",
    href: "/dashbaord/materials",
    icon: <FaBook />,
    roles: ["student", "admin", "super_admin"]
  },
  {
    title: "CGPA Tracker",
    href: "/dashbaord/cgpa",
    icon: <FaChartLine />,
    roles: ["student", "admin", "super_admin"]
  },
  {
    title: "Events",
    href: "/dashbaord/events",
    icon: <FaCalendarAlt />,
    roles: ["student", "admin", "super_admin"]
  },
  {
    title: "Forum",
    href: "/dashbaord/forum",
    icon: <FaComments />,
    roles: ["student", "admin", "super_admin"]
  },
  {
    title: "Announcements",
    href: "/dashbaord/announcements",
    icon: <FaBullhorn />,
    roles: ["student", "admin", "super_admin"]
  },
  {
    title: "Notifications",
    href: "/dashbaord/notifications",
    icon: <FaBell />,
    roles: ["student", "admin", "super_admin"]
  },

  // --- SUPER ADMIN ONLY ---
  {
    title: "User Management",
    href: "/dashbaord/admin/users",
    icon: <FaUsers />,
    roles: ["super_admin"]
  },
  {
    title: "Activity Log",
    href: "/dashbaord/admin/activity",
    icon: <FaHistory />,
    roles: ["super_admin"]
  },

  // --- ACCOUNT ---
  {
    title: "Profile",
    href: "/dashbaord/profile",
    icon: <FaUserCircle />,
    roles: ["student", "admin", "super_admin"]
  }
];

export const getNavItemsByRole = (role?: UserRole | string | null) => {
  if (!role) return [];
  return DASHBOARD_NAV.filter(item => item.roles.includes(role as UserRole));
};
