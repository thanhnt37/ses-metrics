import * as CloudWatchService from './services/CloudWatch';

export async function handler(event, context, callback) {
    let data = await CloudWatchService.getMetricData();

    return callback(
        null,
        {
            statusCode: 200,
            body: data
        }
    );
}
