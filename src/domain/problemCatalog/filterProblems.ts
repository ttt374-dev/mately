import type { LearningRecord } from "../learning/types";
import type { Problem } from "../problem/types/Problem"
import type { Filter } from "./types/Filter";

function isUnansweredRecord(
    record: { solvedCount: number; failedCount: number } | null
): boolean {
    if (!record) return true;
    return record.solvedCount + record.failedCount === 0;
}
function matchesText(problem: Problem, text?: string): boolean {
    if (!text) return true;
    const t = text.toLowerCase();
    return (
        problem.title?.toLowerCase().includes(t)        
    );
}
export const filterProblems = (
    problems: Problem[],
    filter: Filter,
    learningRecords: LearningRecord,
): Problem[] => {
    const now = Date.now();
    console.log("filter problems", filter, learningRecords)
    return problems.filter(problem => {
        const record = learningRecords[problem.id]
        //console.log("learning record", learningRecords, record, learningRecords)

        // 未回答のみ
        if (filter.unansweredOnly && !isUnansweredRecord(record)) {
        //if (filter.unansweredOnly && record.solvedCount > 0) {
            return false;
        }

        // 次回レビュー対象のみ
        if (
            filter.dueOnly &&
            record?.nextReviewedAt !== undefined &&
            record.nextReviewedAt > now
        ) {
            return false;
        }
        // text
        if (!matchesText(problem, filter.text)) {
            return false;
        }
        return true;
    });
}