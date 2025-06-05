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


  return (
    <div className="w-screen h-screen bg-gray-100 relative">
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
		<Html position={[0, 0, 0]} transform center>
				<div
				  className="aspect-square rounded p-4 w-8 h-8"
				  style={{
					background: "radial-gradient(circle, #c0c0c0 10%, #68783a 90%)",
				  }}
				>
				</div>
      </Html>
      <Html position={[-0.05, -0.04, 0.1]} transform center>
        <div>
          <img src={ImageSetting(tamagochiInfo?.ticker)} width='18px' className="object-contain ml-0.5" />
					<p className="font-semibold text-[3px] text-center">{tamagochiInfo?.emotion}</p>
					<p className="font-semibold text-[3px]">{tamagochiMessage?.message}</p>
        </div>
      </Html>
      </Canvas>

      <div>
	  
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