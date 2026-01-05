import type { AnswerResult } from "@/domain/learning/types"
import type { QueueItem } from "./QueueItem"
import type { AnswerEntry } from "./AnswerEntry"

//export type AnswerResult = "correct" | "wrong" | "skipped";
export type PlaySession = {
    //deckId: string
    sessionId: string
    queue: QueueItem[]
    currentIndex: number
    results: AnswerEntry[]
        //results: Record<string, AnswerResult>
    //startedAt: number
}


