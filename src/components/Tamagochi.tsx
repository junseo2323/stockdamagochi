"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import Model from "../components/Model";

export default function Tamagochi(props: {message: string}) {
  return (
    <div className="w-screen h-screen bg-gray-100 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        {/* 부드러운 주변광 */}
        <ambientLight intensity={0.4} />

        {/* Hemisphere Light: 하늘과 땅의 색상을 반영 */}
        <hemisphereLight intensity={0.4} groundColor="black" />

        {/* Directional Light with TypeScript-friendly shadow settings */}
        <directionalLight
          intensity={1.3}
          position={[5, 10, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.001}
        />

        {/* Environment 컴포넌트로 현실감 있는 빛 추가 */}
        <Environment preset="sunset" background={false} />

        {/* glTF 모델 로드 */}
        <Suspense fallback={null}>
          <Model scale={[4, 4, 4]} />
        </Suspense>
      </Canvas>

      {/* 3D 캔버스 위에 고정된 중앙 오버레이 콘텐츠 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="aspect-square w-[17.2vw] max-w-[162px] rounded-2xl p-4"
          style={{
            background: "radial-gradient(circle, #c0c0c0 10%, #68783a 90%)",
          }}
        >
        <img src="/테슬라로고.png" className="w-full object-contain mt-4" />
        <p className="font-semibold text-xs text-center mt-3">😊 happy 상태 </p>
        <p className="font-semibold text-xs mt-5">1주를 구매했습니다.</p>
        </div>
      </div>
    </div>
  );
}
