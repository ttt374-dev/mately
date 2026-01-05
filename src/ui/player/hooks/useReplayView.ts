import { useState, useMemo } from "react";
import type { KifContent } from "@/domain/kif/types";
import { buildBoardUntil } from "@/domain/kif/builder/buildBoardUntil";

type ReplayAction = "NEXT" | "PREV" | "RESET";

const initialIndex = 0

export function useReplayView(kifContent: KifContent){
//export function useReplayView(initialBoard: Board, initialHands: Hands, moves: Move[]){
    const { board: initialBoard, hands: initialHands, events }  = kifContent
    const moves = events.filter(event => event.type ==="move")

    const [currentPlyIndex, setCurrentPlyIndex] = useState(initialIndex)
    const { board, hands } = useMemo(() => {
        return buildBoardUntil(initialBoard, initialHands, moves, currentPlyIndex)
    }, [initialBoard, initialHands, moves, currentPlyIndex])

    const dispatch = (action: ReplayAction) => {
        switch (action) {
            case "NEXT":
                setCurrentPlyIndex(i => Math.min(i + 1, moves.length));
                break;
            case "PREV":
                setCurrentPlyIndex(i => Math.max(i - 1, 0));
                break;
            case "RESET":
                setCurrentPlyIndex(initialIndex);
                break;
        }
    }
    return {
        board, hands, moves,
        currentPlyIndex,
        moveToPly: setCurrentPlyIndex,
        dispatch,
        advancePly: () => dispatch("NEXT"),
        retreatPly: () => dispatch("PREV"),
        resetPly: () => dispatch("RESET"),

    }
}