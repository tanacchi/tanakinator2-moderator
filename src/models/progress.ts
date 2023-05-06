import client from "./client";
import {
  ProgressSimple,
  ProgressDetail,
  ProgressPost,
  appendIfExists,
  initProgress,
} from "../types/progressType";

class ProgressStore {
  public async getAll(): Promise<Array<ProgressSimple>> {
    const iterator: AsyncIterable<string> = client.scanIterator();
    const results: Array<ProgressSimple> = [];
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

  public async get(userId: string): Promise<ProgressDetail> {
    const found: string | null = await client.get(userId);
    return found ? JSON.parse(found) : initProgress();
  }

  public async set(userId: string, diff: ProgressPost): Promise<void> {
    let progress: ProgressDetail = await this.get(userId);
    progress = {
      ...progress,
      device: diff.device,
      status: diff.status,
      questions: appendIfExists(progress.questions, diff.new_question),
      answers: appendIfExists(progress.answers, diff.new_answer),
      next_answer_to: diff.next_answer_to,
      guessing_that: diff.guessing_that,
    };
    console.log("new progress:");
    console.log(progress);
    await client.set(userId, JSON.stringify(progress));
  }
}

export const progressStore = new ProgressStore();
