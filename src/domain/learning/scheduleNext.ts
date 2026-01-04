import { formatDate } from "@/shared/utils"
import type { AnswerResult, LearningEntry } from "./types"

export type AnswerQuality = 0 | 1 | 2 | 3

export function judgeAnswerQuality(answer: AnswerResult, sec: number): number {
  if (answer === "failed") return 0
  if (sec < 10) return 3
  return 0
}
export function scheduleNext( 
  record: LearningEntry,
  quality: number,
  now: number
): LearningEntry {
  let { intervalDays, easeFactor } = record

  if (!intervalDays) intervalDays = 0
  if (!easeFactor) easeFactor = 2.5
  if (quality < 2) {
    // 不正解
    intervalDays = 1
  } else {
    if (intervalDays === 0) intervalDays = 1
    else if (intervalDays === 1) intervalDays = 3
    else intervalDays = Math.round(intervalDays * easeFactor)
  }

  // easeFactor 更新
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
  )

  const nextReviewedAt =
    now + intervalDays * 24 * 60 * 60 * 1000

  console.log("scheule next", quality, intervalDays, formatDate(nextReviewedAt), easeFactor)
  return {
    ...record,
    intervalDays,
    easeFactor,
    lastAnsweredAt: now,
    nextReviewedAt,
  }
}
