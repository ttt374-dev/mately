import type { Exercise } from "@/domain/Exercise/Exercise";
import type { LearningEntry } from "@/domain/learning/types";
import type { Problem } from "@/domain/problem/Problem";


export function createLearningStatRow(exercise: Exercise){

    const rows: { label: string, value: string | number}[] = [
        {
            label: "登録日",
            value: new Date(exercise.problem.createdAt).toLocaleString("ja-JP"),
        },
        {
            label: "詰め手数",
            value: `${exercise.problem.kifContent.mateLength}手`,
        },
        {
            label: "UUID",
            value: `${exercise.problem.id.slice(0, 8)}...`,
        },
        {
            label: "EaseFactor",
            value: exercise.learning?.easeFactor.value.toFixed(2) ?? "-",
        },
        {
            label: "Next reviewed at",
            value: exercise.learning?.nextReviewedAt
                ? new Date(exercise.learning.nextReviewedAt.value).toLocaleString("ja-JP")
                : "-",
        },
        {
            label: "last answered at",
            value: exercise.learning?.lastAnsweredAt
                ? new Date(exercise.learning.lastAnsweredAt).toLocaleString("ja-JP")
                : "-",
        },
        {
            label: "last result",
            value: exercise.learning?.lastResult ?? "-"               
        },
    ]
    return rows
}