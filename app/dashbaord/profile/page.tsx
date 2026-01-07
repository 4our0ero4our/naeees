
"use client";

import ComingSoon from "@/app/components/ComingSoon";

export default function ProfilePage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ComingSoon
                title="My Profile"
                description="Manage your account settings, password, and notification preferences."
            />
        </div>
    );
}
