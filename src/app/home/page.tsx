"use client";

import {useRouter} from "next/navigation";

import {useAuth} from "@/contexts/AuthContext";
import {useState,useEffect} from "react";


export default function Home() {
	const {user,userinfo,logout} = useAuth();
	const router = useRouter();

	useEffect(()=>{
		console.log(userinfo);
		if(!user) {
			router.push("/login");
		}
	},[]);
	
	const LogoutHandleEvent = async(e: React.FormEvent) => {
		e.preventDefault();
		await logout();
	}
	
	  if (user === null) {
    	// 아직 인증 확인 중
		return <p>로딩 중...</p>;
	  }

  return (
   	<div>
		  {userinfo&&
		  <>
		  	  <p>홈 화면</p>
			  <ul>
				  <li>이름 : {userinfo.name}</li>
				  <li>이메일 : {userinfo.email}</li>
			  </ul>
			  <button onClick={LogoutHandleEvent}>로그아웃</button>
		  </>
		  }
	</div>
  );
}
