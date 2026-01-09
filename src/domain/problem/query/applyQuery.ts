import type { LearningRecord } from "@/domain/learning/types";
import type { Problem } from "../types/Problem";
import { applyFilter } from "./applyFilter";
import { applySort } from "./applySort";
import type { FilterState, SortState } from "./types";


export function applyQuery(problems: Problem[], sort?: SortState, filter?: FilterState, learningRecords?: LearningRecord){

    const filtered = filter ? applyFilter(problems, filter, learningRecords) : problems
    const sorted = sort ? applySort(filtered, sort, learningRecords) : filtered

    return sorted
}