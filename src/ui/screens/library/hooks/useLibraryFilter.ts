import { useState } from "react"

import { DefaultFilterState, type FilterState, type SortState } from "@/domain/problem/query/types"


export function useLibraryFilter(){
  const [ filter, setFilter] = useState<FilterState>(DefaultFilterState)
  return {
    filter, setFilter
  }
}