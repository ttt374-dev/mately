import { DefaultFilter, type ProblemFilter } from "./Filter"
import { DefaultSort, type ProblemSort } from "./Sort"

export type ProblemQuery = {
    sort: ProblemSort,
    filter: ProblemFilter,
}

export const DefaultQUery = {
    sort: DefaultSort,
    filter: DefaultFilter,
}

