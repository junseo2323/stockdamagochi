"use client";

import {useRouter} from "next/navigation";

import {useAuth} from "@/contexts/AuthContext";
import {useState,useEffect} from "react";
import Tamagochi from "@/components/Tamagochi";
import Command from "@/components/command";
import Nav from "@/components/Nav";
import Gloablnav from "@/components/Gloablnav";


export default function Home() {
	//Feed.tsx -> Tamagochi.tsx간 통신
	const [refreshKey, setRefreshKey] = useState(0);
	const triggerTamagochiRerender = () => {
		setRefreshKey(prev => prev + 1);
	};
	
	const {user,authActions,loading } = useAuth();
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
		await authActions.logout();
	}
	
	  if (user === null) {
    	// 아직 인증 확인 중
		return <p>로딩 중...</p>;
	  }

  return (
   	<div>
		  {user&&
		  <>
				<div className="grid grid-rows-[1fr_1fr_0.3fr] h-screen">
					<Gloablnav />
					<Tamagochi key={refreshKey}/>
					<Command onFeedAction={triggerTamagochiRerender}  />
					<Nav />
				</div>		 
			 </>
		  }
	</div>
  );
}
