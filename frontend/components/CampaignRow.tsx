'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { duplicateCampaign, deleteCampaign } from '@/lib/api';

interface CampaignRowProps {
    campaign: any;
}

const getAvatarColor = (name: string) => {
    const colors = [
        'bg-blue-100 text-blue-700',
        'bg-purple-100 text-purple-700',
        'bg-emerald-100 text-emerald-700',
        'bg-orange-100 text-orange-700',
        'bg-pink-100 text-pink-700',
        'bg-indigo-100 text-indigo-700'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default function CampaignRow({ campaign }: CampaignRowProps) {
    const router = useRouter();
    const [isDuplicating, setIsDuplicating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const initial = campaign.advertiser ? campaign.advertiser.charAt(0).toUpperCase() : '?';
    const avatarColorClass = getAvatarColor(campaign.advertiser || 'Unknown');

    const handleDuplicate = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Duplicate this campaign?')) {
            setIsDuplicating(true);
            try {
                await duplicateCampaign(campaign.id || campaign._id);
                router.refresh();
            } catch (error) {
                console.error(error);
                alert('Failed to duplicate');
            } finally {
                setIsDuplicating(false);
            }
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Delete this campaign? This cannot be undone.')) {
            setIsDeleting(true);
            try {
                await deleteCampaign(campaign.id || campaign._id);
                router.refresh();
            } catch (error) {
                console.error(error);
                alert('Failed to delete');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <li className="group hover:bg-[#fbfbfd] transition-colors duration-150">
            <div className="px-8 py-6">
                <div className="flex items-center justify-between gap-6">


                    <Link href={`/campaigns/${campaign.id || campaign._id}`} className="flex-1 min-w-0 block group/link">
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarColorClass}`}>
                                {initial}
                            </div>

                            <div className="min-w-0 flex items-center">
                                <p className="text-[17px] font-semibold text-[#1d1d1f] truncate group-hover/link:text-[#0071e3] transition-colors">
                                    {campaign.name}
                                </p>
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ml-3 flex-shrink-0 ${campaign.status === 'active' ? 'bg-[#e8f7e9] text-[#1e7e22] border-[#1e7e22]/10' :
                                    campaign.status === 'paused' ? 'bg-[#fff5e5] text-[#b37400] border-[#b37400]/10' :
                                        'bg-[#f5f5f7] text-[#1d1d1f] border-[#d2d2d7]'
                                    }`}>
                                    {campaign.status === 'active' ? 'Active' : campaign.status === 'paused' ? 'Paused' : 'Finished'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center text-[13px] text-[#86868b] space-x-4 ml-14 flex-wrap">
                            <span className="font-medium text-[#1d1d1f]">${campaign.budget.toLocaleString('en-US')}</span>
                            <span>&middot;</span>
                            <span className="font-medium text-[#1d1d1f]">
                                CTR: {campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : '0.00'}%
                            </span>
                            <span>&middot;</span>
                            <span>{campaign.advertiser}</span>
                        </div>
                    </Link>


                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleDuplicate}
                            disabled={isDuplicating}
                            title="Duplicate"
                            className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            title="Delete"
                            className="p-2 text-[#ff3b30] hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>


                    <Link href={`/campaigns/${campaign.id || campaign._id}`} className="flex-shrink-0 p-2 rounded-lg hover:bg-[#e8e8ed] transition-colors group/arrow">
                        <svg className="h-5 w-5 text-[#d2d2d7] group-hover/arrow:text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </li>
    );
}
