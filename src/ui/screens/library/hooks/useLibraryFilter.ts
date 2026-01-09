import { createContext, useContext, useState } from "react"

import type { FilterState, SortState } from "@/domain/problem/query/types"

const DefaultFilter = {
    unansweredOnly: false,
    includeNotDue: false,
    starredOnly: false,
};

export function useLibraryFilter(){
  const [ filter, setFilter] = useState<FilterState>(DefaultFilter)
  return {
    filter, setFilter
  }
}