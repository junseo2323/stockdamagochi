export type QuestStatus = 'in_progress' | 'completed' | 'claimed';

export interface Quest {
  questId: string;
  status: QuestStatus;
  progress?: number;
}

export interface Pet {
  _id: string;
  owner: string; 
  ticker: string;
  nickname: string;
  avgBuyPrice: number;
  quantity: number;
  emotion: number; // -50 ~ 50
  level: number;
  exp: number;
  createdAt?: Date;
  lastInteract: Record<string, Date>; 
  quests: Quest[];
  statusEffect: string[];
}


export type AddFormData = {
ticker: string;
nickname: string;
avgBuyPriceStr : string;
quantityStr: string;
};

export type ModifyFormData = {
nickname: string;
avgBuyPriceStr : string;
quantityStr: string;
};

export interface TamagochiInfoType { //다마고치 셋팅정보
	ticker : string;
	emotion : number;
	nickname : string;
	level : number;
	exp : number;
	quantity: number;
	avgBuyPrice : number;
	rateofreturn: number;
	nowPrice: number;
}
export type TamagochiInputType = Omit<TamagochiInfoType, 'rateofreturn' | 'nowPrice'>;


export type InteractiveType = {
  page: string;
  row: number;
  col: number;
}