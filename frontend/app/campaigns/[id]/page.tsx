'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCampaign, fetchCampaignStats, updateCampaignStatus, deleteCampaign, duplicateCampaign } from '@/lib/api';

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [campaign, setCampaign] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [toggling, setToggling] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [duplicating, setDuplicating] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [campaignData, statsData] = await Promise.all([
                    fetchCampaign(id),
                    fetchCampaignStats(id)
                ]);
                setCampaign(campaignData);
                setStats(statsData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    const handleStatusToggle = async () => {
        if (!campaign) return;
        setToggling(true);
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';
        try {
            const updated = await updateCampaignStatus(id, newStatus);
            setCampaign(updated);
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to update status');
        } finally {
            setToggling(false);
        }
    };

    const handleDeleteCampaign = async () => {
        setDeleting(true);
        try {
            await deleteCampaign(id);
            router.push('/campaigns');
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to delete campaign');
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleDuplicateCampaign = async () => {
        setDuplicating(true);
        try {
            const newCampaign = await duplicateCampaign(id);
            router.push(`/campaigns/${newCampaign._id}`);
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to duplicate campaign');
            setDuplicating(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-pulse rounded-full h-8 w-8 bg-[#d2d2d7]"></div>
        </div>
    );
    if (!campaign) return <div className="text-center py-12 text-[#86868b]">Campaign not found</div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">


            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-[#d2d2d7] pb-6 gap-6">
                <div className="flex-1 min-w-0">
                    <button onClick={() => router.back()} className="text-[#0071e3] text-sm mb-3 hover:underline flex items-center inline-flex gap-1 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Campaigns
                    </button>
                    <h1 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight truncate">{campaign.name}</h1>
                    <p className="text-[#86868b] text-[15px] mt-1">{campaign.advertiser}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                    <button
                        onClick={handleStatusToggle}
                        disabled={toggling || campaign.status === 'finished'}
                        className={`btn-primary px-6 py-2.5 text-[15px] font-medium whitespace-nowrap transition-all ${campaign.status === 'active' ? '!bg-[#ff9f0a] hover:!bg-[#f59e0b]' :
                            campaign.status === 'paused' ? '!bg-[#34c759] hover:!bg-[#30b753]' : '!bg-[#86868b] cursor-not-allowed'
                            }`}
                    >
                        {toggling ? 'Updating...' :
                            campaign.status === 'active' ? 'Pause' :
                                campaign.status === 'paused' ? 'Activate' : 'Finished'}
                    </button>
                </div>
            </div>

            {stats && (
                <section>
                    <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-4">Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                            <p className="text-[13px] font-medium text-[#86868b] uppercase tracking-wide">CTR</p>
                            <p className="mt-2 text-[40px] font-semibold text-[#1d1d1f] tracking-tight">{stats.ctr}%</p>
                        </div>
                        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                            <p className="text-[13px] font-medium text-[#86868b] uppercase tracking-wide">CPC</p>
                            <p className="mt-2 text-[40px] font-semibold text-[#1d1d1f] tracking-tight">${stats.cpc}</p>
                        </div>
                        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                            <p className="text-[13px] font-medium text-[#86868b] uppercase tracking-wide">Impressions</p>
                            <p className="mt-2 text-[40px] font-semibold text-[#1d1d1f] tracking-tight">{stats.impressions.toLocaleString('en-US')}</p>
                        </div>
                        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                            <p className="text-[13px] font-medium text-[#86868b] uppercase tracking-wide">Clicks</p>
                            <p className="mt-2 text-[40px] font-semibold text-[#1d1d1f] tracking-tight">{stats.clicks.toLocaleString('en-US')}</p>
                        </div>
                    </div>
                </section>
            )}


            <section>
                <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-4">Configuration</h3>
                <div className="bg-white rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                        <div>
                            <p className="text-[#86868b] text-xs uppercase font-medium">Budget</p>
                            <p className="text-[#1d1d1f] text-lg font-medium mt-1">${campaign.budget.toLocaleString('en-US')}</p>
                        </div>
                        <div>
                            <p className="text-[#86868b] text-xs uppercase font-medium">Status</p>
                            <p className="text-[#1d1d1f] text-lg font-medium mt-1 capitalize">{campaign.status}</p>
                        </div>
                        <div>
                            <p className="text-[#86868b] text-xs uppercase font-medium">Start Date</p>
                            <p className="text-[#1d1d1f] text-lg font-medium mt-1">{new Date(campaign.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-[#86868b] text-xs uppercase font-medium">End Date</p>
                            <p className="text-[#1d1d1f] text-lg font-medium mt-1">{new Date(campaign.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
