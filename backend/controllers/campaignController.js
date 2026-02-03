const Campaign = require('../models/Campaign');

// Create a new campaign
exports.createCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get campaign details
exports.getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update campaign status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'paused', 'finished'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get campaign stats
exports.getStats = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        const ctr = campaign.impressions > 0
            ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
            : 0;

        const cpc = campaign.clicks > 0
            ? (campaign.budget / campaign.clicks).toFixed(2)
            : 0;

        res.status(200).json({
            ctr: parseFloat(ctr),
            cpc: parseFloat(cpc),
            impressions: campaign.impressions,
            clicks: campaign.clicks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete a campaign
exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Duplicate a campaign
exports.duplicateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Create a new campaign with copied data
        const newCampaign = new Campaign({
            name: `${campaign.name} (Copy)`,
            advertiser: campaign.advertiser,
            budget: campaign.budget,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            status: 'paused',
            impressions: 0,
            clicks: 0
        });
        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};