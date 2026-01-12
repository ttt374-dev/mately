import { LearningEntry, type AnswerResult } from "../learning/types";
import { Problem } from "../problem/Problem";

export class Exercise {
  constructor(
    readonly problem: Problem,
    readonly learning: LearningEntry
  ){}
  static create(p: Problem, learning?: LearningEntry ){    
    const l = learning ?? LearningEntry.create(p.id)
    return new Exercise(p, l)
  }


  ////////////////
  answer(result: AnswerResult, seconds: number=20, now: number) {
  const updatedLearning = this.learning.answer(result, seconds, now);
    return new Exercise(this.problem, updatedLearning);
  }
}

