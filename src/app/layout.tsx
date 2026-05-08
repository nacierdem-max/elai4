import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/tailwind.css';
import { RoleProvider } from '@/context/RoleContext';

const geistSans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'EliarArGe — Akıllı Ar-Ge Proje Yönetimi',
  description: 'Eliar Elektrik için 100 kişilik mühendislik ekibinin proje, görev, risk ve dosya yönetimini tek platformda birleştiren Ar-Ge yönetim sistemi.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className={geistSans.className}>
        <RoleProvider>
          {children}
        </RoleProvider>
</body>
    </html>
  );
}