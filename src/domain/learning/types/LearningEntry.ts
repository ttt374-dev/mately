import { ValueSetter } from "node_modules/date-fns/parse/_lib/Setter";
import type { AnswerResult } from "./AnswerResult";

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
///////////////////////////
export class IntervalDays {
  private constructor(readonly value: number) {}

  static initial(){ return this.zero() }
  static zero() {
    return new IntervalDays(0)
  }

  static of(days: number) {
    if (days < 0) throw new Error("interval must be >= 0")
    return new IntervalDays(days)
  }

  isZero() {
    return this.value === 0
  }

  isOne() {
    return this.value === 1
  }

  nextWithEase(ease: EaseFactor): IntervalDays {
    return IntervalDays.of(Math.round(this.value * ease.easeValue))
  }
}

export class ReviewedAt {
  private constructor(readonly epochMs: number) {}  

  static now(){
    return new ReviewedAt(Date.now())
  }
  static from(date: number, interval: IntervalDays){
    return new ReviewedAt(
      date + interval.value * 24 * 60 * 60 * 1000
    )
  }
  static fromNow(interval: IntervalDays) {
    return ReviewedAt.from(Date.now(), interval)
  }
  isDue(): boolean{
    return this.epochMs <= Date.now()
  }
  value(): number { 
    return this.epochMs
  }
}

export class EaseFactor {
  private constructor(readonly easeValue: number) {}
  
  static initial() {
    return new EaseFactor(2.5)
  }

  static of(value: number) {
    return new EaseFactor(Math.max(1.3, value))
  }

  update(quality: number): EaseFactor {
    const delta =
      0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02)
    return EaseFactor.of(this.easeValue + delta)
  }
  value() {
    return this.easeValue
  } 
}

