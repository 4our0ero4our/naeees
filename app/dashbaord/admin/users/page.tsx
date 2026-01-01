"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaTrash, FaUserShield, FaCheckCircle, FaBan } from "react-icons/fa";

const users = [
  { id: 1, name: "John Doe", email: "john@uni.edu.ng", role: "Student", status: "Active", membership: "Verified" },
  { id: 2, name: "Jane Smith", email: "jane@uni.edu.ng", role: "Admin", status: "Active", membership: "Verified" },
  { id: 3, name: "Sam Wilson", email: "sam@uni.edu.ng", role: "Student", status: "Inactive", membership: "Pending" },
];

export default function UserManagementPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-heading font-black text-3xl text-black">User Management</h1>
            <p className="text-gray-600 font-medium">Manage student access and admin privileges.</p>
        </div>
        <div className="bg-[#EAB308]/20 text-[#EAB308] px-4 py-2 rounded-lg font-bold border border-[#EAB308] text-sm">
            Super Admin Access
        </div>
      </div>

      {/* --- ADD ADMIN SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black text-white p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#22C55E]"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FaUserPlus className="text-[#22C55E]" /> Grant Admin Access
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
            <input type="email" placeholder="Enter user email address" className="flex-1 bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#22C55E] focus:outline-none" />
            <select className="bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#22C55E] focus:outline-none">
                <option className="text-black" value="admin">Admin</option>
                <option className="text-black" value="super_admin">Super Admin</option>
            </select>
            <button className="bg-[#22C55E] text-black px-6 py-3 rounded-lg font-black uppercase tracking-wide hover:bg-[#EAB308] transition-colors">
                Grant Access
            </button>
        </div>
      </motion.div>

      {/* --- USER TABLE --- */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">User Info</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Role</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Membership</th>
                        <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                                <p className="font-bold text-black">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-4">
                                <span className={`flex items-center gap-1 text-xs font-bold ${user.membership === 'Verified' ? 'text-green-600' : 'text-orange-500'}`}>
                                    {user.membership === 'Verified' ? <FaCheckCircle /> : <FaUserShield />}
                                    {user.membership}
                                </span>
                            </td>
                            <td className="p-4 flex gap-2">
                                <button title="Promote" className="p-2 border border-gray-200 rounded hover:bg-black hover:text-white transition-colors"><FaUserShield /></button>
                                <button title="Disable" className="p-2 border border-gray-200 rounded hover:bg-red-50 text-red-500 transition-colors"><FaBan /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}