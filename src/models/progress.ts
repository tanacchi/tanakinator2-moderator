'use strict'

import client from './config';
require('dotenv').config();

class ProgressStore {
    public async getAll() {
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

    public async get(key) {
        const result = await client.get(key);
        return result;
    }

    public async set(key, value) {
        await client.set(key, value);
    }
}

export const progressStore = new ProgressStore();
