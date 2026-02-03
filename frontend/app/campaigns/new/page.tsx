'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '@/lib/api';

export default function NewCampaignPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        advertiser: '',
        budget: '',
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createCampaign({
                ...formData,
                budget: Number(formData.budget)
            });
            router.push('/campaigns');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[700px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8 text-center">
                <h1 className="text-[40px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">New Campaign.</h1>
                <p className="text-[17px] text-[#86868b] mt-2">Launch your next big idea.</p>
            </div>

            {error && (
                <div className="bg-[#fff2f4] text-[#d6002f] p-4 mb-6 rounded-xl text-sm font-medium text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[rgba(0,0,0,0.04)] space-y-6">
                    <div>
                        <label className="block text-[12px] uppercase tracking-wider font-semibold text-[#86868b] mb-2">Campaign Details</label>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Campaign Name"
                                className="input-field bg-[#f5f5f7] border-0 rounded-xl px-4 py-3 w-full text-[17px] placeholder-[#86868b]"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="advertiser"
                                required
                                placeholder="Advertiser Name"
                                className="input-field bg-[#f5f5f7] border-0 rounded-xl px-4 py-3 w-full text-[17px] placeholder-[#86868b]"
                                value={formData.advertiser}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="budget"
                                required
                                min="0"
                                placeholder="Budget ($)"
                                className="input-field bg-[#f5f5f7] border-0 rounded-xl px-4 py-3 w-full text-[17px] placeholder-[#86868b]"
                                value={formData.budget}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[12px] uppercase tracking-wider font-semibold text-[#86868b] mb-2">Duration</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-[#86868b] block mb-1 ml-1">Start</span>
                                <input
                                    type="date"
                                    name="startDate"
                                    required
                                    className="input-field bg-[#f5f5f7] border-0 rounded-xl px-4 py-3 w-full text-[15px] text-[#1d1d1f]"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <span className="text-xs text-[#86868b] block mb-1 ml-1">End</span>
                                <input
                                    type="date"
                                    name="endDate"
                                    required
                                    className="input-field bg-[#f5f5f7] border-0 rounded-xl px-4 py-3 w-full text-[15px] text-[#1d1d1f]"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn-secondary px-8 py-2.5 text-[15px] font-medium w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary px-8 py-2.5 text-[15px] font-medium w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Campaign'}
                    </button>
                </div>
            </form>
        </div>
    );
}
