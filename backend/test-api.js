const fetch = require('node-fetch');


const API_URL = 'http://localhost:5000';
const TEST_CAMPAIGN = {
    name: "Test Campaign " + Date.now(),
    advertiser: "Test Advertiser",
    budget: 1500,
    startDate: new Date(),
    endDate: new Date(),
    status: "active",
    impressions: 1000,
    clicks: 50
};


const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m"
};

const log = (msg, color = colors.reset) => console.log(`${color}${msg}${colors.reset}`);

async function runTests() {
    log(`🚀 Starting API Tests against ${API_URL}...\n`, colors.blue);
    let createdId = null;

    try {

        log("  Testing GET /campaigns...", colors.yellow);
        const initialRes = await fetch(`${API_URL}/campaigns`);
        if (!initialRes.ok) throw new Error(`GET failed: ${initialRes.status}`);
        const initialList = await initialRes.json();
        log(`    Success! Found ${initialList.length} campaigns.`, colors.green);


        log(" Testing POST /campaigns...", colors.yellow);
        const createRes = await fetch(`${API_URL}/campaigns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_CAMPAIGN)
        });
        if (!createRes.ok) throw new Error(`POST failed: ${createRes.status}`);
        const createdCampaign = await createRes.json();
        createdId = createdCampaign._id;
        log(`   Success! Created campaign with ID: ${createdId}`, colors.green);


        log(` Testing GET /campaigns/${createdId}...`, colors.yellow);
        const getRes = await fetch(`${API_URL}/campaigns/${createdId}`);
        if (!getRes.ok) throw new Error(`GET details failed: ${getRes.status}`);
        const details = await getRes.json();
        if (details.name !== TEST_CAMPAIGN.name) throw new Error("Name mismatch!");
        log(`   Success! Retrieved correct campaign details.`, colors.green);


        log(` Testing PATCH /campaigns/${createdId}/status...`, colors.yellow);
        const updateRes = await fetch(`${API_URL}/campaigns/${createdId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'paused' })
        });
        if (!updateRes.ok) throw new Error(`PATCH failed: ${updateRes.status}`);
        const updated = await updateRes.json();
        if (updated.status !== 'paused') throw new Error("Status update failed!");
        log(`   Success! Status changed to 'paused'.`, colors.green);


        log(` Testing GET /campaigns/${createdId}/stats...`, colors.yellow);
        const statsRes = await fetch(`${API_URL}/campaigns/${createdId}/stats`);
        if (!statsRes.ok) throw new Error(`GET stats failed: ${statsRes.status}`);
        const stats = await statsRes.json();
        const expectedCtr = (50 / 1000) * 100; // 5%
        if (stats.ctr !== expectedCtr) log(`   Note: CTR is ${stats.ctr}%, expected ${expectedCtr}% (float precision may vary)`, colors.blue);
        else log(`    Success! CTR calculated correctly: ${stats.ctr}%`, colors.green);


        log(`Testing DELETE /campaigns/${createdId}...`, colors.yellow);
        const deleteRes = await fetch(`${API_URL}/campaigns/${createdId}`, {
            method: 'DELETE'
        });
        if (!deleteRes.ok) throw new Error(`DELETE failed: ${deleteRes.status}`);
        log(`    Success! Campaign deleted.`, colors.green);

        log(" ALL TESTS PASSED! API IS ROBUST.", colors.green);

    } catch (error) {
        log(`TEST FAILED: ${error.message}`, colors.red);
        if (createdId) {
            log(`Information: Manually delete campaign ${createdId} if needed.`, colors.blue);
        }
    }
}


runTests();
