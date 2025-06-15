import React from 'react';
import Link from 'next/link';

export default function AuthLayout({children} : {children: React.ReactNode}) {
	return(
		<div className="relative min-h-screen w-full">
			<div className="absolute inset-0 flex items-center justify-center z-10">
			<div className="relative flex flex-col float-left min-h-screen w-100 pl-10 pt-10">
				<div className="flex-auto">
					<p className="text-white text-2xl font-bold">반려주식 다마고치</p>
					<p className="text-white ">당신의 주식을 평생의 반려로 함께하세요.</p>		
				</div>
			</div>
				{children}
		  	</div>
		</div>
	);
}