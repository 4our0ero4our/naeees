
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUsers, FaUserShield, FaUserGraduate, FaSearch, FaUserPlus,
    FaEllipsisV, FaCheckCircle, FaBan, FaArrowLeft, FaArrowRight
} from "react-icons/fa";
import CustomAlert from "@/app/components/CustomAlert";

export default function UserManagementPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isSuperAdmin = (session?.user as any)?.role === "super_admin";

    // State
    const [users, setUsers] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, students: 0, admins: 0, superAdmins: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [membershipFilter, setMembershipFilter] = useState("");

    // Modals
    const [promotionModalOpen, setPromotionModalOpen] = useState(false);
    const [promoteEmail, setPromoteEmail] = useState("");

    // Confirmation for Demote
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; type: "demote" | "promote" | "status"; data: any } | null>(null);

    const [alert, setAlert] = useState<any>(null);

    // Initial Fetch
    useEffect(() => {
        if (status === "loading") return;
        if (!isSuperAdmin) {
            router.push("/dashbaord");
            return;
        }
        fetchUsers();
    }, [status, isSuperAdmin, page, searchTerm, roleFilter, membershipFilter]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/superadmin/users", {
                params: { page, limit: 10, search: searchTerm, role: roleFilter, membership: membershipFilter }
            });
            if (res.data.success) {
                setUsers(res.data.data);
                setStats(res.data.stats || stats);
                setTotalPages(res.data.meta.totalPages);
            }
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.patch("/api/superadmin/users/promote", { email: promoteEmail });
            if (res.data.success) {
                setPromotionModalOpen(false);
                setPromoteEmail("");
                setAlert({ isOpen: true, type: "success", title: "Success", message: res.data.message });
                fetchUsers();
            }
        } catch (error: any) {
            setAlert({ isOpen: true, type: "error", title: "Error", message: error.response?.data?.message || "Failed" });
        }
    };

    const handleDemote = async (userId: string) => {
        try {
            const res = await axios.patch("/api/superadmin/users/demote", { userId });
            if (res.data.success) {
                setConfirmModal(null);
                setAlert({ isOpen: true, type: "success", title: "Success", message: res.data.message });
                fetchUsers();
            }
        } catch (error: any) {
            setAlert({ isOpen: true, type: "error", title: "Error", message: error.response?.data?.message || "Failed" });
        }
    };

    const handleStatusToggle = async (userId: string, isActive: boolean) => {
        try {
            const res = await axios.patch("/api/superadmin/users/status", { userId, isActive });
            if (res.data.success) {
                fetchUsers(); // Refresh to show new status
            }
        } catch (error: any) {
            setAlert({ isOpen: true, type: "error", title: "Error", message: error.response?.data?.message || "Failed" });
        }
    };

    if (status === "loading" || !isSuperAdmin) return null; // Or loading spinner

    return (
        <div className="space-y-8 w-full pb-20">
            {alert && (
                <CustomAlert
                    isOpen={alert.isOpen}
                    onClose={() => setAlert(null)}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                />
            )}

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black font-heading text-black tracking-tight">User Management</h1>
                    <p className="text-gray-500 font-bold mt-1">Manage platform users, assign roles, and control access.</p>
                </div>
                <button
                    onClick={() => setPromotionModalOpen(true)}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:shadow-[6px_6px_0px_0px_#22C55E] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                >
                    <FaUserPlus /> Add Admin
                </button>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.total} icon={<FaUsers />} color="bg-blue-100" textColor="text-blue-600" />
                <StatCard title="Students" value={stats.students} icon={<FaUserGraduate />} color="bg-gray-100" textColor="text-gray-600" />
                <StatCard title="Admins" value={stats.admins} icon={<FaUserShield />} color="bg-purple-100" textColor="text-purple-600" />
                <StatCard title="Super Admins" value={stats.superAdmins} icon={<FaUserShield />} color="bg-yellow-100" textColor="text-yellow-600" />
            </div>

            {/* --- MAIN CONTENT (SEARCH & TABLE) --- */}
            <div className="bg-white border-3 border-black rounded-2xl shadow-[8px_8px_0px_0px_black] overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b-2 border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or matric..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none font-medium"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {/* Role Filter */}
                        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                            {["all", "student", "admin"].map(role => (
                                <button
                                    key={role}
                                    onClick={() => setRoleFilter(role === "all" ? "" : role)}
                                    className={`px-3 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-wider transition-all ${(roleFilter === role || (role === "all" && roleFilter === ""))
                                        ? "bg-white text-black shadow-sm"
                                        : "text-gray-500 hover:text-black"
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>

                        {/* Membership Filter */}
                        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                            {["all", "member", "pending", "non-member"].map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMembershipFilter(m === "all" ? "" : m)}
                                    className={`px-3 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-wider transition-all ${(membershipFilter === m || (m === "all" && membershipFilter === ""))
                                        ? "bg-white text-black shadow-sm"
                                        : "text-gray-500 hover:text-black"
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b-2 border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">User</th>
                                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Role</th>
                                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Membership</th>
                                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Status</th>
                                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Joined</th>
                                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">No users found.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                                    {user.fullName?.[0] || "?"}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{user.fullName}</p>
                                                    <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                                                    {user.matricNumber && <p className="text-[10px] text-gray-400 font-mono mt-0.5">{user.matricNumber}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge role={user.role} />
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.membershipStatus === 'member'
                                                ? "bg-green-50 text-green-600"
                                                : user.membershipStatus === 'pending'
                                                    ? "bg-orange-50 text-orange-600"
                                                    : "bg-gray-50 text-gray-400"
                                                }`}>
                                                {user.membershipStatus}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => user.role !== 'super_admin' && handleStatusToggle(user._id, !user.isActive)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-2 transition-all ${user.isActive
                                                    ? "bg-green-100 text-green-700 border-green-200 hover:border-green-400"
                                                    : "bg-red-100 text-red-700 border-red-200 hover:border-red-400"
                                                    } ${user.role === 'super_admin' ? 'cursor-not-allowed opacity-70' : ''}`}
                                                disabled={user.role === 'super_admin'}
                                            >
                                                {user.isActive ? <><FaCheckCircle size={10} /> Active</> : <><FaBan size={10} /> Suspended</>}
                                            </button>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            {user.role !== 'super_admin' && (
                                                <div className="flex justify-end gap-2">
                                                    {user.role === 'student' ? (
                                                        <button
                                                            onClick={() => setConfirmModal({ isOpen: true, type: 'promote', data: user })}
                                                            className="text-xs bg-black text-gray-50 border-2 border-black px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100"
                                                        >
                                                            Promote
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => setConfirmModal({ isOpen: true, type: 'demote', data: user })}
                                                            className="text-xs bg-gray-50 text-black border-2 border-black px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100"
                                                        >
                                                            Demote
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t-2 border-gray-100 flex items-center justify-between bg-gray-50">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 rounded-lg font-bold text-xs border-2 border-gray-300 hover:border-black disabled:opacity-50 disabled:hover:border-gray-300"
                    >
                        Previous
                    </button>
                    <span className="text-xs font-bold text-gray-500">Page {page} of {totalPages}</span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded-lg font-bold text-xs border-2 border-gray-300 hover:border-black disabled:opacity-50 disabled:hover:border-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* --- PROMOTION MODAL --- */}
            <AnimatePresence>
                {promotionModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md p-6 rounded-2xl border-3 border-black shadow-[8px_8px_0px_0px_black]">
                            <h2 className="text-xl font-black font-heading mb-2">Promote to Admin</h2>
                            <p className="text-sm text-gray-500 font-bold mb-6">Enter the email of the user you want to promote. They must already have an account.</p>
                            <form onSubmit={handlePromote}>
                                <input
                                    type="email"
                                    required
                                    placeholder="user@example.com"
                                    value={promoteEmail}
                                    onChange={(e) => setPromoteEmail(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium mb-4 focus:border-black focus:outline-none"
                                />
                                <div className="flex gap-3 justify-end">
                                    <button type="button" onClick={() => setPromotionModalOpen(false)} className="px-4 py-2 font-bold text-gray-500 hover:text-black">Cancel</button>
                                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800">Promote User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- ACTION CONFIRMATION MODAL --- */}
            <AnimatePresence>
                {confirmModal?.isOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md p-6 rounded-2xl border-3 border-black shadow-[8px_8px_0px_0px_black]">
                            <h2 className="text-xl font-black font-heading mb-2 capitalize">{confirmModal.type} User?</h2>
                            <p className="text-sm text-gray-500 font-bold mb-6">
                                {confirmModal.type === 'demote'
                                    ? `Are you sure you want to remove admin privileges from ${confirmModal.data.fullName}?`
                                    : `Promote ${confirmModal.data.fullName} to Admin?`
                                }
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setConfirmModal(null)} className="px-4 py-2 font-bold text-gray-500 hover:text-black">Cancel</button>
                                <button
                                    onClick={() => {
                                        if (confirmModal.type === 'demote') handleDemote(confirmModal.data._id);
                                        // Promotion via list usually opens the form, but if direct:
                                        if (confirmModal.type === 'promote') {
                                            setConfirmModal(null);
                                            setPromoteEmail(confirmModal.data.email);
                                            setPromotionModalOpen(true);
                                        }
                                    }}
                                    className={`px-6 py-2 rounded-lg font-bold text-white ${confirmModal.type === 'demote' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'}`}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ title, value, icon, color, textColor }: any) {
    return (
        <div className="bg-white border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_black] flex items-center justify-between">
            <div>
                <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{title}</p>
                <p className="text-3xl font-black font-heading">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center text-xl ${color} ${textColor}`}>
                {icon}
            </div>
        </div>
    );
}

function Badge({ role }: { role: string }) {
    const styles = {
        student: "bg-gray-100 text-gray-600 border-gray-200",
        admin: "bg-purple-100 text-purple-600 border-purple-200",
        super_admin: "bg-yellow-100 text-yellow-700 border-yellow-200"
    };
    const labels = {
        student: "Student",
        admin: "Admin",
        super_admin: "Super Admin"
    };
    return (
        <span className={`px-3 py-1 rounded-lg border-2 text-[10px] font-black uppercase tracking-wider ${(styles as any)[role] || styles.student}`}>
            {(labels as any)[role] || role}
        </span>
    );
}