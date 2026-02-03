require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Campaign = require('./models/Campaign');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adtech-campaign-manager';


app.use(cors());
app.use(bodyParser.json());


app.use('/campaigns', campaignRoutes);
app.get('/', (req, res) => {
    res.send('AdTech Campaign Manager API is running');
});


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


async function startServer() {
    try {

        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
        console.log(' MongoDB Connected (Local/Env)');
    } catch (err) {
        console.log('Local MongoDB not found, switching to In-Memory Database...');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
        console.log(' MongoDB Connected (In-Memory)');
    }


    const count = await Campaign.countDocuments();
    if (count === 0) {
        console.log(' Creating initial seed data...');
        await Campaign.insertMany(seedData);
        console.log('Database seeded');
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();
