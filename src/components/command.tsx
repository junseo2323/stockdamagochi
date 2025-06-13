'use client';

import { processCommand } from '@/lib/commandProcessor';
import { useEffect, useState, useRef } from 'react';
import {useAuth} from "@/contexts/AuthContext";
import { AnimatePresence, motion } from 'framer-motion';
import api from '@/lib/api';

type Pet = {
  _id: string;
  ticker: string;
  nickname: string;
  quantity: number;
  avgBuyPrice: number;
  emotion: string;
  level: number;
};

async function fetchPets(): Promise<Pet[]> {
  const res = await api.get('/pet');
  return res.data.pets;
}

//닉네임을 활용해서 펫 정보 검색 
async function findPetByNickname(nickname: string): Promise<Pet | undefined> { 
  const pets = await fetchPets();
  return pets.find(p => p.nickname === nickname);
}

//TICKER을 활용해서 해당 주가 검색
async function fetchCurrentPrice(ticker: string): Promise<number> {
  const res = await api.get(`/price`, { params: { ticker } });
  return res.data.price;
}

export default function Command(props: {}) {


    const [pets, setPets] = useState<Pet[]>([]);
    const {command, commandSet, tamagochiSetting} = useAuth()

    const page = command?.page;
    const index = command?.index;

    const [animationKey, setAnimationKey] = useState(`${page}-${index}`);

    useEffect(() => {
      if (page === 1 && index === '홈_리스트') {
        const fetchData = async () => {
          try {
            const res = await fetchPets();
            setPets(res);
          } catch (error) {
            console.error('Failed to fetch pets:', error);
          }
        };
        fetchData();
      }
    }, [page, index]);
  
  

      // 전환 감지
      useEffect(() => {
          setAnimationKey(`${page}-${index}`);
      }, [page, index]);
  

    const toggleCommand = () => {
      if(page === 2) {
        if(index === '먹이주기_성공') {
          return (
            <div>
              {/**다마고치 배경 */} 
              <div className="absolute z-0 w-80 h-70 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>
  
              {/**다마고치 내용_먹이주기*/}
                <div className='relative z-10 w-80 h-65 p-5 grid grid-rows-[0.1fr_0.2fr_1.5fr_1.5fr_1fr_1fr]'>
                  <p className='text-[#614AD3] font-bold text-2xl'>먹이주기😄</p>
                  <p className='text-[#614AD3] text-sm'>먹이주기가 성공했습니다!</p>
                  <p className='text-[#614AD3] text-sm'>평단가 140$ → 152$</p>
                  <p className='text-[#614AD3] text-sm'>경험치 12500px → 13500px</p>
                  <p className='text-[#614AD3] font-bold text-sm'>애플이가 즐거워하고 있어요!</p>
                  <button
                      className='ml-45 w-23 h-10 font-bold rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                        홈으로</button>
  
                </div>
            </div>
          )
        }
  
        //먹이주기
        if(index === '먹이주기') {
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
                          placeholder='가격을 입력해주세요'
                          className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
                  </div>
                  <div className='grid grid-cols-[0.3fr_1fr]'>
                    <p className='text-center m-auto'>수량</p>
                    <input type='text'
                            placeholder='수량을 입력해주세요'
                            className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
                            
                  </div>
                  <div className='grid grid-cols-[0.4fr_0.5fr]'>
                    <button
                      className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                        먹이주기</button>
                    <button
                      className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                        다이어트</button>
                  </div>
              </div>
            </div>
          )
        }
      }
      
      if(page === 1) { //다마고치 목록 보기
        
        if(index === '홈_리스트'){
          const handleOnClick = async(nickname: string) => {
            const pet = await findPetByNickname(nickname);
            if (!pet) return '😿 해당 펫을 찾을 수 없어요!';

            const currentPrice = await fetchCurrentPrice(pet.ticker);
            
        
            await api.patch(`/pet/${pet._id}/emotion`);
        
            tamagochiSetting(pet.ticker, pet.emotion, pet.nickname, pet.level, pet.avgBuyPrice);
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
                    <div key={p._id} onClick={()=>{handleOnClick(p.nickname)}} className='items-center grid grid-rows-3 p-3 w-30 h-30 backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white'>
                      <p className='text-center'>{p.level}Lv</p>
                      <div className="m-auto z-5 w-10 flex justify-center items-center blur-[1px]">
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
      }

      return (
        <div>
          
        </div>
      )
      
    }
  
    return(
        <div   className="
        fixed
        bottom-1/6
        left-1/2
        transform -translate-x-1/2
        flex justify-center items-center w-full
      "
    >
          <AnimatePresence mode="wait">
              <motion.div
                  key={animationKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                  {toggleCommand()}
              </motion.div>
          </AnimatePresence>
        </div>

    )
}

/**
 * [명령어 모음]
 * 1. 펫 추가
 * 2. 펫 목록
 * 3. 펫 정보
 * 4. 펫 삭제
 */

/**
 <div className='my-4 mx-26  h-50 border-1 rounded-4xl border-solid border-white'>
              <p className='text-white p-4'>{responses}</p>
            </div>
            <div className='flex justify-center items-center h-10'>
            <form onSubmit={onSubmit} className="">
              <input 
                  ref={inputRef}
                  onChange={handleChange}
                  placeholder="명령어를 입력하세요"
                  className="w-150 rounded-2xl h-12 pl-3 text-white border-1 focus:ring-0 focus:outline-none"
                  type='text'
                  value={answer}
              />
              <button className='text-white border-1 border-solid w-15 h-12 rounded-2xl bg-[#593cff] ml-3'>
                실행!
              </button>
            </form>
            </div>
            
 */