import { LeakRemove } from "@mui/icons-material";
import type { LearningEntry, LearningRecord } from "../../learning/types";
import type { Problem } from "../Problem"
import type { FilterState } from "./types/Filter";
import { matchMateBuckets, matchMateLength } from "./mateFilter";

function matchesText(problem: Problem, text?: string): boolean {
    if (!text) return true;
    const t = text.toLowerCase();
    return (
        problem.title?.toLowerCase().includes(t)        
    );
}
//////////////////////////////////
export const applyFilter = (
    problems: Problem[],
    filter: FilterState,
    learningRecords?: LearningRecord,
): Problem[] => {
    const now = Date.now();
    //console.log("filter problems", filter, learningRecords)
    return problems.filter(problem => {
        const record = learningRecords?.[problem.id] 

        // 未回答のみ
        const flag = filter.unansweredOnly && record && (record.solvedCount + record.failedCount > 0)

        if (filter.unansweredOnly && record !== undefined && (record.solvedCount + record.failedCount > 0)){
                return false
        }
        
        // ミッション対象
        if (filter.isMissionTarget &&
            record?.nextReviewedAt !== undefined &&
            //record.nextReviewedAt > now
            record.nextReviewedAt.isDue
        ){
            return false
        }
        // スターつきのみ
        if (filter.starredOnly &&
            !problem.starred){
            return false
        }
        
        // テキストフィールド
        if (!matchesText(problem, filter.text)) {            
            return false;
        }
        // 手数
        if (filter.mateLength){
            return matchMateLength(problem.kifContent, filter.mateLength)
        }
        if (filter.mateBuckets){
            return matchMateBuckets(problem.kifContent, filter.mateBuckets)
        }
        return true;
    });
}