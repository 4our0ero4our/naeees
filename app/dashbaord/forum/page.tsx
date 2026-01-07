"use client";

import ComingSoon from "@/app/components/ComingSoon";

export default function ForumPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ComingSoon
                title="Student Forum"
                description="A space for students to discuss courses, share ideas, and connect with peers."
            />
        </div>
    );
}
