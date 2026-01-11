import { EaseFactor, IntervalDays, LearningEntry, ReviewedAt, type LearningEntryInit } from "../types";

export function createLearningEntry(
  problemId: string,
  now: number,
  partial?: LearningEntryInit

): LearningEntry {
  return LearningEntry.restore({
    problemId,
    solvedCount: partial?.solvedCount ?? 0,
    failedCount: partial?.failedCount ?? 0,
    intervalDays: partial?.intervalDays ?? IntervalDays.initial(),
    easeFactor: partial?.easeFactor ?? EaseFactor.initial(),
    nextReviewedAt: partial?.nextReviewedAt ?? ReviewedAt.at(Date.now()),
    lastAnsweredAt: partial?.lastAnsweredAt ?? now,
    lastResult: partial?.lastResult,
  })
}


/*
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
*/