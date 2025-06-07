import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

import User from '@/models/User';
import Pet from '@/models/Pet';

//펫 생성
export async function POST(req: NextRequest,) {
    await connectToDatabase();
    
    //로그인 여부 확인
    const cookieStore = await cookies(); 
    const token = cookieStore.get('token')?.value;
  
    if(!token) {
        return NextResponse.json({message: "UnAuthorized"}, {status: 401});
    }
    
    //ticker: 주식티커 , nickname: 주식 별명(테순이..) , avgBuyPrice: 평단가 , quantity: 보유갯수
	const {ticker, nickname, avgBuyPrice, quantity} = await req.json();

    //유효성 검사
    if(!ticker || !nickname || !avgBuyPrice || !quantity){
        return NextResponse.json({message: "Missing Fields"}, {status: 400});
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        if(!user) {
            return NextResponse.json({message: 'User Not Found'}, {status: 404});
        }
        

        const pet = new Pet({
            owner: user._id,
            ticker,
            nickname,
            avgBuyPrice,
            quantity: quantity || 1,
        });

        await pet.save();

        return NextResponse.json({message: 'pet registerd', pet}, {status: 201})
    } catch(error) {
        console.error('Error creating pet : ', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    await connectToDatabase();

    //로그인 여부 확인
    const cookieStore = await cookies(); 
    const token = cookieStore.get('token')?.value;
    
    if(!token) {
        return NextResponse.json({message: "UnAuthorized"}, {status: 401});
    }
    
    try{
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        if(!user) {
            return NextResponse.json({message: 'User Not Found'}, {status: 404});
        }
        const pets = await Pet.find({owner: user._id}).sort({createAt: -1});

        return NextResponse.json({pets},{status: 200});
    } catch(error){
        console.error("Error Fetching pets: ", error);
        return NextResponse.json({message: "Internal Server Error"},{status: 500});
    }

}