"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
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
  
  return (
    <div className="w-screen h-screen bg-gray-100 relative">
      

      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="aspect-square w-[17.2vw] max-w-[162px] rounded-2xl p-4"
          style={{
            background: "radial-gradient(circle, #c0c0c0 10%, #68783a 90%)",
          }}
        >
        <img src="/테슬라로고.png" className="w-full object-contain mt-4" />
        <p className="font-semibold text-xs text-center mt-3">{Emotions(tamagochiInfo?.emotion) ?? ''}</p>
        <p className="font-semibold text-xs mt-5">{tamagochiMessage?.message}</p>
        </div>
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