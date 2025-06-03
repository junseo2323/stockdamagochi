import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TWELVE_DATA_API_KEY;
const BASE_URL = 'https://api.twelvedata.com/price';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const ticker = searchParams.get('ticker');
    
    if(!ticker) {
        return NextResponse.json({ message: 'Ticker is required' }, { status: 400 });
    }
        
    try {
        const res = await fetch(`${BASE_URL}?symbol=${ticker}&apikey=${API_KEY}`);
        const data = await res.json();

        if(data.status === 'error' || !data.price){
            return NextResponse.json({message: 'Fail to fetch'}, {status: 500});
        }

        return NextResponse.json({ticker, price: parseFloat(data.price)});
    } catch(error){
        console.error('PRICE FETCH ERROR', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

}