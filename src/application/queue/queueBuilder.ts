import type { ProblemRecord } from "../../domain/problem/types/Problem"
import type { QueueItem } from "@/domain/session/types"
import type { SortState } from "../../domain/problemRecord/types/Sort"
import type { Filter } from "../../domain/problemRecord/types/Filter"
import { sortProblems } from "@/domain/problemRecord/sortProblems"
import { filterProblems } from "@/domain/problemRecord/filterProblems"

export const buildQueue = (records: ProblemRecord, sort: SortState, filter: Filter): QueueItem[] => {
    const problems = Object.values(records)
    const filtered = sortProblems(filterProblems(problems, filter), sort)
    return Object.values(filtered).map((p) => ({problemId: p.id}))
}