

import type { QueueItem } from "./QUeueItem"

//export type AnswerResult = "correct" | "wrong" | "skipped";
export type PlaySession = {
    //deckId: string
    sessionId: string
    queue: QueueItem[]
    currentIndex: number
    //results: Record<string, AnswerResult>
    //startedAt: number
}


