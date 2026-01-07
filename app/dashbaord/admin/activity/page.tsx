
"use client";

import ComingSoon from "@/app/components/ComingSoon";

export default function ActivityLogPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ComingSoon
                title="Activity Log"
                description="Monitor system activities, uploads, and administrative actions."
            />
        </div>
    );
}
