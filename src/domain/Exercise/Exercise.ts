import type { LearningEntry } from "../learning/types";
import type { Problem } from "../problem/Problem";

export type Exercise = {
  problem: Problem ;
  learning: LearningEntry;
}

// Problem と LearningEntry を紐づけた形
export type LearningProblem = {
  problem: Problem;
  learning: LearningEntry;
};


