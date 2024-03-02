const client = require('prom-client');
const responseTime = require('response-time');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
    name: 'http_express_req_res_time',
    help: 'Indicates the time taken for each req and res',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [1, 20, 30, 40, 50, 100, 200, 300, 400, 500, 700, 900, 1000, 2000]
})

const totalRequestCounter = new client.Counter({
    name: 'total_req',
    help: 'Tells total number of requests',
    labelNames: ['route']
})


const monitorMetrics = responseTime((req, res, time) => {
    totalRequestCounter.inc({ route: req.url });
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status_code: req.statusCode
    }).observe(time)
})

const getMetrics = async (req, res) => {
    res.setHeader('Contecnt-Type', client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
}

module.exports = {
    monitorMetrics,
    getMetrics
}