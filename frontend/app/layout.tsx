import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AdTech Campaign Manager',
  description: 'Manage your advertising campaigns',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#fbfbfd]`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[280px] p-12 max-w-[1240px] mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
