import { useAuth } from "@/contexts/AuthContext";
import api, { fetchCurrentPrice, findPetByNickname } from "@/lib/api";
import React, { useState } from "react"

export default function Feed({ onFeedAction }: { onFeedAction: () => void }) {
  const {tamagochiInfo,commandSet,tamagochiSetting} = useAuth();

  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  //고차함수 (화살표 여러번 사용) 블로그에 꼭 정리하기!!!!!
  const onChange = (type:string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if(type==='price'){setPrice(e.target.value);}
      if(type==='quantity'){setQuantity(e.target.value);}
  }

  const setTamagochi = async() => {
    const pet = await findPetByNickname(tamagochiInfo?.nickname);
    if (!pet) return '😿 해당 펫을 찾을 수 없어요!';

    await api.patch(`/pet/${pet._id}/emotion`);
    tamagochiSetting(pet.ticker, pet.emotion, pet.nickname, pet.level, pet.avgBuyPrice, pet.quantity);

  }

  const onBuySubmit = async() => {
      const pet = await findPetByNickname(tamagochiInfo?.nickname);
      const newPrice = Number(price);
      const newQuantity = Number(quantity);

      if (!pet) {commandSet(2,'먹이주기_실페'); return;};
      try{
        const res = await api.patch(`/pet/${pet._id}`,
        {
          avgBuyPrice: ((pet.avgBuyPrice*pet.quantity)+(newPrice*newQuantity))/(pet.quantity+newQuantity),
          quantity: pet.quantity+newQuantity,
        })
        setTamagochi();
        onFeedAction();
        commandSet(2,'먹이주기_성공');
      }catch(err){
        console.error(err);
      }
  }
  const onSellSubmit = async() => {
    const pet = await findPetByNickname(tamagochiInfo?.nickname);

    const newPrice = Number(price);
    const newQuantity = Number(quantity);
    if (!pet) {commandSet(2,'먹이주기_실페'); return;};
    if(pet?.quantity-newQuantity < 0){
      console.log("잘못된 표현");
      commandSet(2,'먹이주기_실패');
    }

    try{
      const res = await api.patch(`/pet/${pet._id}`,
      {
        quantity: pet.quantity-newQuantity,
      })
      setTamagochi();
      onFeedAction();
      commandSet(2,'먹이주기_성공');
    }catch(err){
      console.error(err);
    }
  }

    return (
        <div>
          {/**다마고치 배경 */} 
          <div className="absolute z-0 w-80 h-70 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 내용_먹이주기*/}
            <div className='relative z-10 w-80 h-65 p-5 grid grid-rows-[0.1fr_0.2fr_1.5fr_1.5fr_1fr]'>
              <p className='text-[#614AD3] font-bold text-2xl'>먹이주기😄</p>
              <p className='text-[#614AD3] text-sm'>매수는 먹이주기, 매도는 다이어트 입니다.</p>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='text-center m-auto'>가격</p>
                <input type='text'
                      onChange={onChange('price')}
                      placeholder='가격을 입력해주세요'
                      className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
              </div>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='text-center m-auto'>수량</p>
                <input type='text'
                        onChange={onChange('quantity')}
                        placeholder='수량을 입력해주세요'
                        className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
                        
              </div>
              <div className='grid grid-cols-[0.4fr_0.5fr]'>
                <button
                  onClick={onBuySubmit}
                  className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    먹이주기</button>
                <button
                  onClick={onSellSubmit}
                  className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    다이어트</button>
              </div>
          </div>
        </div>
      )
}