"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Environment, Html } from "@react-three/drei";
import Model from "../components/Model";

import {useAuth} from "@/contexts/AuthContext";
import {useState} from "react";

const Emotions = (type: string):string => {
  console.log("type" ,type);
  if(type === 'happy'){
    return '😊 happy 상태 '
  }

  if(type === 'sad'){
    return '😢 sad 상태 '
  }

  if(type === 'neutral'){
    return '😐 감정 없음 상태 '
  }

  return ''
}

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
    console.log(emotion===tamagochiInfo?.emotion);
    if(emotion === '😊 happy 상태'){
      return 'bg-red-300';
    }
    if(emotion === '😐 감정 없음 상태 '){ //emotion 뒤에 의미없는 공백 저장된 것들 해결하기(어디서?문제가 됐는지도 파악하기)
      return 'bg-gray-300';
    }
    if(emotion === '😢 sad 상태 '){
      return 'bg-blue-300';
    }
    return 'bg-gray-300';
  }


  return (
    <div className="flex justify-center items-center h-120">
      <div className={`w-50 h-50 items-center grid border-1 drop-shadow-3xl rounded-4xl ` + ColorSetting(tamagochiInfo?.emotion)}>
          <img src={ImageSetting(tamagochiInfo?.ticker)} width={64} className="m-auto" />
					<p className="font-semibold text-xs text-center">{tamagochiInfo?.emotion}</p>
					<p className="font-semibold text-xs text-center">{tamagochiMessage?.message}</p>
        </div>
    </div>
  );
}

/**
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>

        <ambientLight intensity={0.4} />


        <hemisphereLight intensity={0.4} groundColor="black" />


        <directionalLight
          intensity={1.3}
          position={[5, 10, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.001}
        />


        <Environment preset="sunset" background={false} />


        <Suspense fallback={null}>
          <Model scale={[4, 4, 4]} />
        </Suspense>
      </Canvas>
 */