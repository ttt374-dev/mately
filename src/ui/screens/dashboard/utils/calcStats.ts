import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from "@/domain/problem/types/Problem"

export function calcStats(problems: Problem[], learningRecords: LearningRecord){    
    let solvedCount = 0
    let failedCount = 0
    let unansweredProblemCount = 0
    
    problems.map((problem: Problem) => {
        const learningEntity = learningRecords[problem.id]
        if (learningEntity) {
            solvedCount += learningEntity.solvedCount
            failedCount += learningEntity.failedCount
        } else {
            unansweredProblemCount++
        }
    })
    const totalCount = solvedCount + failedCount

    return {
        totalCount, solvedCount, failedCount,
        accuracy: solvedCount / totalCount,
        unansweredProblemCount,
    }    
}
