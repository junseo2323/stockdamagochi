"use client";

import {createContext, useContext, useEffect, useState} from "react";
import api from "@/lib/api";
import {useRouter} from "next/navigation";
import { useFormState } from "react-dom";

interface CommandControl { //Nav => Command 컨트롤용 변수
	page : number; 
	index : string;
}

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
	nickname : string;
	level : number;
	avgBuyPrice : number;
	rateofreturn: number;
	nowPrice: number;
}

interface AuthContextType {
	command : CommandControl | null;
	user : User | null;
	tamagochiMessage : TamagochiType | null;
	tamagochiInfo : TamagochiInfoType | null;
	loading : boolean;
	userinfo : User | null;
	login : (email: string, password: string) => Promise<void>;
	register : (email: string, password: string, name: string) => Promise<void>;
	logout : () => Promise<void>;
	tamagochiMessageSetting : (message : string) => void;
	tamagochiSetting : (ticker : string, emotion : string, nickname: string, level: number, avgBuyPrice: number) => void;
	commandSet : (page: number, index : string) => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider= ({children} : {children: React.ReactNode}) => {
	const [command, setCommand] = useState<CommandControl | null>(null); 
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

	const commandSet = (page:number, index: string) => {
		setCommand({
			page: page,
			index: index
		})
	}
	type RateoType = {
		rate: number;
		price: number;
	};

	const calRateofreturn = async(avgPrice: number, ticker: string):Promise<RateoType> => {
		try{
			const res = await api.get('/price?ticker='+ticker);
			const nowPrice = res.data.price
			const rate = ((nowPrice-avgPrice)/avgPrice)*100;
			console.log("수익률 ", rate , avgPrice , nowPrice);
			return {rate: parseFloat(rate.toFixed(2)), price: nowPrice};
		}catch(error){
			console.error(error);
		}

		return {rate: 0, price: 0};
	}

	const initTamagochi = async() => {
		
		try{
			const res = await api.get('/pet');
			const petdata = res.data.pets[0];
			const rate = await calRateofreturn(petdata.avgBuyPrice, petdata.ticker);

			setTamagochiInfo({
				ticker : petdata.ticker,
				emotion : petdata.emotion,
				nickname : petdata.nickname,
				level: petdata.level,
				avgBuyPrice: petdata.avgBuyPrice,
				rateofreturn: rate.rate,
				nowPrice: rate.price,
			})
		} catch(err) {
			console.error(err);
		}
	}
	
	const userinfoSet = async() => {
		try{
			const res = await api.get("/user");
			setUserinfo(res.data.user);
		} catch{
			setUserinfo(null);
		}
	};
	
	useEffect(()=>{
		setCommand({
			page : 1,
			index : '홈_리스트'
		});
		checkAuth();
		initTamagochi();
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

	const tamagochiSetting = async(ticker: string, emotion: string, nickname: string, level: number, avgBuyPrice: number) => {
		const rate = await calRateofreturn(avgBuyPrice, ticker);

		setTamagochiInfo({
			ticker : ticker,
			emotion : emotion,
			nickname : nickname,
			level: level,
			avgBuyPrice: avgBuyPrice,
			rateofreturn: rate.rate,
			nowPrice: rate.price,
		})
	}
	
	return(
		<AuthContext.Provider value={{command,tamagochiMessage, tamagochiInfo, user, userinfo, loading, login, register, logout, tamagochiMessageSetting, tamagochiSetting, commandSet}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if(!context) throw new Error("EEEERRRROOO!!!!");
	return context;
}