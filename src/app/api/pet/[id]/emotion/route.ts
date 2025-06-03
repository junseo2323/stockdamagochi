import { connectToDatabase } from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from "@/lib/jwt";

import User from "@/models/User";
import Pet from "@/models/Pet";

const API_KEY = process.env.TWELVE_DATA_API_KEY;
const BASE_URL = 'https://api.twelvedata.com/price';

function getEmotionByRate(rate: number){
    if(rate >= 10) return 'happy';
    if(rate >= -5) return 'neutral';
    return 'sad';
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    await connectToDatabase();
            //로그인 여부 확인
            const cookieStore = await cookies(); 
            const token = cookieStore.get('token')?.value;
    
            if(!token) {
                return NextResponse.json({message: "UnAuthorized"}, {status: 401});
            }

            const petId =  params.id;   

            try{
                const decoded = verifyToken(token);
                const user = await User.findById(decoded.userId);
                if(!user) {
                    return NextResponse.json({message: 'User Not Found'}, {status: 404});
                }

                const pet = await Pet.findOne({_id: petId, owner: user._id});
                console.log('_id:', petId, 'owner:', user._id)
                if (!pet) {
                    return NextResponse.json({message: 'pet not found'}, {status: 401});
                }

                const priceRes = await fetch(`${BASE_URL}?symbol=${pet.ticker}&apikey=${API_KEY}`);
                const priceData = await priceRes.json();
                const currentPrice = parseFloat(priceData.price);
               
                if (!currentPrice || isNaN(currentPrice)) {
                    return NextResponse.json({ message: 'Failed to fetch price' }, { status: 500 });
                  }
              
                const rate = ((currentPrice - pet.avgBuyPrice) / pet.avgBuyPrice) * 100;
                const newEmotion = getEmotionByRate(rate);

                pet.emotion = newEmotion;
                await pet.save();

                return NextResponse.json({ emotion: newEmotion, rate: rate.toFixed(2) }, { status: 200 });

            }catch(error){
                console.error('Emotion update error:', error);
                return NextResponse.json({ message: 'Internal server error' }, { status: 500 });            
            }
}