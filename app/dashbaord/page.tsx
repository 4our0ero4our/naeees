"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBook, FaChartLine, FaCloudUploadAlt, FaUsers, FaArrowRight, FaClock } from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";

// --- REUSABLE BENTO CARD ---
const BentoCard = ({ title, value, subtext, color = "bg-white", icon, className = "" }: any) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
    className={`relative ${color} border-3 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all duration-200 h-full min-h-[160px] ${className}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-black/5 rounded-2xl border-2 border-black/5">
        {icon}
      </div>
      <div className="w-3 h-3 rounded-full bg-black/20"></div>
    </div>

    <div>
      <div className="text-4xl lg:text-5xl font-heading font-black leading-none mb-2 text-black tracking-tight">{value}</div>
      <h3 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-1">{title}</h3>
      {subtext && <p className="text-xs font-bold text-black/60">{subtext}</p>}
    </div>
  </motion.div>
);

export default function DashboardOverview() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [weeklyMaterials, setWeeklyMaterials] = useState<any[]>([]);
  // const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [activeUsersLength, setActiveUsersLength] = useState<number>(0);
  const [myUploadsLength, setMyUploadsLength] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      axios.get("/api/materials").then((res) => {
        setMaterials(res.data.data);
        setWeeklyMaterials(res.data.data.filter((material: any) => new Date(material.createdAt).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
        setRecentActivity(res.data.data.filter((material: any) => material.uploadedBy === session?.user?.email).slice(0, 5));
        setMyUploadsLength(res.data.data.filter((material: any) => material.uploadedBy === session?.user?.email).length);
      });
      // axios.get("/api/pending-reviews").then((res) => {
      //   setPendingReviews(res.data.data);
      // });
      axios.get("/api/active-users").then((res) => {
        setActiveUsersLength(res.data.data.length);
      });
    }
  }, []);

  return (
    <div className="space-y-8 w-full">

      {/* 1. WELCOME BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="font-heading font-black text-3xl lg:text-4xl text-black mb-2">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#16a34a]">Admin.</span>
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="font-black text-3xl text-black">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <BentoCard
          title="Total Materials"
          value={materials.length}
          subtext={`+${weeklyMaterials.length} this week`}
          icon={<FaBook className="text-2xl text-black" />}
          color="bg-[#22C55E]"
          className="md:col-span-2 xl:col-span-1"
        />
        {/* <BentoCard
          title="Pending Reviews"
          value={pendingReviews.length}
          subtext="Requires approval"
          icon={<FaClock className="text-2xl" />}
          color="bg-[#EAB308]"
        /> */}
        <BentoCard
          title="Active Users"
          value={activeUsersLength}
          subtext="students & admins"
          icon={<FaUsers className="text-2xl" />}
          color="bg-[#EAB308]"
        />
        <BentoCard
          title="My Uploads"
          value={myUploadsLength}
          // subtext={`contribution score: ${myUploads.reduce((acc: number, curr: any) => acc + curr.contributionScore, 0)}`}
          subtext="Contribution rate will be displayed in the future"
          icon={<FaCloudUploadAlt className="text-2xl" />}
          color="bg-[#22C55E]"
        />
      </div>

      {/* 3. LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Recent Activity Feed */}
        <div className="xl:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-black text-2xl text-black">Recent Activity</h3>
            <button className="text-sm font-bold underline decoration-2 decoration-[#22C55E] hover:text-[#22C55E]">View All</button>
          </div>

          <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_black] flex-1">
            <div className="space-y-0">
              {recentActivity.length > 0 ? recentActivity.map((activity: any) => (
                <div key={activity._id} className="group flex items-start gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-xl cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center font-black text-sm shrink-0 ${activity.type === 'upload' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                    {activity.type === 'upload' ? 'DOC' : 'PDF'}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-black text-lg group-hover:text-[#22C55E] transition-colors">{activity.title}</h4>
                    <p className="text-sm text-gray-500 font-medium mt-1">Uploaded by <span className="text-black font-bold">{activity.uploadedBy}</span> • {activity.level}</p>
                  </div>
                  <div className="text-right pt-2 hidden sm:block">
                    <span className="text-xs font-bold text-gray-400">{new Date(activity.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              )) : <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl p-4">
                <p className="text-gray-500 font-medium">No recent activity yet</p>
              </div>}
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex flex-col">
          <h3 className="font-heading font-black text-2xl text-black mb-6">Quick Actions</h3>
          <div className="flex flex-col gap-4">
            <button className="w-full group text-left bg-black text-white p-6 rounded-2xl border-2 border-black font-bold flex justify-between items-center shadow-[6px_6px_0px_0px_#22C55E] hover:translate-y-1 hover:shadow-none transition-all">
              <span className="text-lg">Upload New Material</span>
              <span className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-black group-hover:rotate-45 transition-transform"><FaArrowRight /></span>
            </button>

            <button className="w-full group text-left bg-white text-black p-6 rounded-2xl border-2 border-black font-bold flex justify-between items-center shadow-[6px_6px_0px_0px_black] hover:translate-y-1 hover:shadow-none transition-all">
              <span className="text-lg">Manage Users</span>
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform"><FaArrowRight /></span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}