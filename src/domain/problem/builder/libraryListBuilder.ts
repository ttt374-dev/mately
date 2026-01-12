import type { SortState } from "@/domain/problem/query/types/Sort"
import { applySort } from "@/domain/problem/query/applySort"
import type { LearningRecord } from '@/domain/learning/types'
import type { Problem } from '@/domain/problem/Problem'
import type { Exercise } from "@/domain/Exercise/Exercise"


export const buildLibraryList = (
    exercises: Exercise[],
    //problems: Problem[], 
    sort: SortState,
    //learningRecords: LearningRecord,
) => {
    return applySort(exercises, sort)
    //return applySort(problems, sort, learningRecords)    
}