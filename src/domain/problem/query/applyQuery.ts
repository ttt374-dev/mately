import type { LearningRecord } from "@/domain/learning/types";
import type { Problem } from "../types/Problem";
import { applyFilter } from "./applyFilter";
import { applySort } from "./applySort";
import type { ProblemFilter, ProblemSort } from "./types";


function applyQuery(problems: Problem[], sort: ProblemSort, filter: ProblemFilter, learningRecords: LearningRecord){
    return applySort(applyFilter(problems, filter, learningRecords), sort, learningRecords)
}