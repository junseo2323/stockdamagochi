import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';



export async function POST(req: NextRequest) {
	const cookieStore = await cookies();
	cookieStore.delete('token');
	return NextResponse.json({ message: 'LOGOUT SUCCESS'});
}

/*
로그아웃 테스트

`
fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include' // 쿠키 포함해서 삭제 요청
})
.then(res => res.json())
.then(data => console.log('Logout:', data))
.catch(err => console.error(err));
`
*/