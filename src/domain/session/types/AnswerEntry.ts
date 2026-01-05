import type { AnswerResult } from "@/domain/learning/types"

type AnswerQuality = "easy" | "medium" | "hard"

export type AnswerEntry = {
    problemId: string
    answerResult: AnswerResult,
    //secTaken: number,
    //answerQuality: AnswerQuality,
}
