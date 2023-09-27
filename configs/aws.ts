import * as AWS from 'aws-sdk';

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    ses: {
        region: AWS_REGION,
        apiVersion: '2019-09-27',
        endpoint: `https://email.${AWS_REGION}.amazonaws.com`
    },
});

export default AWS;
