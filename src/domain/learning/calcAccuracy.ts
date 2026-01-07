import type { LearningEntry } from "./types"

export const calcAccuracy = (learningEntry: LearningEntry): number => {
  return learningEntry.solvedCount / (learningEntry.solvedCount + learningEntry.failedCount)
}