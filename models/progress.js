const client = require('./config');
require('dotenv').config();

const getAll = async () => {
    const results = await client.get('*');
    console.log(results);
}

const get = async (key) => {
    const result = await client.get(key);
    return result;
}

const set = async (key, value) => {
    await client.set(key, value);
}

module.exports = {
    getAll,
    get,
    set,
};
