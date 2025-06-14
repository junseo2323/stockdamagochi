import axios from "axios";
import { Pet } from "@/types/type";

const api = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

export default api;

export async function fetchPets(): Promise<Pet[]> {
	const res = await api.get('/pet');
	return res.data.pets;
}
  
//닉네임을 활용해서 펫 정보 검색 
export async function findPetByNickname(nickname: string): Promise<Pet | undefined> { 
	const pets = await fetchPets();
	return pets.find(p => p.nickname === nickname);
}

//TICKER을 활용해서 해당 주가 검색
export async function fetchCurrentPrice(ticker: string): Promise<number> {
	const res = await api.get(`/price`, { params: { ticker } });
	return res.data.price;
}
  

