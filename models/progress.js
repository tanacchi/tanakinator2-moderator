const redisClient = require('./config');
require('dotenv').config();

const getAll = async () => {
    const results = await redisClient.get('ahi');
    console.log(results);
}

module.exports = getAll;
