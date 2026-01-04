import type { KifContent } from "@/domain/kif/types";

// domain/problem.ts
export type Problem = {
  id: string;
  title: string;
  createdAt: number;

  kifContent: KifContent,
};

export type ProblemEntry = Problem


