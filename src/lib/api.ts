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
  
//경험치에 따른 레벨변화
export const levelThresholds = [0, 15, 50, 100, 200]; 
/**
0~14 : LV1 
15~49 : LV2
50~99 : LV3
100~199 : LV4
200 : LV5
 */
export function calculateLevel(exp: number) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (exp >= levelThresholds[i]) {
      return i + 1; // 레벨은 1부터 시작
    }
  }
  return 1;
}
