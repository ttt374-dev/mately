// domain/problem.ts
export type Problem = {
  id: string;
  title: string;
};

export type Collection = Record<string, Problem>;
