'use strict'

const { client } = require('./config');
require('dotenv').config();

const getAll = async () => {
    const iterator = client.scanIterator();
    let results = [];
    // TODO: Use iterator-helpers in the future
    for await (const key of iterator) {
        results.push({
            key,
            value: (await client.get(key))
        })
    }
    return results;
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
