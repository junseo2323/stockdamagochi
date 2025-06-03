/*
-POST /api/auth/login
-이메일 & 비밀번호 입력받기
-DB에서 해당 이메일 유저 찾기
-bcrypt로 비밀번호 비교
-로그인 성공 시 성공 메시지 + 유저 ID 반환
-실패 시 에러 메시지 반환

*/

import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {connectToDatabase} from '@/lib/mongoose';
import User from '@/models/User';

import {signToken} from '@/lib/jwt';
import {cookies} from 'next/headers';



export async function POST(req: NextRequest) {
	const {email, password} = await req.json();
	
	if(!email || !password) {
		return NextResponse.json({message: 'MISSING FIELDS'}, {status: 400});
	}
	
	await connectToDatabase();
	
	//1. User 검색 
	const user = await User.findOne({email});
	if(!user){
    	return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
	}
	
	//2. 비밀번호 검사
	const passwordMatch = await bcrypt.compare(password, user.password);
	if(!passwordMatch) {
		return NextResponse.json({message: 'Invalid email or password'}, {status: 401});
	}
	
	//3. 토큰 생성
	const token = signToken({userId: user._id});
    const cookieStore = await cookies(); 
	cookieStore.set('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	});
	
	return NextResponse.json({
		message: 'Login successful',
		userId: user._id,
	});
	
}


/*
로그인 테스트

`
fetch('/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'hong@example.com',
    password: 'mypassword'
  }),
  credentials: 'include'  // 쿠키 저장용
})
.then(res => res.json())
.then(data => console.log('Login:', data))
.catch(err => console.error(err));

`
*/