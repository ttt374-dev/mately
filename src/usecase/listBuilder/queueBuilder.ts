import type { QueueItem } from "@/domain/fsm/types"
import type { SortState } from "@/domain/problemCatalog/types/Sort"
import type { Filter } from "@/domain/problemCatalog/types/Filter"
import { sortProblems } from "@/domain/problemCatalog/sortProblems"
import { filterProblems } from "@/domain/problemCatalog/filterProblems"
import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from '@/domain/problem/types/Problem'

export const buildQueue = (problems: Problem[],
    sort: SortState, filter: Filter,
    learningRecords: LearningRecord
): QueueItem[] => {   
    
    const processed = sortProblems(filterProblems(problems, filter, learningRecords, ), sort)
    return processed.map((p) => ({problemId: p.id}))
    //return Object.values(processed).map((p) => ({problemId: p.id}))
}