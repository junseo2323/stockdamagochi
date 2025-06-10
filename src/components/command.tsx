'use client';

import { processCommand } from '@/lib/commandProcessor';
import { useEffect, useState, useRef } from 'react';
import {useAuth} from "@/contexts/AuthContext";

export default function Command(props: {}) {
    const {tamagochiSetting,tamagochiMessageSetting} = useAuth();

    const [answer, setAnswer] = useState("")
    const [responses, setResponses] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const interval = setInterval(() => {
        inputRef.current?.focus(); // 주기적으로 focus 유지
      }, 100);
  
      return () => clearInterval(interval);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswer(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!answer.trim()) return;

      const response = processCommand(answer, tamagochiSetting, tamagochiMessageSetting); // 명령 처리
      console.log('응답:', response); // 나중에 메시지로 출력
      setResponses(response)
      setAnswer('');
    }
    
    return(
        <div className="w-full absolute inset-0 top-[65vh] pt-2">
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