import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    const cookieStore = await cookies(); 
	const token = cookieStore.get('token')?.value;

	if(!token) {
		return NextResponse.json("NO TOKEN AVAILABLE", {status: 401});
	}
	
	const decoded = verifyToken(token);
	const user = await User.findById(decoded.userId).select('name email'); // 필요한 정보만

	try {
		return NextResponse.json({user: user});
	} catch(err) {
		return NextResponse.json(err, {status: 401});
	}
}