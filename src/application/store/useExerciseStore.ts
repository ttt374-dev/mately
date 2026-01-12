import type { LearningRepository } from "@/domain/learning/LearningRepository";
import { LearningEntry, type AnswerResult, type LearningRecord } from "@/domain/learning/types";
import type { Problem } from "@/domain/problem/Problem";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import type { Exercise, LearningProblem } from "@/domain/Exercise/Exercise";
import { learningProblemReducer } from "@/domain/Exercise/exerciseReducer";
import { useEffect, useReducer, useRef } from "react";

export function useLearningProblemStore(
  problemRepo: ProblemRepository,
  learningRepo: LearningRepository
) {
  const [state, dispatch] = useReducer(learningProblemReducer, [] as Exercise[]);

  const isInitialized = useRef(false);

  // 初期ロード
  useEffect(() => {
    (async () => {
      try {
        const problems = await problemRepo.load();
        const learnings = await learningRepo.load();

        const combined: LearningProblem[] = problems.map(p => ({
          problem: p,
          learning: learnings[p.id] ?? LearningEntry.create(p.id),
        }));

        dispatch({ type: 'SET_ALL', payload: combined });
      } catch {
        dispatch({ type: 'CLEAR_ALL' });
      }
    })();
  }, []);

  // 永続化
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    const problems: Problem[] = Object.values(state).map(pwl => pwl.problem);
    const learnings: LearningRecord = Object.fromEntries(
      Object.values(state).map(pwl => [pwl.problem.id, pwl.learning])
    );

    problemRepo.save(problems);
    learningRepo.save(learnings);
  }, [state]);

  // Action helpers
  const markAnswer = (problemId: string, answerResult: AnswerResult, secondsToAnswer?: number) =>
    dispatch({ type: 'ANSWER', problemId, answerResult, secondsToAnswer, now: Date.now() });

  const toggleStar = (problemId: string) => dispatch({ type: 'TOGGLE_STAR', problemId });

  const remove = (problemId: string) => dispatch({ type: 'REMOVE', problemId });

  const clearAll = () => dispatch({ type: 'CLEAR_ALL' });

  return {
    state,
    markAnswer,
    toggleStar,
    remove,
    clearAll,
  };
}
