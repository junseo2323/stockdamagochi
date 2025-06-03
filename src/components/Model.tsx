"use client"

// components/Model.jsx
import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model(props) {
  const group = useRef();
  // /public/models 디렉토리에 위치한 glTF 파일 경로를 사용합니다.
  const model = useLoader(GLTFLoader, "/scene.gltf");

  // 여기서는 useFrame 등을 사용하지 않고 정적으로 모델을 렌더링합니다.
  return <primitive ref={group} object={model.scene} {...props} />;
}
