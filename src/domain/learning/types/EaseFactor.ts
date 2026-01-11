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
  get value() {
    return this.easeValue
  } 
}

