import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import type { SortState } from "../../domain/problemCatalog/types/Sort"
import type { Filter } from "../../domain/problemCatalog/types/Filter"
import { sortProblems } from "@/domain/problemCatalog/sortProblems"
import { filterProblems } from "@/domain/problemCatalog/filterProblems"


export const buildLibraryList = (records: ProblemRecord, sort: SortState, filter: Filter) => {
    const problems = Object.values(records)
    //const filtered = sortProblems(filterProblems(problems, filter), sort)
    const sorted = sortProblems(problems, sort)

    return Object.values(sorted)
}