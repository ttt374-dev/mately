import type { EaseFactor } from "./EaseFactor"

export class IntervalDays {
  private constructor(readonly daysValue: number) {}

  static initial(){ return this.zero() }
  static zero() {
    return new IntervalDays(0)
  }

  static of(days: number) {
    if (days < 0) throw new Error("interval must be >= 0")
    return new IntervalDays(days)
  }

  isZero() {
    return this.daysValue === 0
  }

  isOne() {
    return this.daysValue === 1
  }

  nextWithEase(ease: EaseFactor): IntervalDays {
    return IntervalDays.of(Math.round(this.daysValue * ease.easeValue))
  }

  value() { return this.daysValue}
}