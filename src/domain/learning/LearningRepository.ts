import type { LearningRecord } from "./types/LearningEntry";

export interface LearningRepository {
    load(): Promise<LearningRecord>
    save(learningrecord: LearningRecord): Promise<void>
    remove(problemId: string): Promise<void>
    removeMany(ids: string[]): Promise<void>
}
