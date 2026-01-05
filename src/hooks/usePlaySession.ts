import { useReducer } from "react"
import { v4 as uuidv4 } from "uuid"
import type { PlaySession, QueueItem } from "@/domain/session/types"
import type { AnswerResult } from "@/domain/learning/types"

type SessionPhase = "playing" | "finished"

type SessionState = {
  session: PlaySession | null
  phase: SessionPhase
}

type SessionAction =
  | { type: "START"; payload: { queue: QueueItem[]; startIndex?: number } }
  | { type: "SOLVE" }
  | { type: "FAIL" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESET" }

const initialState: SessionState = { session: null, phase: "playing" }

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "START": {
      const startIndex = action.payload.startIndex ?? 0
      return {
        session: {
          sessionId: uuidv4(),
          queue: action.payload.queue,
          currentIndex: startIndex,
          results: [],
        },
        phase: "playing",
      }
    }

    case "SOLVE":
    case "FAIL": {
      if (!state.session) return state
      const currentItem = state.session.queue[state.session.currentIndex]
      if (!currentItem) return state
      
      const isFinished = state.session.currentIndex >= state.session.queue.length

      return {
        session: {
          ...state.session,
          //currentIndex: nextIndex,
          results: [
            ...state.session.results,
            {
              problemId: currentItem.problemId,
              answerResult: action.type === "SOLVE" ? "solved" : "failed",
            },
          ],
        },
        phase: isFinished ? "finished" : "playing",
      }
    }

    case "NEXT": {
      if (!state.session) return state
      const nextIndex = state.session.currentIndex + 1
      const isFinished = nextIndex >= state.session.queue.length
      return {
        ...state,
        session: {
          ...state.session,
          currentIndex: Math.min(nextIndex, state.session.queue.length),
        },
        phase: isFinished ? "finished" : "playing",
      }
    }

    case "PREV": {
      if (!state.session) return state
      return {
        ...state,
        session: {
          ...state.session,
          currentIndex: Math.max(state.session.currentIndex - 1, 0),
        },
        phase: "playing",
      }
    }

    case "RESET":
      return initialState

    default:
      return state
  }
}
//////////////////////////////////////////////////////
export function usePlaySession() {
  const [state, dispatch] = useReducer(sessionReducer, initialState)

  const startSession = (queue: QueueItem[], startIndex?: number) => {
    dispatch({ type: "START", payload: { queue, startIndex } })
  }

  const markAnswer = (result: AnswerResult) => {
    if (result === "solved") dispatch({ type: "SOLVE" })
    else dispatch({ type: "FAIL" })
  }

  const currentProblem =
    state.session && state.session.currentIndex < state.session.queue.length
      ? state.session.queue[state.session.currentIndex]
      : null

  const isFinished = state.phase === "finished"

  return {
    session: state.session,
    phase: state.phase,
    currentProblem,
    isFinished,
    startSession,
    markAnswer,
    markSolved: () => markAnswer("solved"),
    markFailed: () => markAnswer("failed"),
    resetSession: () => dispatch({ type: "RESET"}),
    nextProblem: () => dispatch({ type: "NEXT" }),
    prevProblem: () => dispatch({ type: "PREV" }),

    dispatch,
  }
}
