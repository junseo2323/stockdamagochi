"use client"

import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { AddFormData } from "@/types/type";
import { useForm } from "react-hook-form";

export default function Add() {
    const {commandSet} = useAuth()

    const { 
        register: addregister, 
        handleSubmit: addhandleSubmit,
        reset: addreset 
      } = useForm<AddFormData>();

    const onSubmit = async(data: AddFormData) => {     //추가하기 formhook   
        try{
          await api.post('/pet', {
            ticker : data.ticker,
            nickname : data.nickname,
            avgBuyPrice: Number(data.avgBuyPriceStr),
            quantity: Number(data.quantityStr),
          });
          
          commandSet(3,'추가하기_성공');

        } catch(err){
          console.log(err);
          commandSet(3,'추가하기_실패');
        }

        addreset();
    };
    return (
        <div>
          {/**다마고치 배경 */} 
          <div className="absolute z-0 w-80 h-90 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 홈 화면 리스트*/}
            <form onSubmit={addhandleSubmit(onSubmit)}>
            <div className='scrollbar-hide overflow-y-auto relative z-10 w-80 h-90 p-5 grid grid-rows-[0.1fr_0.2fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr]'>
              <p className='text-[#614AD3] font-bold text-2xl'>추가하기😄</p>
              <p className='text-[#614AD3] text-sm'>우리의 새로운 친구를 만들어볼까요?</p>
            <div className='grid grid-cols-[1fr_1fr]'>
                <p className='text-right my-auto mr-5'>티커</p>
                <input type='text'
                      {...addregister('ticker', { required: 'Ticker를 입력해주세요:L' })}
                      placeholder='티커을 입력해주세요'
                      className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
              </div>
              <div className='grid grid-cols-[1fr_1fr]'>
                <p className='text-right my-auto mr-5'>별명</p>
                <input type='text'
                      {...addregister('nickname', { required: 'nickname 입력해주세요:L' })}
                      placeholder='별명을 입력해주세요'
                      className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
              </div>
              <div className='grid grid-cols-[1fr_1fr]'>
                <p className='text-right my-auto mr-5'>평단가</p>
                <input type='text'
                      {...addregister('avgBuyPriceStr', { required: 'avgBuyPriceStr 입력해주세요:L' })}
                      placeholder='평단가격을 입력해주세요'
                      className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
              </div>
              <div className='grid grid-cols-[1fr_1fr]'>
                <p className='text-right my-auto mr-5'>수량</p>
                <input type='text'
                      {...addregister('quantityStr', { required: 'quantityStr 입력해주세요:L' })}
                      placeholder='수량을 입력해주세요'
                      className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
              </div>
              <div className='grid justify-items-end'>
                <button
                  type="submit"
                  className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    추가하기</button>
              </div>

            </div>
            </form>
        </div>
        
      )
}