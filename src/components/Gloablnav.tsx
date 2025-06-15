"use effect"

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Gloablnav(){
    const {logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);         // 애니메이션 상태
    const [menuVisible, setMenuVisible] = useState(false);   // 실제 렌더링 여부

    // 메뉴 열기
    const openMenu = () => {
        setMenuVisible(true); // 렌더링 시작
        setTimeout(() => setMenuOpen(true), 10); // 살짝 지연 후 올라오는 애니메이션
    };

    // 메뉴 닫기
    const closeMenu = () => {
        setMenuOpen(false); // 내려가는 애니메이션 시작
        setTimeout(() => setMenuVisible(false), 500); // 애니메이션 끝난 후 실제 제거
    };
    
    return(
        <div className="w-130 z-100 mx-auto">
            <div className="h-10 grid justify-center">
                <button
                    onClick={openMenu}
                >
                    <img src='/hamburger.png' className="w-[23px]"/>
                </button>
            </div>
            {
                menuVisible &&
                <div
                        className={`bg-gradient-to-b from-[#B9FBFF] to-[#D1C9F1] rounded-2xl h-screen w-131 absolute top-0 left-39 z-50 shadow-lg 
                        transition-transform duration-500 
                        ${menuOpen ? "translate-y-0" : "translate-y-full"}`}
                    >
                    <div className="h-10 grid justify-center pt-3">
                        <button
                        onClick={closeMenu}
                        >
                            돌아가기
                        </button>                    
                    </div>
                    <div className="grid grid-rows-3 justify-center gap-20 mt-10">
                        <p className="font-thin text-3xl text-center">튜토리얼</p>
                        <Link href='/profile'>
                            <p className="font-thin text-3xl text-center">프로필</p>
                        </Link>
                        <button
                            onClick={logout}
                        >
                            <p className="font-thin text-3xl text-center">로그아웃</p>
                        </button>
                    </div>
                    <div className="absolute bottom-0 h-75">
                        <img src='/bg_img2.png' />
                    </div>
                </div>
            }
        </div>
    )
}