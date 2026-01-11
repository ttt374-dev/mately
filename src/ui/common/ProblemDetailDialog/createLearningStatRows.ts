import type { LearningEntry } from "@/domain/learning/types";
import type { Problem } from "@/domain/problem/types/Problem";


export function createLearningStatRow(problem: Problem, learningEntry?: LearningEntry){

    const rows: { label: string, value: string | number}[] = [
        {
            label: "登録日",
            value: new Date(problem.createdAt).toLocaleString("ja-JP"),
        },
        {
            label: "詰め手数",
            value: `${problem.kifContent.mateLength}手`,
        },
        {
            label: "UUID",
            value: `${problem.id.slice(0, 8)}...`,
        },
        {
            label: "EaseFactor",
            value: learningEntry?.easeFactor.toFixed(2) ?? "-",
        },
        {
            label: "Next reviewed at",
            value: learningEntry?.nextReviewedAt
                ? new Date(learningEntry.nextReviewedAt).toLocaleString("ja-JP")
                : "-",
        },
        {
            label: "last answered at",
            value: learningEntry?.lastAnsweredAt
                ? new Date(learningEntry.lastAnsweredAt).toLocaleString("ja-JP")
                : "-",
        },
        {
            label: "last result",
            value: learningEntry?.lastResult ?? "-"               
        },
    ]
    return rows
}