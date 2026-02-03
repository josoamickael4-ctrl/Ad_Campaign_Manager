import { fetchCampaigns } from '@/lib/api';
import Link from 'next/link';
import CampaignRow from '@/components/CampaignRow';

export default async function CampaignsPage() {
    let campaigns = [];
    try {
        campaigns = await fetchCampaigns();
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">


            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#d2d2d7]/50 pb-6">
                <div>
                    <h1 className="text-[32px] font-bold text-[#1d1d1f] tracking-tight">Campaigns</h1>
                </div>
            </div>


            <div className="bg-white rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)] overflow-hidden">
                <ul role="list" className="divide-y divide-[#f5f5f7]">
                    {campaigns.length === 0 ? (
                        <li className="px-8 py-24 text-center">
                            <div className="w-16 h-16 bg-[#f5f5f7] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" /></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-[#1d1d1f]">No campaigns found</h3>
                            <p className="mt-2 text-[#86868b]">Get started by creating a new campaign above.</p>
                            <div className="mt-8 flex justify-center">
                                <Link href="/campaigns/new" className="btn-primary px-6 py-2">
                                    Create Campaign
                                </Link>
                            </div>
                        </li>
                    ) : (
                        campaigns.map((campaign: any) => (
                            <CampaignRow key={campaign.id || campaign._id} campaign={campaign} />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
