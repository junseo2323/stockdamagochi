import {NextResponse} from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';

export async function GET() {
	try {
		await connectToDatabase();
		return NextResponse.json({message: 'MONGODB CONNECTED'}, {status: 200});
	} catch(error) {
		console.error('Connection ERROR', error);
		return NextResponse.json({message: 'CONNECTION FAILED'}, {status: 500});
	}
}