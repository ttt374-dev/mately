import type { SortState } from "@/domain/Exercise/query/types/Sort"
import { applySort } from "@/domain/Exercise/query/applySort"
import type { Exercise } from "@/domain/Exercise/Exercise"


export const buildLibraryList = (
    exercises: Exercise[],
    sort: SortState,
) => {
    return applySort(exercises, sort)

}