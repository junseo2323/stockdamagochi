"use client";

import {useRouter} from "next/navigation";

import {useAuth} from "@/contexts/AuthContext";
import {useState,useEffect} from "react";
import Tamagochi from "@/components/Tamagochi";
import Command from "@/components/command";
import Nav from "@/components/Nav";


export default function Home() {
	const {user,userinfo,logout,loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!user) {
				router.push("/login");
			}
		}
	}, [loading, user]);

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
				<div className="grid grid-rows-[1fr_1fr_0.3fr] h-screen">
					<Tamagochi />
					<Command />
					<Nav />
				</div>		 
			 </>
		  }
	</div>
  );
}
