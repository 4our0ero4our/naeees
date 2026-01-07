
"use client";

import ComingSoon from "@/app/components/ComingSoon";

export default function AnnouncementsPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ComingSoon
                title="Announcements"
                description="Stay updated with department news, scholarship opportunities, and events."
            />
        </div>
    );
}
