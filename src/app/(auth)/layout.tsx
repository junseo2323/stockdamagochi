import React from 'react';
import Link from 'next/link';

export default function AuthLayout({children} : {children: React.ReactNode}) {
	return(
		<div className="relative min-h-screen w-full">
			<div>
			<div className="relative bg-[#000000] flex flex-col float-left min-h-screen w-1/2 pl-10 pt-10">
				<h1 className="flex-auto text-white text-4xl font-extrabold">Destiny</h1>
				<div className="flex-auto">
				  <p className="text-white text-2xl font-bold">Let's Kick Now!</p>
				  <p className="text-white">It's Easy and takes less then 30 seconds.</p>		
				</div>
				<div className="flex-none pb-10">
				  <Link href="/home" className="text-white font-bold absolute z-40">HOME</Link>
				</div>
			</div>
			<div className="relative float-right pr-10 pt-10">
				<button>
				  <img src="/hamburger.png" width={24}/>
				</button>
			</div>
			</div>
			 <div className="absolute inset-0 flex items-center justify-center z-10">
				{children}
		  	</div>
		</div>
	);
}