import type { IntervalDays } from "./InternalDays"

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

