const mongoose = require('mongoose');
const Campaign = require('./models/Campaign');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adtech-campaign-manager';

const seedData = [
    {
        name: "Summer Sale 2025",
        advertiser: "Nike",
        budget: 5000,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: "active",
        impressions: 12000,
        clicks: 450
    },
    {
        name: "Black Friday Promo",
        advertiser: "Adidas",
        budget: 10000,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        status: "paused",
        impressions: 5000,
        clicks: 120
    },
    {
        name: "New Collection Launch",
        advertiser: "Puma",
        budget: 3000,
        startDate: new Date(new Date().setDate(new Date().getDate() - 10)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        status: "finished",
        impressions: 8000,
        clicks: 300
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected for seeding');
        await Campaign.deleteMany({});
        await Campaign.insertMany(seedData);
        console.log('🌱 Database Seeded');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
