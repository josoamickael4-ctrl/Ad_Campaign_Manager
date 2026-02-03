const API_URL = 'http://localhost:5000';

export async function fetchCampaigns() {
    const res = await fetch(`${API_URL}/campaigns`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch campaigns');
    return res.json();
}

export async function fetchCampaign(id: string) {
    const res = await fetch(`${API_URL}/campaigns/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch campaign');
    return res.json();
}

export async function createCampaign(data: any) {
    const res = await fetch(`${API_URL}/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create campaign');
    return res.json();
}

export async function updateCampaignStatus(id: string, status: string) {
    const res = await fetch(`${API_URL}/campaigns/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
}

export async function fetchCampaignStats(id: string) {
    const res = await fetch(`${API_URL}/campaigns/${id}/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
}
export async function deleteCampaign(id: string) {
    const res = await fetch(`${API_URL}/campaigns/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to delete campaign');
    return res.json();
}

export async function duplicateCampaign(id: string) {
    const res = await fetch(`${API_URL}/campaigns/${id}/duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to duplicate campaign');
    return res.json();
}