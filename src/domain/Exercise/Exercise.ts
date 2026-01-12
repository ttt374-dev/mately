import { LearningEntry } from "../learning/types";
import { Problem } from "../problem/Problem";

export class Exercise {
  constructor(
    readonly problem: Problem,
    readonly learning: LearningEntry
  ){}
  static create(p?: Problem, ){    
    const problem = p ?? Problem.create()
    return new Exercise(problem, LearningEntry.create(problem.id))
  }
}

// Problem と LearningEntry を紐づけた形
export type LearningProblem = {
  problem: Problem;
  learning: LearningEntry;
};


