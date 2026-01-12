import type { Exercise } from "@/domain/Exercise/Exercise"
import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from "@/domain/problem/Problem"

export interface DeckStats {
  problemCount: number
  unansweredCount: number

  solvedCount: number
  failedCount: number
  answeredCount: number

  accuracy: number // 0.0 ~ 1.0
}

export function calcDeckStats(exercises: Exercise[]): DeckStats {
  let solvedCount = 0
  let failedCount = 0
  let unansweredCount = 0

  for (const exercise of exercises) {
    const record = exercise.learning

    if (record) {
      solvedCount += record.solvedCount
      failedCount += record.failedCount
    } else {
      unansweredCount++
    }
  }

  const answeredCount = solvedCount + failedCount

  return {
    problemCount: exercises.length,
    unansweredCount,
    solvedCount,
    failedCount,
    answeredCount,
    accuracy: answeredCount === 0 ? 0 : solvedCount / answeredCount,
  }
}
