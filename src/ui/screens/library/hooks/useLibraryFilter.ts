import { useState } from "react"

import { DefaultFilterState, type FilterState, type SortState } from "@/domain/problem/query/types"


export function useLibraryFilter(){
  const [ filter, setFilter] = useState<FilterState>(DefaultFilterState)

   const update = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilter(f => ({
            ...f,
            [key]: value,
        }));
    };
    
  return {
    filter, setFilter, update
  }
}