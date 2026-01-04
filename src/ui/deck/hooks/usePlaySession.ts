import { useState, useCallback } from "react"
import { v4 } from "uuid"

import type { PlaySession, QueueItem } from "@/domain/session/types/"
import type { AnswerResult } from "@/domain/learning/types"
// types/player.ts

export function usePlaySession() {
    const [session, setSession] = useState<PlaySession | null>(null)

    const startSession = (queue: QueueItem[], startIndex: number = 0) => {
        setSession({
            //deckId: deckId,
            sessionId: v4(),
            queue: queue,
            currentIndex: startIndex,
            //startedAt: Date.now(),,
            results: {}
        })
        console.log("start session", queue, startIndex)
    }
    const answerCurrent = (result: AnswerResult) => {
        setSession(prev => {
            if (!prev) return prev;

            const current = prev.queue[prev.currentIndex];
            if (!current) return prev;

            const problemId = current.problemId;
            
            return {
                ...prev,
                results: {
                    ...prev.results,
                    [problemId]: result,
                },
            };
        });
        console.log("answer current:", result, session?.results)
    }
    const advance = useCallback(() => {
        setSession(prev => {
            if (!prev) return prev

            const nextIndex = prev.currentIndex + 1
            /*
            if (nextIndex >= prev.queue.length) {
                return {
                    ...prev,
                    currentIndex: prev.queue.length-1, // finished 状態
                }
            }
                */
            return {
                ...prev,
                currentIndex: nextIndex,
            }
        })
        
    }, [])
    const retreat = useCallback(() => {
        setSession(prev => {
            if (!prev) return prev

            if (prev.currentIndex <= 0) {
                return prev
            }

            return {
                ...prev,
                currentIndex: prev.currentIndex - 1,
            }
        })
    }, [])    

    const currentProblemId =
        session && session.currentIndex < session.queue.length
            ? session.queue[session.currentIndex]
            : null

    const isFinished =
        !!session && session.currentIndex >= session.queue.length
    
    return {
        session, setSession, startSession, advance, retreat,
        answerCurrent,
        currentProblemId, isFinished, 
    }
}