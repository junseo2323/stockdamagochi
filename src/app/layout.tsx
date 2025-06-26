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
        className={`font-[notosans] min-h-screen bg-gradient-to-r from-[#F4F5F6] to-[#9FB4FF]`}
      >
{/* 배경 이미지 레이어 */}
<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
  <div className="w-full h-full bg-gradient-to-b from-[#B9FBFF] to-[#D1C9F1] blur-[2px] rounded-2xl" />

  {/* 모바일에서는 더 작게, 데스크탑에선 크게 */}
  <img
    src="/bg_img1.png"
    alt="bg1"
    className="absolute top-0 left-0 w-1/3 sm:w-1/4 md:w-[200px] h-auto object-contain"
  />
  <img
    src="/bg_img2.png"
    alt="bg2"
    className="absolute bottom-0 right-0 w-1/3 sm:w-1/4 md:w-[200px] h-auto object-contain"
  />
</div>

        {/* 컨텐츠 레이어 */}
        <div className="relative z-10 min-h-screen">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
