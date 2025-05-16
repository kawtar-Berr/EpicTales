// // app/layout.tsx
// import React from 'react';
// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css'; 

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'EpicTales',
//   description: 'Plateforme collaborative pour écrire des histoires en temps réel',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';
import './globals.css';
import { Inter } from 'next/font/google';

// Importing fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="EpicTales - Collaborative storytelling platform" />
        <title>EpicTales - Collaborative Storytelling</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextUIProvider>
          {children}
          <Toaster position="top-right" />
        </NextUIProvider>
      </body>
    </html>
  );
}