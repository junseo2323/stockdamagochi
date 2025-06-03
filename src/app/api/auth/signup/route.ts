/*
-POST /api/auth/signup
- 요청 body: { name, email, password }
- 이메일 중복 시 에러
- 비밀번호는 bcrypt로 암호화
- 유효하지 않은 입력은 거절
- 성공 시 MongoDB에 사용자 저장
*/

import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {connectToDatabase} from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: NextRequest) {
	//1. body 파싱
	const {name, email, password} = await req.json();
	
	//2. 유효성 검사
	if(!name || !email || !password) {
		return NextResponse.json({message: 'MISSING FIELDS'}, {status: 400});
	}
	
	//3. DB 연결
	await connectToDatabase();
	
	//4. 이메일 중복 체크
	const existingUser = await User.findOne({email});
	if(existingUser){
		return NextResponse.json({message: 'Email already in use'}, {status: 409})
	}
	
	//5. 비밀번호 해시
	const hashedPassword = await bcrypt.hash(password,10);
	
	//6. 유저 생성
	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});
	
	//7. 응답
	return NextResponse.json(
		{message: 'User Created Successfully', userId: newUser._id},
		{status: 201}
	)
}

/*
**WEB에서 POST 테스트하기.**
- console 창에서 진행
`
fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'testuser@example.com',
    password: '12345678',
  }),
})
  .then((res) => res.json())
  .then((data) => console.log('✅ 성공:', data))
  .catch((err) => console.error('❌ 에러:', err));
`

*/