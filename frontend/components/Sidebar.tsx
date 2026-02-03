'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className="fixed top-0 left-0 h-screen w-[280px] bg-[#fbfbfd] border-r border-[#d2d2d7]/50 flex flex-col z-50 pt-8 pb-6 px-4">


            <div className="mb-10 flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-black text-white rounded-[8px] flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="text-[19px] font-semibold text-[#1d1d1f] tracking-tight">AdManager</span>
            </div>


            <div className="flex-1 space-y-8">
                <div>
                    <h3 className="px-4 text-[11px] font-medium text-[#86868b] uppercase tracking-wider mb-3">Menu</h3>
                    <nav className="space-y-1.5">
                        <Link
                            href="/"
                            className={`flex items-center justify-start px-4 py-2.5 rounded-[10px] text-[15px] font-medium transition-all duration-200 group ${isActive('/')
                                ? 'bg-[#e8e8ed] text-[#1d1d1f]'
                                : 'text-[#525255] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                                }`}
                        >
                            <svg className={`w-[20px] h-[20px] mr-3 flex-shrink-0 ${isActive('/') ? 'text-[#1d1d1f]' : 'text-[#86868b] group-hover:text-[#525255]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            <span className="truncate">Dashboard</span>
                        </Link>

                        <Link
                            href="/campaigns"
                            className={`flex items-center justify-start px-4 py-2.5 rounded-[10px] text-[15px] font-medium transition-all duration-200 group ${isActive('/campaigns')
                                ? 'bg-[#e8e8ed] text-[#1d1d1f]'
                                : 'text-[#525255] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                                }`}
                        >
                            <svg className={`w-[20px] h-[20px] mr-3 flex-shrink-0 ${isActive('/campaigns') ? 'text-[#1d1d1f]' : 'text-[#86868b] group-hover:text-[#525255]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                            <span className="truncate">Campaigns</span>
                        </Link>
                    </nav>
                </div>

                <div>
                    <h3 className="px-4 text-[11px] font-medium text-[#86868b] uppercase tracking-wider mb-3">Actions</h3>
                    <nav className="space-y-1.5">
                        <Link
                            href="/campaigns/new"
                            className="flex items-center justify-start px-4 py-2.5 rounded-[10px] text-[15px] font-medium text-[#0071e3] bg-blue-50/50 hover:bg-blue-100/50 transition-all duration-200 group"
                        >
                            <svg className="w-[20px] h-[20px] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            <span className="truncate">Create Campaign</span>
                        </Link>
                    </nav>
                </div>
            </div>


        </aside>
    );
}
