import { NextWeekRounded } from "@mui/icons-material";
import type { AnswerResult } from "./AnswerResult";
import { EaseFactor } from "./EaseFactor";
import { IntervalDays } from "./InternalDays";
import { ReviewedAt } from "./ReviewedAt";
import type { AnswerQuality } from "./AnswerQuality";

export type LearningEntryInit = {
  solvedCount?: number
  failedCount?: number
  intervalDays?: IntervalDays
  easeFactor?: EaseFactor
  nextReviewedAt?: ReviewedAt
  lastAnsweredAt?: number
  lastResult?: AnswerResult
}


export class LearningEntry {
    constructor(
        readonly problemId: string,
        readonly solvedCount: number,
        readonly failedCount: number,

        readonly intervalDays: IntervalDays,
        readonly easeFactor: EaseFactor,
        readonly nextReviewedAt: ReviewedAt,

        readonly lastAnsweredAt?: number,
        readonly lastResult?: AnswerResult,
    ) { }
    // --- 初期生成 ---
    static create(problemId: string, partial?: LearningEntryInit): LearningEntry {
        const now = Date.now()
        return new LearningEntry(
            problemId,
            partial?.solvedCount ?? 0,
            partial?.failedCount ?? 0,
            partial?.intervalDays ?? IntervalDays.initial(),
            partial?.easeFactor ?? EaseFactor.initial(),
            partial?.nextReviewedAt ?? ReviewedAt.at(now),
            partial?.lastAnsweredAt ?? now,
            partial?.lastResult,
        )
    }
    // getter
    get totalCount(): number { return this.solvedCount + this.failedCount}
    get accuracy(): number { return this.totalCount === 0 ? 0 : this.solvedCount / this.totalCount }
    get isDue(): boolean { return this.nextReviewedAt.isDue }   

    answer(
        result: AnswerResult,
        quality: AnswerQuality,
        now: number = Date.now(),
    ): LearningEntry {
        const { intervalDays, easeFactor, nextReviewedAt } =
            this.calculateNext(quality, now)

        return new LearningEntry(
            this.problemId,
            result === "solved" ? this.solvedCount + 1 : this.solvedCount,
            result === "failed" ? this.failedCount + 1 : this.failedCount,
            intervalDays,
            easeFactor,
            nextReviewedAt,
            now,
            result,
        )
    }

    private calculateNext(quality: number, now: number) {
        let interval = this.intervalDays.value
        let ef = this.easeFactor.value

        if (quality < 2) {
            interval = 1
        } else {
            if (interval === 0) interval = 1
            else if (interval === 1) interval = 3
            else interval = Math.round(interval * ef)
        }

        ef = Math.max(
            1.3,
            ef + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
        )

        const nextInterval = IntervalDays.of(interval)

        return {
            intervalDays: nextInterval,
            easeFactor: EaseFactor.of(ef),
            nextReviewedAt: ReviewedAt.fromNow(now, nextInterval),
        }
    }

/*
    toDto(): LearningEntryDto {
        return {
            intervalDays: this.intervalDays.value(),
            easeFactor: this.easeFactor.value(),
            nextReviewedAt: this.nextReviewedAt.value(),
        };
    }
        */
}

/*
type LearningEntryDto = {
    //problemId: string
    //solvedCount: number
    //failedCount: number
    intervalDays: number
    easeFactor: number
    nextReviewedAt?: number
    //lastAnsweredAt?: number
    //lastResult?: AnswerResult
}
    */
export type LearningRecord = Record<string, LearningEntry | undefined>

/*


/////////////////////////////////////
export type LearningEntryOld = {
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



*/

    /*
    // --- 再構築（DTO / 永続化から）---
    static restore(props: {
        problemId: string
        solvedCount: number
        failedCount: number
        intervalDays: IntervalDays
        easeFactor: EaseFactor
        nextReviewedAt: ReviewedAt
        lastAnsweredAt?: number
        lastResult?: AnswerResult
    }): LearningEntry {
        return new LearningEntry(
            props.problemId,
            props.solvedCount,
            props.failedCount,
            props.intervalDays,
            props.easeFactor,
            props.nextReviewedAt,
            props.lastAnsweredAt,
            props.lastResult,
        )
    }
*/