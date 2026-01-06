import type { AnswerResult } from "@/domain/learning/types"
import type { QueueItem } from "@/domain/fsm/types/QueueItem"
import type { PlayerPhase } from "@/ui/app/player/types/PlayerPhase"

// FSM state
export type FsmState = {
  queue: QueueItem[]
  currentIndex: number
  phase: PlayerPhase
  plyIndex: number
  isFinished: boolean
  results: { problemId: string; answerResult: AnswerResult }[]
}

// FSM actions
export type FsmAction =
  | { type: "START"; payload: { queue: QueueItem[]; startIndex?: number } }
  | { type: "SOLVE" }
  | { type: "FAIL" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "ADVANCE_PHASE" }
  | { type: "RETREAT_PHASE" }
  //| { type: "ADVANCE_PLY"}
  //| { type: "RETREAT_PLY"}
  | { type: "RESET" }