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
        className={`font-sans`+' overflow-hidden bg-[#DEC9C0] '}
      >
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
