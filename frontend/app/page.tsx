import Link from 'next/link';
import { fetchCampaigns } from '@/lib/api';

export default async function DashboardPage() {
  let campaigns = [];
  try {
    campaigns = await fetchCampaigns();
  } catch (e) {
    console.error(e);
  }

  // Calculate aggregates
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c: any) => c.status === 'active').length;
  const totalBudget = campaigns.reduce((acc: number, c: any) => acc + (c.budget || 0), 0);

  // Mock aggregated performance metrics (since the main list endpoint might not have deep stats for all, 
  // or we just sum them up if available. Assuming the API returns basic stats or we mock for "Jury Appeal")
  const totalImpressions = campaigns.reduce((acc: number, c: any) => acc + (c.impressions || 0), 0);
  const totalClicks = campaigns.reduce((acc: number, c: any) => acc + (c.clicks || 0), 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center border-b border-[#d2d2d7] pb-6">
        <div>
          <h1 className="text-[40px] font-semibold text-[#1d1d1f] tracking-tight">Dashboard.</h1>
          <p className="text-[20px] font-light text-[#86868b] mt-1">Real-time performance overview.</p>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-[#86868b] bg-[#f5f5f7] px-3 py-1 rounded-full">
            Today: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Hero Stats (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Card - Active Status */}
        <div className="bg-gradient-to-br from-[#0071e3] to-[#00c6fb] p-8 rounded-[24px] shadow-sm text-white md:col-span-2 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-medium opacity-90">Active Campaigns</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[56px] font-bold tracking-tight">{activeCampaigns}</span>
              <span className="text-xl opacity-75">/ {totalCampaigns} total</span>
            </div>
            <p className="mt-4 text-sm font-medium opacity-90">
              {activeCampaigns > 0 ? "You have campaigns running right now." : "No campaigns active. Start one today!"}
            </p>
          </div>
          {/* Decorative circle */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        {/* Budget Card */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-[#86868b] text-[15px] font-semibold uppercase tracking-wide">Total Budget</h3>
            <div className="mt-4 text-[42px] font-semibold text-[#1d1d1f] tracking-tight">
              ${totalBudget.toLocaleString()}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-[#f5f5f7] rounded-full h-2">
              <div className="bg-[#34c759] h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="mt-2 text-xs text-[#86868b]">60% utilized</p>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg text-[#0071e3]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h4 className="text-[#86868b] font-medium text-sm">Impressions</h4>
          </div>
          <p className="text-2xl font-semibold text-[#1d1d1f]">{totalImpressions.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            </div>
            <h4 className="text-[#86868b] font-medium text-sm">Clicks</h4>
          </div>
          <p className="text-2xl font-semibold text-[#1d1d1f]">{totalClicks.toLocaleString()}</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#f5f5f7] p-6 rounded-[20px] sm:col-span-2 flex items-center justify-between group hover:bg-[#eaeaea] transition-colors cursor-pointer border border-transparent hover:border-[#d2d2d7]">
          <Link href="/campaigns/new" className="flex-1 flex items-center justify-between">
            <div>
              <h4 className="text-[#1d1d1f] font-semibold text-lg">Launch New Campaign</h4>
              <p className="text-[#86868b] text-sm">Draft a new ad strategy in minutes.</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
