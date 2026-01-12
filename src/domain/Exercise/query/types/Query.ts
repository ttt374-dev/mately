import { DefaultFilterState, type FilterState } from "./Filter"
import { DefaultSortState, type SortState } from "./Sort"

export type QueryState = {
    sort: SortState,
    filter: FilterState,
}

export const DefaultQUeryState = {
    sort: DefaultSortState,
    filter: DefaultFilterState,
}

