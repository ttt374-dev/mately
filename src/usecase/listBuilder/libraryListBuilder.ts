import type { ProblemSort } from "@/domain/problem/query/types/Sort"
import { applySort } from "@/domain/problem/query/applySort"
import type { LearningRecord } from '@/domain/learning/types'
import type { Problem } from '@/domain/problem/types/Problem'


export const buildLibraryList = (
    problems: Problem[], 
    sort: ProblemSort,
    learningRecords: LearningRecord,
) => {
    return applySort(problems, sort, learningRecords)    
}