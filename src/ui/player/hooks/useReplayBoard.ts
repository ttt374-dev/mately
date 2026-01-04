import { useState, useMemo } from "react";
import { createDefaultBoard, createEmptyHand, createEmptyHands } from "@/domain/kif/factory";
import type { Board, Hands, Move } from "@/domain/kif/types";
import { buildBoardUntil } from "@/domain/kif/builder/buildBoardUntil";


export function useReplayBoard(initialBoard: Board, initialHands: Hands, moves: Move[]){
    const [currentPlyIndex, setCurrentPlyIndex] = useState(0)
    const { board, hands } = useMemo(() => {
        return buildBoardUntil(initialBoard, initialHands, moves, currentPlyIndex)
    }, [initialBoard, initialHands, moves, currentPlyIndex])

    return {
        board, hands,
        currentPlyIndex,
        setCurrentPlyIndex,

        advancePly: () => {
            currentPlyIndex < moves.length && setCurrentPlyIndex(prev => prev + 1)
        },
        retreatPly: () => {
            currentPlyIndex > 0 && setCurrentPlyIndex(prev => prev - 1)
            
        },
    }
}