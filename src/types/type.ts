export type Pet = {
    _id: string;
    ticker: string;
    nickname: string;
    quantity: number;
    avgBuyPrice: number;
    emotion: string;
    level: number;
};

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