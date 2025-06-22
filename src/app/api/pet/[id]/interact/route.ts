import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";

import { ObjectId } from 'mongodb'; 

import Pet from "@/models/Pet";
import { expUp } from "@/lib/api";

type InteractionType = 'play' | 'feeding' | 'teaching' | 'news';
const COOLDOWNS: Record<InteractionType, number> = {
    play : 1000*60*60*24, //놀아주기-24시간
    feeding :  1000 * 60 * 60 * 3, //먹이주기-3시간
    teaching : 1000*60*60*24, //공부하기(퀴즈)-24시간
    news : 1000*60*60*3 //뉴스보기 - 3시간
};

export async function POST(req: NextRequest, {params}: {params: {id: string}}){
    await connectToDatabase();
    const {action} = await req.json();
    if (!['play', 'feeding', 'teaching', 'news'].includes(action)) {
        return NextResponse.json({ error: '알 수 없는 행동입니다.' }, { status: 400 });
    }
    const typedAction = action as InteractionType;

    const petId = new ObjectId(params.id);
    const pet = await Pet.findOne({_id: petId});
    if(!pet) {return NextResponse.json({message: "Pet Not Found"}, {status: 404});}

    const now = new Date();
    const lastTime = pet.lastInteract?.[action];
    const cooldown = COOLDOWNS[typedAction] ?? 0;

    if (lastTime && now.getTime() - new Date(lastTime).getTime() < cooldown){
        return NextResponse.json({error: '쿨타임이 남았습니다.'}, {status: 429});
    }

    let expGain = 0;
    let emotionChange = 0;

    switch(action) {
        case 'play':
            expGain = 5;
            emotionChange = 1;
            break;
        case 'feeding':
            expGain = 10;
            emotionChange = 5;
            break;
        case 'teaching':
            expGain = 20;
            break;
        case 'news':
            expGain = 1;
            emotionChange = 1;
            break;
        default:
          return NextResponse.json({ error: '알 수 없는 행동입니다.' }, { status: 400 }); 
    }

    const newExp = pet.exp + expGain;
    await expUp(pet._id,newExp,pet.level);
    const newEmotion = Math.max(-50, Math.min(50, (pet.emotion ?? 0) + emotionChange));
    
    await Pet.updateOne(
        { _id: petId },
        {
          $set: {
            emotion: newEmotion,
            [`lastInteract.${action}`]: now
          }
        }
      );
    
      return NextResponse.json({ status: 'success', exp: newExp, emotion: newEmotion });
}
    