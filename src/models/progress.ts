'use strict'

import client from './client';
import { ProgressSimple, ProgressDetail, ProgressPost, appendIfExists, initProgress } from "../types/progressType";

class ProgressStore {
    public async getAll(): Promise<Array<ProgressSimple>> {
        const iterator: AsyncIterable<string> = client.scanIterator();
        let results: Array<ProgressSimple> = [];
        // TODO: Use iterator-helpers in the future
        for await (const userId of iterator) {
            const progress: ProgressDetail = await this.get(userId);
            results.push({
                userId,
                device: progress.device,
                status: progress.status,
            });
        }
        return results;
    }

    public async get(userId: string): Promise<ProgressDetail>  {
        const found: string|null = await client.get(userId);
        return found ? JSON.parse(found) : initProgress();
    }

    public async set(userId: string, diff: ProgressPost): Promise<void> {
        let progress: ProgressDetail = await this.get(userId);
        progress.device = diff.device;
        progress.status = diff.status;
        progress.questions = appendIfExists(progress.questions, diff.newQuestion);
        progress.answers = appendIfExists(progress.answers, diff.newAnswer);
        progress.nextAnswerTo = diff.nextAnswerTo;
        progress.guessingThat = diff.guessingThat;
        await client.set(userId, JSON.stringify(progress));
    }
}

export const progressStore = new ProgressStore();
