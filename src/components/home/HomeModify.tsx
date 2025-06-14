"use client"

import { useAuth } from "@/contexts/AuthContext";
import api, { findPetByNickname,fetchCurrentPrice } from "@/lib/api";
import { ModifyFormData, Pet } from "@/types/type";
import { useForm } from "react-hook-form";

export default function HomeModify({modifypet}: { modifypet: Pet|undefined}) {
    const {commandSet} = useAuth();
    
    const { 
        register: modifyregister, 
        handleSubmit: modifyhandleSubmit,
        reset: modifyreset 
    } = useForm<ModifyFormData>();

    const onDelete = async(id: string|undefined) => {
        try{
          await api.delete(`/pet/${id}`);
        }catch(err){
          console.log(err);
        }
        commandSet(1,'홈_리스트');
    }
      
    const onModifySubmit = async(data: ModifyFormData) => {   
        const id = modifypet?._id;     
        try{
            await api.patch(`/pet/${id}`, {
            nickname : data.nickname,
            avgBuyPrice: Number(data.avgBuyPriceStr),
            quantity: Number(data.quantityStr),
            });
            
            commandSet(1,'수정하기_성공');

        } catch(err){
            console.log(err);
            commandSet(1,'수정하기_실패');
        }

        modifyreset();
    };

    return(
        <div>
          {/**다마고치 배경 */} 
          <div className="absolute z-0 w-80 h-90 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 홈 화면 리스트*/}
          <form onSubmit={modifyhandleSubmit(onModifySubmit)}>
            <div className='scrollbar-hide overflow-y-auto relative z-10 w-80 h-90 p-5 grid grid-rows-6 gap-4'>
              <p className='text-[#614AD3] font-bold text-2xl'>관리하기😄</p>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='m-auto'>티커</p>
                <p className='font-bold my-auto'>{modifypet?.ticker}</p>
              </div>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='m-auto'>별명</p>
                <input 
                  type='text'
                  {...modifyregister('nickname')}
                  className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'
                  defaultValue={modifypet?.nickname}                  
                />
              </div>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='m-auto'>평단가</p>
                <input 
                  type='text'
                  {...modifyregister('avgBuyPriceStr')}
                  className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'
                  defaultValue={modifypet?.avgBuyPrice}                  
                />
              </div>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='m-auto'>수량</p>
                <input 
                  type='text'
                  {...modifyregister('quantityStr')}
                  className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'
                  defaultValue={modifypet?.quantity}                  
                />
              </div>
              <div className='grid grid-cols-2'>
                  <button
                  type="button"
                  onClick={()=>{onDelete(modifypet?._id)}}
                  className='text-[#EB5D5D] w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    삭제하기</button>
                  <button
                  type="submit"
                  className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF] ml-10'>
                    수정하기</button>
              </div>
            </div>  
          </form>
        </div>
      )
}