'use client'

import Link from "next/link"
import {useAuth} from "@/contexts/AuthContext";

export default function Nav() {
    const {logout} = useAuth();

    return(
        <div className="grid grid-cols-3 m-10">
            <p className="font-bold text-2xl select-none">LOGO</p>
            <Link href={'/home'} className="text-center font-bold text-2xl">홈</Link>
            <button onClick={logout} className="text-right font-bold text-2xl">로그아웃</button>
        </div>
    )
}