import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import type { SortState } from "@/domain/problemCatalog/types/Sort"
import { sortProblems } from "@/domain/problemCatalog/sortProblems"
import type { LearningRecord } from '@/domain/learning/types'


export const buildLibraryList = (
    records: ProblemRecord, 
    sort: SortState,
    learningRecords: LearningRecord,
) => {
    const problems = Object.values(records)
    //const filtered = sortProblems(filterProblems(problems, filter), sort)
    const sorted = sortProblems(problems, sort, learningRecords)

    return Object.values(sorted)
}