import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import type { QueueItem } from "@/domain/fsm/types"
import type { SortState } from "@/domain/problemCatalog/types/Sort"
import type { Filter } from "@/domain/problemCatalog/types/Filter"
import { sortProblems } from "@/domain/problemCatalog/sortProblems"
import { filterProblems } from "@/domain/problemCatalog/filterProblems"
import type { LearningRecord } from "@/domain/learning/types"

export const buildQueue = (records: ProblemRecord,
    sort: SortState, filter: Filter,
    learningRecords: LearningRecord
): QueueItem[] => {
    const problems = Object.values(records)
    
    const processed = sortProblems(filterProblems(problems, filter, learningRecords, ), sort)
    return Object.values(processed).map((p) => ({problemId: p.id}))
}