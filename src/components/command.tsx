'use client';

import { processCommand } from '@/lib/commandProcessor';
import { useEffect, useState, useRef } from 'react';

export default function Command(props: {}) {
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

      const response = processCommand(answer); // 명령 처리
      console.log('응답:', response); // 나중에 메시지로 출력
      setResponses(response)
      setAnswer('');
    }
    
    return(
        <div className="w-full bg-black absolute inset-0 top-[75vh] pt-2">
            <p className="text-white flex w-screen">>
            <form onSubmit={onSubmit} className="w-screen">
              <input 
                  ref={inputRef}
                  onChange={handleChange}
                  placeholder="명령어를 입력하세요"
                  className="w-full h-7 text-white focus:ring-0 focus:outline-none"
                  type='text'
                  value={answer}
              />
            </form>
            </p>
            <p className='text-white'>{responses}</p>
        </div>
    )
}

/**
 * [명령어 모음]
 * 1. 다마고치 추가하기
 * 
 */