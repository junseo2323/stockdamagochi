"use client";

import {useAuth} from "@/contexts/AuthContext";
import {useState} from "react";

import Link from 'next/link';

export default function Login() {
	
	const {login} = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		await login(email, password);
	};
	
  return (
   	<>
	    <form onSubmit={handleSubmit} className="absolute flex flex-col bg-[#ffffff] w-1/3 h-1/2 top-[20%] left-[30%] p-10 shadow-2xl rounded-3xl">
	        <p className="w-full text-xl font-bold text-cetner">SIGN IN</p>
			<div className="flex-2 pt-10">
				<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">email</label>
				<input  type="text" id="email" 
					onChange={e=>setEmail(e.target.value)}
					className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"  required />
			</div>
			<div className="flex-2">
				<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
				<input  type="password" id="password" 
					onChange={e=>setPassword(e.target.value)}
					className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"  required />
			</div>
		  <div className="flex-auto">
		  	<button className="bg-[#000000] text-white rounded-2xl py-2 px-10">Sign In</button>
			<p className="mt-3">계정이 없으신가요? <Link href="/register" className="font-bold">회원가입</Link></p>
		  </div>
	    </form>
	</>
  );
}
