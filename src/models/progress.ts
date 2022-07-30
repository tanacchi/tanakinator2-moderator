'use strict'

import client from './client';
import { ProgressSimple, ProgressDetail, ProgressPost } from "../types/progressType";
import { Status } from '../constants/status';

class ProgressStore {
    public async getAll(): Promise<Array<ProgressSimple>> {
        const iterator: AsyncIterable<string> = client.scanIterator();
        let results: Array<ProgressSimple> = [];
        // TODO: Use iterator-helpers in the future
        for await (const key of iterator) {
            results.push({
                key,
                value: (await client.get(key)),
                status: Status.WAITING,
            });
        }
        return results;
    }

    public async get(key: string): Promise<ProgressDetail>  {
        const result: ProgressDetail = await client.get(key);
        return result;
    }

    public async set(key: string, value: ProgressPost): Promise<void> {
        await client.set(key, value);
    }
}

export const progressStore = new ProgressStore();
