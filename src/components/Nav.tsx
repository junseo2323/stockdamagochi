'use client'

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext";

export default function Nav() {
    const { logout } = useAuth();

    return (
        <div className="flex justify-center items-center w-full h-180">
            <div className="w-80 h-20 bg-white/30 rounded-4xl border-1 border-white">
                <div className="grid place-items-center grid-cols-4 mt-6">
                    <Link href='./home'><img src='/nav/1.png' alt="nav-1" /></Link>
                    <img src='/nav/2_selected.png' alt="nav-2" />
                    <img src='/nav/3.png' alt="nav-3" />
                    <img src='/nav/4.png' alt="nav-4" />
                </div>
            </div>
        </div>
    );
}
