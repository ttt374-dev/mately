import type { AnswerResult } from "./AnswerResult";
import type { EaseFactor } from "./EaseFactor";
import type { IntervalDays } from "./InternalDays";
import type { ReviewedAt } from "./ReviewedAt";

export type LearningEntry = {
    problemId: string;
    solvedCount: number;
    failedCount: number;


    intervalDays: IntervalDays
    easeFactor: EaseFactor
    nextReviewedAt?: ReviewedAt
//    intervalDays: number        // 次回までの日数
//    nextReviewedAt: number        // 次に解くべき時刻（ms）
    //easeFactor: number          // 習熟度（Anki系）
//    easeFactor: EaseFactor

    lastAnsweredAt?: number;
    lastResult?: AnswerResult,
}

export type LearningRecord = Record<string, LearningEntry | undefined>
