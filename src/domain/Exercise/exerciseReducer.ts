import type { AnswerResult } from "../learning/types";
import type { Problem, ProblemId } from "../problem/Problem";
import type { LearningProblem as Exercise } from "./Exercise";

type Action =
  | { type: 'SET_ALL'; payload: Exercise[] }
  | { type: "ADD"; payload: Exercise }
  | { type: 'REMOVE'; problemId: ProblemId }
  | { type: "REMOVE_MANY"; problemIds: ProblemId[] }
  | { type: 'CLEAR_ALL' }
  | { type: 'ANSWER'; problemId: ProblemId; answerResult: AnswerResult; secondsToAnswer?: number; now: number }
  | { type: 'TOGGLE_STAR'; problemId: ProblemId }

export function learningProblemReducer(
  state: Exercise[],
  action: Action
): Exercise[] {
  switch (action.type) {
    case 'SET_ALL': {
      // そのまま配列として返す
      return [...action.payload];
    }

    case 'ANSWER': {
      return state.map(ex => {
        if (ex.problem.id !== action.problemId) return ex;

        const updatedLearning = ex.learning?.answer(
          action.answerResult,
          action.secondsToAnswer ?? 20,
          action.now
        );

        return {
          ...ex,
          learning: updatedLearning,
        };
      });
    }

    case 'TOGGLE_STAR': {
      return state.map(ex => {
        if (ex.problem.id !== action.problemId) return ex;
        return {
          ...ex,
          problem: ex.problem.toggleStar(),
        };
      });
    }

    case 'REMOVE': {
      return state.filter(ex => ex.problem.id !== action.problemId);
    }

    case 'REMOVE_MANY': {
      const idsToRemove = new Set(action.problemIds);
      return state.filter(ex => !idsToRemove.has(ex.problem.id));
    }

    case 'CLEAR_ALL':
      return [];

    default:
      return state;
  }
}
