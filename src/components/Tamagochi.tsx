"use client";

import {useAuth} from "@/contexts/AuthContext";
import { levelThresholds } from "@/lib/api";

export default function Tamagochi() {
  const {tamagochiInfo} = useAuth();
  const ImageSetting = (ticker:string):string => {
    if(ticker === 'TSLA'){
      return '/TSLA.png';
    }

    if(ticker === 'AAPL'){
      return '/AAPL.png'
    }

    return '/etc.png'
  }  

  const EmotionSetting = (emotion:number | undefined):string => {
    
    return '지금 기쁜 상태에요😀';
  }

  const RateColorSetting = (rate:number | undefined):string => {
    if (rate === undefined) return '';
    if(rate > 0){
      return 'text-red-400';
    }
    if(rate < 0){
      return 'text-blue-400';
    }
    return 'text-black';
  }


  const currentLevelExpStart = levelThresholds[tamagochiInfo?.level ?? 0 - 1];
  const nextLevelExp = levelThresholds[tamagochiInfo?.level ?? 0] || levelThresholds[levelThresholds.length - 1];
  const progressRatio = Math.min((tamagochiInfo?.exp ?? 0 - currentLevelExpStart) / (nextLevelExp - currentLevelExpStart), 1);

  const progressWidth = `${progressRatio * 100}%`;


  return (
    <div   className="
    fixed
    top-10
    left-1/2
    transform -translate-x-1/2
    flex justify-center items-center w-full
  "
>
      {/**다마고치 배경 */}
      <div className="absolute z-0 w-80 h-80 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>
      
      {/**로고 */}
      <div className="absolute z-5 w-25 flex justify-center items-center blur-[4px]"><img src='/AAPL.png'></img></div>

      {/**다마고치 내용물 */}
      <div className="relative w-80 z-10 p-5 grid grid-rows-[0.1fr_0.5fr_1fr_1fr] h-80">
        <p className="font-bold text-2xl">{EmotionSetting(tamagochiInfo?.emotion)}</p>
        <p className="font-normal text-m">{tamagochiInfo?.ticker}|{tamagochiInfo?.nickname}</p>
        <div className="grid grid-cols-2 w-69">
          <div className="text-left">
            <p className="font-normal text-xl">{tamagochiInfo?.nowPrice}$</p>
            <p className={"font-normal text-sm "+RateColorSetting(tamagochiInfo?.rateofreturn)}>{tamagochiInfo?.rateofreturn}%</p>
          </div>
          <div className="text-right">
            <p className="font-normal text-xl">{(tamagochiInfo?.avgBuyPrice)?.toFixed(2)}$</p>
            <p className={"font-normal text-sm "}>{tamagochiInfo?.quantity}주</p>
          </div>
        </div>
        <div className="m-auto mt-8">
          <p className="font-normal text-sm text-center">{tamagochiInfo?.level}LV</p>
          <div className="w-40 bg-white rounded-full h-5">
                <div
              className="h-5 bg-gradient-to-r from-[#837DFF] to-[#FFFFFF] rounded-full transition-all duration-300"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <p className="font-normal text-sm text-center">{tamagochiInfo?.exp}EXP</p>
        </div>
      </div>
    </div>
  );
}