import type { QueueItem } from "@/domain/fsm/types"
import type { ProblemSort } from "@/domain/problem/query/types/Sort"
import type { ProblemFilter } from "@/domain/problem/query/types/Filter"
import { applySort } from "@/domain/problem/query/applySort"
import { applyFilter } from "@/domain/problem/query/applyFilter"
import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from '@/domain/problem/types/Problem'

export const buildQueue = (problems: Problem[],
    sort: ProblemSort, filter: ProblemFilter,
    learningRecords: LearningRecord
): QueueItem[] => {   
    
    const processed = applySort(applyFilter(problems, filter, learningRecords, ), sort)
    return processed.map((p) => ({problemId: p.id}))
    //return Object.values(processed).map((p) => ({problemId: p.id}))
}