import type { AnswerResult } from "../learning/types";
import type { Problem, ProblemId } from "../problem/Problem";
import type { LearningProblem } from "./LearningProblem";

type Action =
  | { type: 'SET_ALL'; payload: LearningProblem[] }
  | { type: "ADD"; payload: LearningProblem }
  | { type: 'REMOVE'; problemId: ProblemId }
  | { type: "REMOVE_MANY"; problemIds: ProblemId[] }
  | { type: 'CLEAR_ALL' }
  | { type: 'ANSWER'; problemId: ProblemId; answerResult: AnswerResult; secondsToAnswer?: number; now: number }
  | { type: 'TOGGLE_STAR'; problemId: ProblemId }


export function learningProblemReducer(
  state: Record<string, LearningProblem>,
  action: Action
): Record<string, LearningProblem> {
  switch (action.type) {
    case 'SET_ALL': {
      const next: Record<string, LearningProblem> = {};
      for (const pwl of action.payload) {
        next[pwl.problem.id] = pwl;
      }
      return next;
    }

    case 'ANSWER': {
      const pwl = state[action.problemId];
      if (!pwl) return state;

      const updatedLearning = pwl.learning.answer(
        action.answerResult,
        action.secondsToAnswer ?? 20,
        action.now
      );

      return {
        ...state,
        [action.problemId]: { ...pwl, learning: updatedLearning },
      };
    }

    case 'TOGGLE_STAR': {
      const pwl = state[action.problemId];
      if (!pwl) return state;
      return {
        ...state,
        [action.problemId]: {
          ...pwl,
          problem: pwl.problem.toggleStar(),
        },
      };
    }

    case 'REMOVE': {
      if (!(action.problemId in state)) return state;
      const next = { ...state };
      delete next[action.problemId];
      return next;
    }
    case 'REMOVE_MANY': {
      const next = { ...state };
      let changed = false;
      for (const id of action.problemIds) {
        if (id in next) {
          delete next[id];
          changed = true;
        }
      }
      return changed ? next : state;
    }

    case 'CLEAR_ALL':
      return {};

    default:
      return state;
  }
}
