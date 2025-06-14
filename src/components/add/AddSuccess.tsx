"use client"

import { useAuth } from "@/contexts/AuthContext";
import {Pet } from "@/types/type";

export default function AddSuccess({addedpets}: { addedpets: Pet|undefined}) {
    const {commandSet} = useAuth();

    return(
        <div>
          <div className="absolute z-0 w-80 h-90 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 홈 화면 리스트*/}
            <div className='scrollbar-hide overflow-y-auto relative z-10 w-80 h-90 p-5 grid grid-rows-[0.1fr_0.2fr_3fr_1fr]'>
              <p className='text-[#614AD3] font-bold text-2xl'>추가하기😄</p>
              <p className='text-[#614AD3] text-sm'>애플이가 추가되었어요!</p>
              <div className='mt-10 grid grid-rows-[0.5fr_0.1fr_0.1fr] justify-center'>
                <img src='./AAPL.png' className='w-25 backdrop-blur-[4px] blur-[4px]'/>
                <p className='text-center'>{addedpets?.ticker}|{addedpets?.nickname}</p>
                <p className='text-center'>{addedpets?.avgBuyPrice}$</p>
              </div>
              <div className='grid grid-cols-2 justify-center'>
                <p className='text-[#614AD3] text-sm m-auto'>앞으로 자주 만나요!</p>
                <button
                  onClick={()=>{commandSet(1,'홈_리스트');}}
                  className='m-auto w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    돌아가기</button>
              </div>
            </div>
        </div>
      )
}