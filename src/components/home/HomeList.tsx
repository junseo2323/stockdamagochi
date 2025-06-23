"use client"

import { useAuth } from "@/contexts/AuthContext";
import api, { findPetByNickname } from "@/lib/api";
import { mapPetToInput } from "@/lib/utiltamagochi";
import { Pet } from "@/types/type";

export default function HomeList({pets , setModifypet }: { pets: Pet[]; setModifypet: React.Dispatch<React.SetStateAction<Pet|undefined>> }) {
    const {commandSet, tamagochiSetting} = useAuth();
    const handleOnClick = async(nickname: string) => {
        const pet = await findPetByNickname(nickname);
        if (!pet) return '😿 해당 펫을 찾을 수 없어요!';
        const data = mapPetToInput(pet);
        await tamagochiSetting(data);
    }
    return (
        <div>
          {/**다마고치 배경 */} 
          <div className="absolute z-0 w-80 h-90 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 홈 화면 리스트*/}
            <div className='scrollbar-hide overflow-y-auto relative z-10 w-80 h-90 p-5 grid grid-cols-2 gap-4'>
            {pets.length === 0 ? (
              <div></div>
            ) : (
              pets.map(p => (
                <div key={p._id} onClick={()=>{handleOnClick(p.nickname)}} className='items-center grid grid-rows-4 p-3 w-30 h-30 backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white'>
                  <p className='text-center'>{p.level}Lv</p>
                  <p onClick={(e)=>{
                    e.stopPropagation();
                    commandSet(1,'홈_수정');
                    setModifypet(p);
                  }} className='text-[#614AD3] text-center text-sm'>관리</p>
                  <div className="m-auto z-5 w-7 flex justify-center items-center blur-[1px]">
                    <img src='/AAPL.png' alt="pet" />
                  </div>
                  <p className='text-center text-sm'>{p.ticker} | {p.nickname}</p>
                </div>
              ))
            )}

            </div>
        </div>
      )
}