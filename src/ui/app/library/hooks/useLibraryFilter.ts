import { createContext, useContext, useState } from "react"

import type { Filter, SortState } from "@/domain/problemCatalog/types"

const DefaultFilter = {
    unansweredOnly: false,
    dueOnly: false,
    starredOnly: false,
};

export function useLibraryFilter(){
  const [ filter, setFilter] = useState<Filter>(DefaultFilter)
  return {
    filter, setFilter
  }
}