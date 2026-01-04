import type { AnswerResult } from "@/domain/learning/types"
import type { QueueItem } from "./QueueItem"

//export type AnswerResult = "correct" | "wrong" | "skipped";
export type PlaySession = {
    //deckId: string
    sessionId: string
    queue: QueueItem[]
    currentIndex: number
    results: Record<string, AnswerResult>
    //startedAt: number
}


