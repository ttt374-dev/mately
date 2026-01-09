import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from "@/domain/problem/types/Problem"

export interface DeckStats {
  problemCount: number
  unansweredCount: number

  solvedCount: number
  failedCount: number
  answeredCount: number

  accuracy: number // 0.0 ~ 1.0
}

export function calcDeckStats(
  problems: Problem[],
  learningRecords: LearningRecord
): DeckStats {
  let solvedCount = 0
  let failedCount = 0
  let unansweredCount = 0

  for (const problem of problems) {
    const record = learningRecords[problem.id]

    if (record) {
      solvedCount += record.solvedCount
      failedCount += record.failedCount
    } else {
      unansweredCount++
    }
  }

  const answeredCount = solvedCount + failedCount

  return {
    problemCount: problems.length,
    unansweredCount,
    solvedCount,
    failedCount,
    answeredCount,
    accuracy: answeredCount === 0 ? 0 : solvedCount / answeredCount,
  }
}
