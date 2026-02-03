const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // We need to export app from server.js

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect(); // Disconnect any existing connection
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Campaign API', () => {
    let campaignId;
    const campaignData = {
        name: "Jest Test Campaign",
        advertiser: "Test Corp",
        budget: 1000,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        status: "active"
    };

    it('should create a new campaign', async () => {
        const res = await request(app)
            .post('/campaigns')
            .send(campaignData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(campaignData.name);
        campaignId = res.body.id;
    });

    it('should get all campaigns', async () => {
        const res = await request(app).get('/campaigns');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get campaign stats', async () => {
        const res = await request(app).get(`/campaigns/${campaignId}/stats`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ctr');
        expect(res.body).toHaveProperty('cpc');
    });

    it('should update campaign status', async () => {
        const res = await request(app)
            .patch(`/campaigns/${campaignId}/status`)
            .send({ status: 'paused' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('paused');
    });

});
