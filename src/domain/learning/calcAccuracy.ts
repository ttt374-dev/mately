import type { LearningEntry } from "./types"

export const calcAccuracy = (learningEntry: LearningEntry | undefined): number => {
  if (learningEntry === undefined) return 0
  
  return learningEntry.solvedCount / (learningEntry.solvedCount + learningEntry.failedCount)
}