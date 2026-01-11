import type { SortState } from "@/domain/problem/query/types/Sort"
import { applySort } from "@/domain/problem/query/applySort"
import type { LearningRecord } from '@/domain/learning/types'
import type { Problem } from '@/domain/problem/Problem'


export const buildLibraryList = (
    problems: Problem[], 
    sort: SortState,
    learningRecords: LearningRecord,
) => {
    return applySort(problems, sort, learningRecords)    
}