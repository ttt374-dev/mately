import type { ProblemRecord } from "../../domain/problem/types/Problem"
import type { SortState } from "../../domain/problemRecord/types/Sort"
import type { Filter } from "../../domain/problemRecord/types/Filter"
import { sortProblems } from "@/domain/problemRecord/sortProblems"
import { filterProblems } from "@/domain/problemRecord/filterProblems"


export const buildLibraryList = (records: ProblemRecord, sort: SortState, filter: Filter) => {
    const problems = Object.values(records)
    const filtered = sortProblems(filterProblems(problems, filter), sort)

    return Object.values(filtered)
}