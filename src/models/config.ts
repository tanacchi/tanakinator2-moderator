'use strict'

import * as redis from 'redis';
require('dotenv').config();

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
client.on('error', (err) => console.log('Redis Client Error', err));
(async () => { await client.connect() })();

export default client;
