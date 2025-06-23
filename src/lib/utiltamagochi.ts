import { TamagochiInputType } from "@/types/type";

export const mapPetToInput = (pet: any): TamagochiInputType => ({
  ticker: pet.ticker,
  emotion: pet.emotion,
  nickname: pet.nickname,
  level: pet.level,
  exp: pet.exp,
  avgBuyPrice: pet.avgBuyPrice,
  quantity: pet.quantity,
});