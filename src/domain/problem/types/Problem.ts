// domain/problem.ts
export type Problem = {
  id: string;
  title: string;
};

export type ProblemEntry = Problem

export type ProgramRecord = Record<string, Problem>;
