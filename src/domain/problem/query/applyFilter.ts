import { LeakRemove } from "@mui/icons-material";
import type { LearningEntry, LearningRecord } from "../../learning/types";
import type { Problem } from "../types/Problem"
import type { FilterState } from "./types/Filter";

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
        //console.warn("filter: no learning record") /// TODO
        //if (!record) return true

        //console.log("learning record", learningRecords, record, learningRecords)

        // 未回答のみ
        ////if (filter.unansweredOnly && record && totalCount(record) > 0) {
        const flag = filter.unansweredOnly && record && (record.solvedCount + record.failedCount > 0)
        //console.log("*** FILTER", problem, record, flag)
        

        if (filter.unansweredOnly && record !== undefined && (record.solvedCount + record.failedCount > 0)){
            
            //const flag = record && (record.solvedCount + record.failedCount > 0)
            //console.log("ansered flag", problem.id, flag)
            //if (record && (record.solvedCount + record.failedCount > 0)) {
                //console.log("=== returning FALSE", problem.id)
                return false
            
            
        }
        
        // ミッション対象
        //console.log("=== isMissionTarget", record)
        if (filter.isMissionTarget &&
            record?.nextReviewedAt !== undefined &&
            record.nextReviewedAt > now
        ){
            //console.log("returning false")
            return false
        }

                /*
        // 次回レビュー対象のみならず
        if (!filter.includeNotDue &&
            record?.nextReviewedAt !== undefined &&
            record.nextReviewedAt > now
        ) {
            console.log("-- filter: review")
            return false;
        }
            */
        // スターつきのみ
        if (filter.starredOnly &&
            !problem.starred){
            return false
        }
        
        // text
        if (!matchesText(problem, filter.text)) {
            //console.log("-- filter: text")
            return false;
        }
        //console.log("=== returning TRUE", problem.id)
        return true;
    });
}