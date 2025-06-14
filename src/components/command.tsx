'use client';

import { processCommand } from '@/lib/commandProcessor';
import { useEffect, useState, useRef } from 'react';
import {useAuth} from "@/contexts/AuthContext";
import { AnimatePresence, motion } from 'framer-motion';
import api from '@/lib/api';
import { useForm } from 'react-hook-form';

type Pet = {
  _id: string;
  ticker: string;
  nickname: string;
  quantity: number;
  avgBuyPrice: number;
  emotion: string;
  level: number;
};

type AddFormData = {
  ticker: string;
  nickname: string;
  avgBuyPriceStr : string;
  quantityStr: string;
};

type ModifyFormData = {
  nickname: string;
  avgBuyPriceStr : string;
  quantityStr: string;
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
    const { 
      register: addregister, 
      handleSubmit: addhandleSubmit,
      reset: addreset 
    } = useForm<AddFormData>();

    const { 
      register: modifyregister, 
      handleSubmit: modifyhandleSubmit,
      reset: modifyreset 
    } = useForm<ModifyFormData>();


    const {command, commandSet, tamagochiSetting} = useAuth()

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

    const onDelete = async(id: string|undefined) => {
        try{
          await api.delete(`/pet/${id}`);
        }catch(err){
          console.log(err);
        }
        commandSet(1,'홈_리스트');
    }

    

    const [pets, setPets] = useState<Pet[]>([]);
    const [addedpets, setAddedpets] = useState<Pet>();
    const [modifypet,setModifypet] = useState<Pet>();

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
      if (page === 3 && index === '추가하기_성공') {
        const fetchData = async () => {
          try {
            const res = await fetchPets();
            const petdata = res[res.length - 1];
            setAddedpets(petdata);
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

        if(index === '홈_수정'){
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

      }

      if(page === 3) { //다마고치 추가하기
        if(index === '추가하기'){
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

        if(index === '추가하기_성공'){
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
