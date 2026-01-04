// domain/problem.ts
export type Problem = {
  id: string;
  title: string;
  createdAt: number;
};

export type ProblemEntry = Problem

export type ProblemRecord = Record<string, Problem>;
