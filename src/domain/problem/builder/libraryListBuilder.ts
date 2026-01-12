import type { SortState } from "@/domain/problem/query/types/Sort"
import { applySort } from "@/domain/problem/query/applySort"
import type { Exercise } from "@/domain/Exercise/Exercise"


export const buildLibraryList = (
    exercises: Exercise[],
    sort: SortState,
) => {
    return applySort(exercises, sort)

}