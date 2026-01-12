import type { LearningRecord } from "@/domain/learning/types";
import type { Problem } from "../../problem/Problem";
import { applyFilter } from "./applyFilter";
import { applySort } from "./applySort";
import type { FilterState, MateLengthFilter, SortState } from "./types";
import type { Exercise } from "@/domain/Exercise/Exercise";


export function applyQuery(exercises: Exercise[], 
    sort?: SortState, filter?: FilterState){

    const filtered = filter ? applyFilter(exercises, filter) : exercises
    const sorted = sort ? applySort(filtered, sort) : filtered

    return sorted
}