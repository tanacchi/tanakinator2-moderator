const redisClient = require('./config');
require('dotenv').config();

const getAll = async () => {
    const results = await redisClient.get('ahi');
    console.log(results);
}

const get = async (key) => {
    const result = await redisClient.get(key);
    return result;
}

const set = async (key, value) => {
    await redisClient.set(key, value);
}

module.exports = {
    getAll,
    get,
    set,
};
