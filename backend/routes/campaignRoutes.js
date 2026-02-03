const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);
router.get('/:id', campaignController.getCampaign);
router.patch('/:id/status', campaignController.updateStatus);
router.get('/:id/stats', campaignController.getStats);

module.exports = router;
