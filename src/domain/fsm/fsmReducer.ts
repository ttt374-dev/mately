import type { FSMAction, FSMState } from "./types"

export const initialState: FSMState = {
  queue: [],
  currentIndex: 0,
  phase: "problem",
  plyIndex: 0,
  isFinished: false,
  results: [],
}

export function fsmReducer(state: FSMState, action: FSMAction): FSMState {
  switch (action.type) {
    case "START":
      return {
        ...initialState,
        queue: action.payload.queue,
        currentIndex: action.payload.startIndex ?? 0,
      }

    case "SOLVE":
    case "FAIL": {
      const current = state.queue[state.currentIndex]
      if (!current) return state
      return {
        ...state,
        results: [
          ...state.results,
          { problemId: current.problemId, answerResult: action.type === "SOLVE" ? "solved" : "failed" },
        ],
      }
    }

    case "NEXT":
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, state.queue.length),
        phase: "problem", // 次の問題に移ると phase はリセット
        plyIndex: 0,
        isFinished: state.currentIndex === state.queue.length - 1
      }

    case "PREV":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
        phase: "problem",
        plyIndex: 0,
      }

    case "ADVANCE_PHASE":
      return {
        ...state,
        phase: state.phase === "problem" ? "solution" : state.phase,
      }

    case "RETREAT_PHASE":
      return {
        ...state,
        phase: state.phase === "solution" ? "problem" : state.phase,
      }

    case "ADVANCE_PLY":
      return {
        ...state,
        plyIndex: state.plyIndex + 1 // TODO
      }

    case "RETREAT_PLY":
      return {
        ...state,
        plyIndex: state.plyIndex - 1  // TODO
      }  
    case "RESET":
      return initialState

    default:
      return state
  }
}