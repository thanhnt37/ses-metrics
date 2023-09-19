import AWS from '../configs/aws';

let CloudWatch = new AWS.CloudWatch();

export async function listMetrics(): Promise<any> {
    let params = {
        Namespace: "AWS/SES"
    };
    return new Promise((resolve, reject) => {
        CloudWatch.listMetrics(params, function(err, data) {
            if(err) {
                console.log("------------ Error: listMetrics() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: listMetrics(): parameters ------------");
                console.log(params);
                return reject(err);
            } else {
                return resolve(data);
            }
        })
    });
}

export async function getMetricData(): Promise<any> {
    let params = {
        StartTime: new Date(Date.now() - 604800000),
        EndTime: new Date(),
        MetricDataQueries: [
            {
                Id: 'adabeat_ses_bounce_rate_' + Date.now().toString(), /* required */
                // AccountId: 'STRING_VALUE',
                // Expression: 'STRING_VALUE',
                // Label: 'STRING_VALUE',
                MetricStat: {
                    Metric: { /* required */
                        // Dimensions: [
                        //     {
                        //         Name: 'STRING_VALUE', /* required */
                        //         Value: 'STRING_VALUE' /* required */
                        //     },
                        //     /* more items */
                        // ],
                        MetricName: 'Reputation.BounceRate',
                        Namespace: 'AWS/SES'
                    },
                    Period: 300, /* required */
                    Stat: 'Average', /* required */
                    // Unit: 'Count'
                },
                // Period: 3600,
                // ReturnData: true
            },
            {
                Id: 'adabeat_ses_bounce_' + Date.now().toString(), /* required */
                MetricStat: {
                    Metric: {
                        MetricName: 'Bounce',
                        Namespace: 'AWS/SES'
                    },
                    Period: 604800,
                    Stat: 'Sum',
                },
            },
            {
                Id: 'adabeat_ses_delivery_' + Date.now().toString(), /* required */
                MetricStat: {
                    Metric: {
                        MetricName: 'Delivery',
                        Namespace: 'AWS/SES'
                    },
                    Period: 604800,
                    Stat: 'Sum',
                },
            },
        ]
    };
    console.log("... getMetricData.params: ", params);

    return new Promise((resolve, reject) => {
        CloudWatch.getMetricData(params, function(err, data) {
            if(err) {
                console.log("------------ Error: getMetricData() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: getMetricData(): parameters ------------");
                console.log(params);
                return reject(err);
            } else {
                return resolve(data);
            }
        })
    });
}

export async function getMetricStatistics(): Promise<any> {
    let params = {
        Namespace: "AWS/SES",
        MetricName: 'Bounce',
        StartTime: new Date(Date.now() - 604800000),
        EndTime: new Date(),
        Period: 3600,
        Statistics: ['Sum'],
        Unit: "Seconds"
    };
    console.log("params: ", params);

    return new Promise((resolve, reject) => {
        CloudWatch.getMetricStatistics(params, function(err, data) {
            if(err) {
                console.log("------------ Error: getMetricStatistics() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: getMetricStatistics(): parameters ------------");
                console.log(params);
                return reject(err);
            } else {
                return resolve(data);
            }
        })
    });
}
