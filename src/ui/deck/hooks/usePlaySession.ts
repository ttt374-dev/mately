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
            results: []
        })
        console.log("start session", queue, startIndex)
    }
    const answerCurrent = (result: AnswerResult) => {
        setSession(prev => {
            if (!prev) return prev;
            const current = prev.queue[prev.currentIndex];
            if (!current) return prev;
            return {
                ...prev,
                currentIndex: prev.currentIndex + 1,
                results: [
                    ...prev.results,
                    { problemId: current.problemId,
                        answerResult: result,
                    }
                ]
            }
            /*
            const problemId = current.problemId;
            
            return {
                ...prev,
                results: {
                    ...prev.results,
                    [problemId]: result,
                },
            };
            */
        });
        //console.log("answer current:", result, session?.results)
    }
    const advance = useCallback(() => {
        setSession(prev => {
            if (!prev) return prev
            if (prev.currentIndex >= prev.queue.length) return prev

            return {
                ...prev,
                currentIndex: prev.currentIndex + 1,
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
    //const isLastIndex = session && session.currentIndex === session.queue.length - 1
    
    return {
        session, setSession, startSession, 
        advance, retreat,
        answerCurrent,
        currentProblemId, isFinished, 
    }
}