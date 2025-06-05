
import type { Metadata } from "next";
import {AuthProvider} from "@/contexts/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "반려주식 다마고치",
  description: "오래오래 함께하자..(거짓)",
};

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/TmoneyRoundWindRegular.ttf',
      weight: '300',
      style: 'Regular',
    },
  ],
  variable: '--font-pretendard',
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body
        className={`antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
