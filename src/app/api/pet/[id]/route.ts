import { verifyToken } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

import User from "@/models/User";
import Pet from "@/models/Pet";

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    await connectToDatabase();

        //로그인 여부 확인
        const cookieStore = await cookies(); 
        const token = cookieStore.get('token')?.value;
        
        if(!token) {
            return NextResponse.json({message: "UnAuthorized"}, {status: 401});
        }
        
        const petId = params.id;

        try{
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.userId);
            if(!user) {
                return NextResponse.json({message: 'User Not Found'}, {status: 404});
            }

            const deleted = await Pet.findOneAndDelete({
                _id: petId,
                owner: user._id
            });

            if(!deleted) {
                return NextResponse.json({message: 'PET NOT FOUND'}, {status: 404});
            }

            return NextResponse.json({message: "PET DELETE"}, {status: 200});
        } catch(error) {
            console.error("ERROR" , error);
            return NextResponse.json({message: "Internal server error"}, {status: 500});
        }
}

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
    await connectToDatabase();
        //로그인 여부 확인
        const cookieStore = await cookies(); 
        const token = cookieStore.get('token')?.value;

        if(!token) {
            return NextResponse.json({message: "UnAuthorized"}, {status: 401});
        }
        
        const petId = params.id;
        const { nickname, avgBuyPrice, quantity } = await req.json();

        try{
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.userId);
            if(!user) {
                return NextResponse.json({message: 'User Not Found'}, {status: 404});
            }

            const updatedPet = await Pet.findOneAndUpdate(
                {_id: petId, owner: user._id},
                {
                    ...(nickname && {nickname}),
                    ...(avgBuyPrice !== undefined && {avgBuyPrice}),
                    ...(quantity !== undefined && {quantity}),
                },
                {new: true}
            );

            if(!updatedPet) {
                return NextResponse.json({message: 'Pet Not FOUND'}, {status: 404})
            }

            return NextResponse.json({message: 'PET UPDATED', pet: updatedPet}, {status: 200});
        } catch(error){
            console.error('Error updating Pet: ', error);
            return NextResponse.json({message: "Internal Server Error"},{status: 500});
        }
}