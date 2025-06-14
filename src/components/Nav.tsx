'use client'

import { useAuth } from "@/contexts/AuthContext";

export default function Nav() {
    const { command, commandSet } = useAuth();
    const page = command?.page;
    
    const selected = (select: number):string => {
        if(page === select) {
            return 'selected_'
        }
        return '';
    }

    const controlPage = (select: number) => {
        if(select===1) {
            commandSet(1, '홈_리스트');
        }
        if(select===2) {
            commandSet(2, '먹이주기');
        }
        if(select===3) {
            commandSet(3, '추가하기');
        }
        if(select===4) {
            commandSet(4, '테스트');
        }
    }
    
    return (
        <div   className="
        fixed
        bottom-4
        left-1/2
        transform -translate-x-1/2
        flex justify-center items-center w-full
      "
    >
            <div className="w-80 h-20 bg-white/30 rounded-4xl border-1 border-white">
                <div className="grid place-items-center grid-cols-4 mt-6">
                    <div onClick={() => controlPage(1)} ><img src={`/nav/${selected(1)}1.png`} alt="nav-1" /></div>
                    <div onClick={() => controlPage(2)} ><img src={`/nav/${selected(2)}2.png`} alt="nav-2" /></div>
                    <div onClick={() => controlPage(3)} ><img src={`/nav/${selected(3)}3.png`} alt="nav-3" /></div>
                    <div onClick={() => controlPage(4)} ><img src={`/nav/${selected(4)}4.png`} alt="nav-4" /></div>
                </div>
            </div>
        </div>
    );
}
