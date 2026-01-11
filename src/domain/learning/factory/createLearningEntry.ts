import { EaseFactor, IntervalDays, ReviewedAt, type LearningEntry } from "../types";

export function createLearningEntry(problemId: string, partial?: Partial<LearningEntry>): LearningEntry {
  return {
    problemId: problemId,
    solvedCount: 0,
    failedCount: 0,
    lastAnsweredAt: Date.now(),

    intervalDays: IntervalDays.initial(),
    nextReviewedAt: ReviewedAt.now(),
    easeFactor: EaseFactor.initial(),
    ...partial,
  };
}
