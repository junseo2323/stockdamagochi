"use client";

import {createContext, useContext, useEffect, useState} from "react";
import api from "@/lib/api";
import {useRouter} from "next/navigation";
import { useFormState } from "react-dom";

interface User {
	id : string;
	email : string;
	name : string;
}

interface TamagochiType { //다마고치 메세지
	message : string;
}

interface TamagochiInfoType { //다마고치 셋팅정보
	ticker : string;
	emotion : string;
}

interface AuthContextType {
	user : User | null;
	tamagochiMessage : TamagochiType | null;
	tamagochiInfo : TamagochiInfoType | null;
	loading : boolean;
	userinfo : User | null;
	login : (email: string, password: string) => Promise<void>;
	register : (email: string, password: string, name: string) => Promise<void>;
	logout : () => Promise<void>;
	tamagochiMessageSetting : (message : string) => void;
	tamagochiSetting : (ticker : string, emotion : string) => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider= ({children} : {children: React.ReactNode}) => {
	const [user, setUser] = useState<User | null>(null);
	const [userinfo, setUserinfo] = useState<User | null>(null);
	const [tamagochiMessage, setTamagochiMessager] = useState<TamagochiType | null>(null);
	const [tamagochiInfo, setTamagochiInfo] = useState<TamagochiInfoType|null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	
	const checkAuth = async() => {
		try{
		    const res = await api.get("/me");
			setUser(res.data.user);
		} catch{
			setUser(null);
		} finally{
			setLoading(false);
		}``
	};
	
	const userinfoSet = async() => {
		try{
			const res = await api.get("/user");
			setUserinfo(res.data.user);
		} catch{
			setUserinfo(null);
		}
	};
	
	useEffect(()=>{
		checkAuth();
	}, []);

	
	
	const login = async (email: string, password: string) => {
		await api.post("/auth/login", {email, password});
		await checkAuth();
		await userinfoSet();
		router.push("/home");
	};
	
	const register = async (email: string, password: string, name: string) => {
		await api.post("/auth/signup", {name, email, password});
		await checkAuth();
		router.push("/home");
	}
	
	const logout = async() => {
		await api.post("/auth/logout");
		setUser(null);
		router.push("/login");
	};

	const tamagochiMessageSetting = ( message : string) => {
		setTamagochiMessager({
			message : message
		})
	}

	const tamagochiSetting = (ticker: string, emotion: string) => {
		console.log(ticker, emotion)
		setTamagochiInfo({
			ticker : ticker,
			emotion : emotion
		})
	}
	
	return(
		<AuthContext.Provider value={{tamagochiMessage, tamagochiInfo, user, userinfo, loading, login, register, logout, tamagochiMessageSetting, tamagochiSetting}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if(!context) throw new Error("EEEERRRROOO!!!!");
	return context;
}