"use client";

import {createContext, useContext, useEffect, useState} from "react";
import api from "@/lib/api";
import {useRouter} from "next/navigation";

interface User {
	id : string;
	email : string;
	name : string;
}

interface AuthContextType {
	user : User | null;
	loading : boolean;
	userinfo : User | null;
	login : (email: string, password: string) => Promise<void>;
	register : (email: string, password: string, name: string) => Promise<void>;
	logout : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider= ({children} : {children: React.ReactNode}) => {
	const [user, setUser] = useState<User | null>(null);
	const [userinfo, setUserinfo] = useState<User | null>(null);
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
	
	return(
		<AuthContext.Provider value={{user, userinfo, loading, login, register, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if(!context) throw new Error("EEEERRRROOO!!!!");
	return context;
}