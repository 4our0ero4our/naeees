"use client";

import ComingSoon from "@/app/components/ComingSoon";

export default function EventsPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ComingSoon
                title="Events Hub"
                description="Stay updated with the latest department events, seminars, and social gatherings."
            />
        </div>
    );
}
