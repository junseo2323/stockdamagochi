/*
1. MongoDB Atlas 와 연결을 설정
2. 개발 환경에서 중복 연결 방지
3. mongoose를 통해 쉽게 모델을 정의하고 사용할 수 있도록 설정

- .env 에서 MONGODB_URI를 불러오기
- 개발 모드에서 여러번 연결되는 환경 방지 (gloabl 캐시)
- connectToDatabase()함수로 나중에 API ROUTE나 서버 액션 등에서 DB를 연결할 수 있도록 지원
*/

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error('NOT DEFINED IN ENV');
}

// 글로벌 객체에 캐시를 저장하기 위한 선언
declare global {
	var mongoose: {
		conn: typeof mongoose | null;
		promise: Promise<typeof mongoose> | null;
	};
}

//글로벌 캐시 초기화
let cached = global.mongoose;

if(!cached) {
	cached = global.mongoose = {conn: null, promise: null};
}

export async function connectToDatabase() {
	if(cached.conn) {
		return cached.conn;
	}
	
	if(!cached.promise){
		cached.promise = mongoose.connect(MONGODB_URI,{
			bufferCommands: false,
		});
	}
	
	try {
		cached.conn = await cached.promise;
		console.log('CONNECT TO MONGODB SUCCESS!');
		return cached.conn;
	} catch (error) {
		console.log("ERROR TO MONGODB CONNECTION!");
		throw error;
	}
}