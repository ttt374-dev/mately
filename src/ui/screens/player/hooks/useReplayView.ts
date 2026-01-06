// useReplayView.ts
import { useReducer, useMemo } from "react";
import type { KifContent } from "@/domain/kif/types";
import { buildBoardUntil } from "@/domain/kif/builder/buildBoardUntil";
import {
  replayReducer,
  initialReplayState,
  type ReplayAction,
} from "@/domain/fsm/replayReducer";

export function useReplayView(kifContent: KifContent) {
  const { board: initialBoard, hands: initialHands, events } = kifContent;

  const moves = useMemo(
    () => events.filter(e => e.type === "move"),
    [events]
  );

  const [state, dispatch] = useReducer(
    (s: typeof initialReplayState, a: ReplayAction) =>
      replayReducer(s, a, moves.length),
    initialReplayState
  );

  const { board, hands } = useMemo(() => {
    return buildBoardUntil(
      initialBoard,
      initialHands,
      moves,
      state.currentPlyIndex
    );
  }, [initialBoard, initialHands, moves, state.currentPlyIndex]);

  return {
    // derived state
    board,
    hands,
    moves,

    // FSM state
    currentPlyIndex: state.currentPlyIndex,

    // raw dispatcher
    dispatch,

    // semantic helpers（UI向け）
    advancePly: () => dispatch({ type: "NEXT" }),
    retreatPly: () => dispatch({ type: "PREV" }),
    resetPly: () => dispatch({ type: "RESET" }),
    moveToPly: (index: number) =>
      dispatch({ type: "MOVE_TO", index }),
  };
}
