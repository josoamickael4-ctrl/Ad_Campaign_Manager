import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="glass-nav sticky top-0 z-50">
            <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[48px] items-center">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center group cursor-pointer">
                            {/* Logo Area */}
                            <span className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] transition-opacity group-hover:opacity-70">
                                AdManager
                            </span>
                        </Link>

                        {/* Primary Navigation Links with Borders */}
                        <div className="hidden sm:flex items-center space-x-2">
                            <Link href="/campaigns" className="text-[13px] font-medium text-[#1d1d1f] hover:text-[#000] px-3 py-1.5 rounded-full border border-[#d2d2d7] bg-white hover:bg-[#f5f5f7] transition-all">
                                Campaigns
                            </Link>
                            <Link href="/campaigns/new" className="text-[13px] font-medium text-[#1d1d1f] hover:text-[#000] px-3 py-1.5 rounded-full border border-[#d2d2d7] bg-white hover:bg-[#f5f5f7] transition-all">
                                Create
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {/* Improved Primary Action Button */}
                        <Link
                            href="/campaigns/new"
                            className="
                                relative
                                text-[13px] 
                                px-5 
                                py-2 
                                h-[34px]
                                font-semibold
                                text-white
                                bg-gradient-to-r from-blue-600 to-blue-500
                                hover:from-blue-700 hover:to-blue-600
                                active:from-blue-800 active:to-blue-700
                                rounded-lg
                                shadow-sm
                                hover:shadow-md
                                active:shadow-sm
                                transition-all
                                duration-200
                                ease-out
                                overflow-hidden
                                group
                                flex items-center justify-center
                                whitespace-nowrap
                            "
                        >
                            {/* Subtle shine effect on hover */}
                            <span className="
                                absolute 
                                inset-0 
                                bg-gradient-to-r 
                                from-transparent 
                                via-white/20 
                                to-transparent 
                                translate-x-[-100%] 
                                group-hover:translate-x-[100%]
                                transition-transform
                                duration-500
                            " />

                            {/* Button content */}
                            <span className="flex items-center gap-1.5 relative">
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                New Campaign
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}