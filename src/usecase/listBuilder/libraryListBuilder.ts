import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import type { SortState } from "@/domain/problemCatalog/types/Sort"
import { sortProblems } from "@/domain/problemCatalog/sortProblems"
import type { LearningRecord } from '@/domain/learning/types'
import type { Problem } from '@/domain/problem/types/Problem'


export const buildLibraryList = (
    problems: Problem[], 
    sort: SortState,
    learningRecords: LearningRecord,
) => {
    return sortProblems(problems, sort, learningRecords)    
}