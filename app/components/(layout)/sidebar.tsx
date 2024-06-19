"use client"
import { signOut } from "next-auth/react";

export const SidebarPage = () => {

    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' }); // Redirect to login page after sign out
    };

    return (
        <div className="w-40 bg-base-300 p-5 space-y-5">
            <div>
                icon
            </div>
            <div>
                route
            </div>
            <div>
                route
            </div>
            <div>
                <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button>
            </div>
        </div>
    )
}