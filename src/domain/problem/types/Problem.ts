// domain/problem.ts
export type Problem = {
  id: string;
  title: string;
};

export type ProblemEntry = Problem

export type ProblemRecord = Record<string, Problem>;
