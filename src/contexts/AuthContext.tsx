"use client";

import {createContext, useContext, useEffect, useState} from "react";
import api from "@/lib/api";
import {useRouter} from "next/navigation";
import {TamagochiInfoType, TamagochiInputType } from "@/types/type";

interface CommandControl { //Nav => Command 컨트롤용 변수
	page : number; 
	index : string;
}

interface User {
	id : string;
	email : string;
	name : string;
}

interface AuthContextType {
	command : CommandControl | null;
	user : User | null;
	tamagochiInfo : TamagochiInfoType | null;
	loading : boolean;
	authActions: {
		login: (email: string, password: string) => Promise<void>;
		register: (email: string, password: string, name: string) => Promise<void>;
		logout: () => Promise<void>;
	};	
	tamagochiSetting : (data: TamagochiInputType)=> void;
	commandSet : (page: number, index : string) => void;
}



type RateoType = {
	rate: number;
	price: number;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider= ({children} : {children: React.ReactNode}) => {
	const [command, setCommand] = useState<CommandControl | null>(null); 
	const [user, setUser] = useState<User | null>(null);
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

	const tamagochiSetting = async(data: TamagochiInputType) => {
		const rate = await calRateofreturn(data.avgBuyPrice, data.ticker);
		setTamagochiInfo({
			...data,
			rateofreturn: rate.rate,
			nowPrice: rate.price,
		})
	}

	const calRateofreturn = async(avgPrice: number, ticker: string):Promise<RateoType> => {
		try{
			const res = await api.get('/price?ticker='+ticker);
			const nowPrice = res.data.price
			const rate = ((nowPrice-avgPrice)/avgPrice)*100;
			console.log("수익률 ", rate , avgPrice , nowPrice);
			return {rate: parseFloat(rate.toFixed(2)), price: nowPrice};
		}catch(error){
			console.error(error);
			return {rate: 0, price: 0};
		}
	}

	const initTamagochi = async() => {
		try{
			const res = await api.get('/pet');
			const petdata = res.data.pets[0];
			const rate = await calRateofreturn(petdata.avgBuyPrice, petdata.ticker);

			setTamagochiInfo({
				...petdata,
				rateofreturn: rate.rate,
				nowPrice: rate.price,
			})
		} catch(err) {
			console.error(err);
		}
	}

	
	const authActions = {
		login: async (email: string, password: string) => {
		  await api.post("/auth/login", { email, password });
		  await checkAuth();
		  router.push("/home");
		},
	  
		register: async (email: string, password: string, name: string) => {
		  await api.post("/auth/signup", { name, email, password });
		  await checkAuth();
		  router.push("/home");
		},
	  
		logout: async () => {
		  await api.post("/auth/logout");
		  setUser(null);
		  router.push("/login");
		}
	};

	useEffect(()=>{
		setCommand({
			page : 1,
			index : '홈_리스트'
		});
		checkAuth().then(checkAuth);
		initTamagochi();
	}, []);
	
	
	return(
		<AuthContext.Provider value={{
			command, 
			tamagochiInfo, 
			user, 
			loading, 
			authActions, 
			tamagochiSetting, 
			commandSet}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if(!context) throw new Error("EEEERRRROOO!!!!");
	return context;
}