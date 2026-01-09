import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from "@/domain/problem/types/Problem"

function calcStats(problems: Problem[], learningRecords: LearningRecord){    
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

export function useDeckStats(queriedPoblems: Problem[], allProblems: Problem[],
    learningRecords: LearningRecord
 ){    
    //const problemMap = new Map(stores.problem.problems.map(p => [p.id, p]));

    // queue を map して problem を取得
    //const queuedProblems = queue.map(q => problemMap.get(q.problemId))
    //    .filter((p): p is Problem => !!p); // null / undefined を除外
    const sessionResult = calcStats(queriedPoblems, learningRecords)
    const sessionStats = [
        { label: "問題数", value: sessionResult.totalCount },
        { label: "未回答問題数", value: sessionResult.unansweredProblemCount},
        { label: "回答数", value: sessionResult.totalCount},
        { label: "正答数", value: sessionResult.solvedCount},
        { label: "正答率", value: (sessionResult.accuracy * 100).toFixed(1) + "%"},
    ];
    const totalResult = calcStats(allProblems, learningRecords)
    const totalStats = [
        { label: "問題数", value: totalResult.totalCount },
        { label: "未回答問題数", value: totalResult.unansweredProblemCount},
        { label: "回答数", value: totalResult.totalCount},
        { label: "正答数", value: totalResult.solvedCount},
        { label: "正答率", value: (totalResult.accuracy * 100).toFixed(1) + "%" },
    ];
    

    const dummyStats = [
        { label: "問題数", value: 0},
        { label: "未回答問題数", value: 0},
    ];

    console.log("stats", sessionResult, totalStats)
    return {
        //sessionStats: dummyStats, totalStats: dummyStats
        sessionStats: sessionStats, totalStats: totalStats
    }
}