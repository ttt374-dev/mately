import type { IntervalDays } from "./InternalDays"

export class ReviewedAt {
  private constructor(readonly epochMs: number) {}  

  static at(epochMs: number){
    return new ReviewedAt(epochMs)
  }
  static from(date: number, interval: IntervalDays){
    return new ReviewedAt(
      date + interval.daysValue * 24 * 60 * 60 * 1000
    )
  }
  static fromNow(now: number, interval: IntervalDays) {
    return ReviewedAt.from(now, interval)
  }
  isDue(): boolean{
    return this.epochMs <= Date.now()
  }
  value(): number { 
    return this.epochMs
  }
}

