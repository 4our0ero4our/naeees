import { 
    FaHome, FaBook, FaChartLine, FaCalendarAlt, FaComments, 
    FaCloudUploadAlt, FaFolderOpen, FaUsers, FaUserShield 
  } from "react-icons/fa";
  
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
  
    // --- ADMIN ONLY ---
    { 
      title: "Upload Material", 
      href: "/dashbaord/materials/upload", 
      icon: <FaCloudUploadAlt />, 
      roles: ["admin", "super_admin"] 
    },
    { 
      title: "Manage Files", 
      href: "/dashbaord/materials/manage", 
      icon: <FaFolderOpen />, 
      roles: ["admin", "super_admin"] 
    },
  
    // --- SUPER ADMIN ONLY ---
    { 
      title: "User Management", 
      href: "/dashbaord/admin/users", 
      icon: <FaUsers />, 
      roles: ["super_admin"] 
    },
    { 
      title: "Access Control", 
      href: "/dashbaord/admin/access", 
      icon: <FaUserShield />, 
      roles: ["super_admin"] 
    },
  ];
  
  export const getNavItemsByRole = (role: UserRole) => {
    return DASHBOARD_NAV.filter(item => item.roles.includes(role));
  };