import * as redis from 'redis';
import config from '../config/config';

const client = redis.createClient({
    socket: config.redis
});
client.on('error', (err) => console.log('Redis Client Error', err));
(async () => { await client.connect() })();

export default client;
