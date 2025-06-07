"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Environment, Html } from "@react-three/drei";
import Model from "../components/Model";

import {useAuth} from "@/contexts/AuthContext";
import {useState} from "react";
import api from "@/lib/api";

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

  const rateOfReturn = (avgBuyPrice: number, ticker: string):number => {
    const res = api.get("/price?ticker="+ticker);
    console.log(res);

    return 32;
    
  }


  return (
    <div className="flex flex-col text-white">
      <div className="mr-12">
        <p className="text-center font-bold">{tamagochiInfo?.level}.LV</p>
        <p className="text-center text-2xl ">{tamagochiInfo?.nickname}</p>
      </div>
      <div className="flex justify-center items-center h-120 flex-1">
        <div className="text-xl text-red-600 ">
          {}%
        </div>
        <div className={`text-black mx-5 w-50 h-50 items-center grid drop-shadow-3xl rounded-lg ` + ColorSetting(tamagochiInfo?.emotion)}>
            <img src={ImageSetting(tamagochiInfo?.ticker)} width={64} className="m-auto" />
            <p className="font-semibold text-lg text-center">{tamagochiInfo?.emotion}</p>
            <p className="font-semibold text-sm text-center">{tamagochiMessage?.message}</p>
        </div>
        <div className="text-x">
          TSLL뉴스정보
        </div>
      </div>
      
    </div>
    
  );
}

