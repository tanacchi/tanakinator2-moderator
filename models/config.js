const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
(async () => { await redisClient.connect() })();

module.exports = redisClient;
