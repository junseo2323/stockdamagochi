"use client";

import {useAuth} from "@/contexts/AuthContext";
import {useState} from "react";

import Link from 'next/link';

export default function Register() {
	const {register} = useAuth();
	
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		await register(email, password, name);
	};

  return (
   	<>
	    <form onSubmit={handleSubmit} className="absolute flex flex-col bg-[#ffffff] w-80 h-120 top-[20%] left-[30%] p-10 shadow-2xl rounded-3xl">
	        <p className="w-full text-xl font-bold text-cetner mb-3">회원가입</p>
			<div className="flex-auto">
				<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
				<input  type="text" id="name" 
					onChange={e=>setName(e.target.value)}
					className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"  required />
			</div>
			<div className="flex-auto">
				<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">email</label>
				<input  type="text" id="email" 
					onChange={e=>setEmail(e.target.value)}
					className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"  required />
			</div>
			<div className="flex-auto">
				<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
				<input  type="password" id="password" 
					onChange={e=>setPassword(e.target.value)}
					className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"  required />
			</div>
		  <div className="flex-auto">
		  	<button className="bg-[#000000] text-white rounded-2xl py-2 px-10">회원가입</button>
			<p className="mt-3">이미 계정이 있으신가요? <Link href="/login"  className="font-bold">로그인</Link></p>
		  </div>
	    </form>
	</>
  );
}
