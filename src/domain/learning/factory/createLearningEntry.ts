import { v4 } from "uuid";
import type { LearningEntry } from "../types";

export function createLearningEntry(problemId: string, partial?: Partial<LearningEntry>): LearningEntry {
  return {
    problemId: problemId,
    solvedCount: 0,
    failedCount: 0,
    lastAnsweredAt: Date.now(),

    intervalDays: 0,
    nextReviewedAt: Date.now(),
    easeFactor: 2.5,
    ...partial,
  };
}
