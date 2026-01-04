import { useState, useCallback } from "react"
import { v4 } from "uuid"

import type { PlaySession, QueueItem } from "@/domain/session/types/"
// types/player.ts

export function usePlaySession() {
    const [session, setSession] = useState<PlaySession | null>(null)


    const startSession = (queue: QueueItem[]) => {
        //console.log("start session", queue)

        //if (queue.length === 0) return
        
        setSession({
            //deckId: deckId,
            sessionId: v4(),
            queue: queue,
            currentIndex: 0,
            //startedAt: Date.now(),,
            //results: {}
        })
        console.log("start session", queue)
    }
    const advance = useCallback(() => {
        setSession(prev => {
            if (!prev) return prev

            const nextIndex = prev.currentIndex + 1
            if (nextIndex >= prev.queue.length) {
                return {
                    ...prev,
                    currentIndex: prev.queue.length-1, // finished 状態
                }
            }
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
    
    const isLastIndex = 
        !!session && session.currentIndex == session.queue.length - 1
    return {
        session, setSession, startSession, advance, retreat,
        currentProblemId, isFinished, isLastIndex,
    }
}