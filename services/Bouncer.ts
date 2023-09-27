import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';

const X_API_KEY = process.env.BOUNCER_API_KEY;

async function getAvailableCredits() {
    let response = await axios({
        method: 'get',
        url: "https://api.usebouncer.com/v1.1/credits",
        headers: {
            'x-api-key': X_API_KEY
        }
    });

    return response.data;
}

async function verifyEmail(email) {
    let response = await axios({
        method: 'get',
        url: `https://api.usebouncer.com/v1.1/email/verify?email=${email}`,
        headers: {
            'x-api-key': X_API_KEY
        }
    });

    return response.data;
}

async function createBatch(emails: {email: string}[]) {
    let response = await axios({
        method: 'post',
        url: "https://api.usebouncer.com/v1.1/email/verify/batch",
        headers: {
            'x-api-key': X_API_KEY,
            'Content-Type': "application/json"
        },
        data: emails
    });

    return response.data;
}

async function getBatchStatus(batchId) {
    let response = await axios({
        method: 'get',
        url: `https://api.usebouncer.com/v1.1/email/verify/batch/${batchId}`,
        headers: {
            'x-api-key': X_API_KEY
        }
    });

    return response.data;
}

async function getBatchResult(batchId) {
    let response = await axios({
        method: 'get',
        url: `https://api.usebouncer.com/v1.1/email/verify/batch/${batchId}/download?download=all`, // download: all, deliverable, undeliverable, unknown
        headers: {
            'x-api-key': X_API_KEY
        }
    });

    return response.data;
}

async function test() {
    let emails = [
        "deliverable@sandbox.usebouncer.com",
        "free@sandbox.usebouncer.com",
        "disposable@sandbox.usebouncer.com",
        "accept-all@sandbox.usebouncer.com",
        "undeliverable@sandbox.usebouncer.com",
        "unknown@sandbox.usebouncer.com",
        "other@sandbox.usebouncer.com"
    ];

    // let response = await verifyEmail("hello@yoshiku.com");
    // console.log("...response: ", response);

    // let credits = await getAvailableCredits();
    // console.log("...credits: ", credits);

    // let batch = await createBatch(emails.map((email) => {return {email: email}}));
    // console.log("...batch: ", batch);
    // batch = {
    //     batchId: '6513b0e05d95174711d69cdf',
    //     created: '2023-09-27T04:34:40.947Z',
    //     status: 'queued',
    //     quantity: 7,
    //     duplicates: 0
    // };

    // let batchStatus = await getBatchStatus('6513b0e05d95174711d69cdf');
    // console.log("...batchStatus: ", batchStatus);

    // let batchResult = await getBatchResult('6513b0e05d95174711d69cdf');
    // console.log("...batchResult: ", batchResult);
    // console.log(process.env)
    // console.log(process.env.BOUNCER_API_KEY)
}

// test();
