import type { Metadata } from "next";
import {AuthProvider} from "@/contexts/AuthContext";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import Nav from "@/components/Nav";
import Head from 'next/head'

const notoSansKr = Noto_Sans_KR({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "반려주식 다마고치",
  description: "오래오래 함께하자..(거짓)",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSansKr.variable}>
      <body
        className={`font-[notosans]`+' overflow-hidden bg-gradient-to-r from-[#F4F5F6] to-[#9FB4FF] '}
      >
       
    {/* 배경 블러 레이어 */}
    <div className="m-auto absolute w-130 inset-0 z-0 bg-gradient-to-b from-[#B9FBFF] to-[#D1C9F1] blur-md rounded-2xl" />

    {/* 컨텐츠 레이어 */}
    <div className="relative z-10">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
      </body>
    </html>
  );
}
