"use client";

import {useAuth} from "@/contexts/AuthContext";

export default function Tamagochi(props: {message: string}) {
  const {tamagochiMessage,tamagochiInfo,tamagochiMessageSetting} = useAuth();
  const ImageSetting = (ticker:string):string => {
    if(ticker === 'TSLA'){
      return '/TSLA.png';
    }

    if(ticker === 'AAPL'){
      return '/AAPL.png'
    }

    return '/etc.png'
  }  

  const ColorSetting = (emotion:string):string => {
    if(emotion === '😊 happy 상태'){
      return 'bg-linear-to-b from-[#F66E6E] to-[#ffffff]';
    }
    if(emotion === '😐 감정 없음 상태 '){ //emotion 뒤에 의미없는 공백 저장된 것들 해결하기(어디서?문제가 됐는지도 파악하기)
      return 'bg-linear-to-b from-[#FFA883] to-[#ffffff]';
    }
    if(emotion === '😢 sad 상태 '){
      return 'bg-linear-to-b from-[#6EAEF6] to-[#ffffff]';
    }
    return 'bg-linear-to-b from-[#FFA883] to-[#ffffff]';
  }

  const RateColorSetting = (rate:number):string => {
    if(rate > 0){
      return 'text-red-400'
    }
    if(rate < 0){
      return 'text-blue-400'
    }
    return 'text-black'
  }


  return (
    <div className="flex justify-center items-center w-full pt-10">
      {/**다마고치 배경 */}
      <div className="absolute z-0 w-80 h-80 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>
      
      {/**로고 */}
      <div className="absolute z-5 w-25 flex justify-center items-center blur-[4px]"><img src='/AAPL.png'></img></div>

      {/**다마고치 내용물 */}
      <div className="relative w-80 z-10 p-5 grid grid-rows-[0.1fr_0.5fr_1fr_1fr] h-80">
        <p className="font-bold text-2xl">지금 우울한 상태에요😢</p>
        <p className="font-normal text-m">AAPL|애플이</p>
        <div className="grid grid-cols-2 w-69">
          <div className="text-left">
            <p className="font-normal text-xl">240$</p>
            <p className="font-normal text-sm text-blue-400">어제보다 -24%</p>
          </div>
          <div className="text-right">
            <p className="font-normal text-xl">140$</p>
            <p className="font-normal text-sm text-blue-400">-80%</p>
          </div>
        </div>
        <div className="m-auto mt-8">
          <p className="font-normal text-sm text-center">12LV</p>
          <div className="w-40 bg-white rounded-full h-5">
            <div className=" h-5 bg-gradient-to-r from-[#837DFF]  to-[#FFFFFF] rounded-full w-30"></div>
          </div>
          <p className="font-normal text-sm text-center blur-[3px]">12LV</p>
        </div>
      </div>
    </div>
  );
}

/*
 <div className="grid w-screen place-items-center text-white">
      <div className="grid grid-cols-[100px_60%_100px] grid-rows-[0.1fr_1fr_0.1fr] gap-4 relative place-items-center">
        <div className="col-start-2 row-start-1 mx-12 ">
          <p className="text-center font-bold">{tamagochiInfo?.level}.LV</p>
          <p className="text-center text-2xl ">{tamagochiInfo?.nickname}</p>
        </div>

        <div className={"col-start-1 row-start-2 text-xl "+RateColorSetting(tamagochiInfo?.rateofreturn)}>
          {tamagochiInfo?.rateofreturn}%
        </div>


        <div className={`col-start-2 row-start-2 text-black w-50 h-50 items-center grid drop-shadow-3xl rounded-lg ` + ColorSetting(tamagochiInfo?.emotion)}>
            <img src={ImageSetting(tamagochiInfo?.ticker)} width={64} className="m-auto" />
            <p className="font-semibold text-lg text-center">{tamagochiInfo?.emotion}</p>
            <p className="font-semibold text-sm text-center">{tamagochiMessage?.message}</p>
        </div>

        <div className="col-start-3 row-start-2 text-x text-white">
          뉴스정보
        </div>

  
      </div>
    </div>

*/