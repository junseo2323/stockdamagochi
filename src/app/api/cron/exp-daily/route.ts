import { NextResponse } from "next/server";
import {connectToDatabase} from '@/lib/mongoose';

import { expUp } from "@/lib/api";

import Pet from '@/models/Pet';

export async function GET() {
    await connectToDatabase();

    const pets = await Pet.find({});

    const now = new Date();

    const updated = await Promise.all(
        pets.map(async (pet) => {
            const lastUpdated = pet.lastExpUpdate ?? pet.createdAt;
            const timeDiff = now.getTime() - new Date(lastUpdated).getTime();

            const oneDay = 1000 * 60 * 60 * 24;
            if(timeDiff >= oneDay) {
                const dailyExp = 2;
                expUp(pet._id,dailyExp,pet.level);
                return Pet.updateOne(
                    {_id: pet._id},
                    {
                        $set: { lastExpUpdate: now },
                    }            
                )
            }
        })
    )
    return NextResponse.json({ status: 'ok', updated: updated.length })
}