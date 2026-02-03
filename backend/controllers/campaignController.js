const Campaign = require('../models/Campaign');
const Joi = require('joi');

const campaignSchema = Joi.object({
    name: Joi.string().required(),
    advertiser: Joi.string().required(),
    budget: Joi.number().min(0).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    status: Joi.string().valid('active', 'paused', 'finished').default('paused')
});

exports.createCampaign = async (req, res) => {
    try {
        const { error } = campaignSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const { page = 1, limit = 20, status } = req.query;
        const query = {};
        if (status) query.status = status;

        const campaigns = await Campaign.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Optional: Return count if needed, but keeping array response for current frontend compatibility
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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