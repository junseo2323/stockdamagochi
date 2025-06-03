import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value;
	
	if(!token) {
		return NextResponse.json({authenticated: false}, {status: 401});
	}
	
	try {
		const decoded = verifyToken(token);
		
		return NextResponse.json({authenticated: true, user: decoded});
	} catch(err) {
		return NextResponse.json({authenticated: false}, {status: 401});
	}
}