import { createContext, useContext, useState } from "react"

import type { ProblemFilter, ProblemSort } from "@/domain/problem/query/types"

const DefaultFilter = {
    unansweredOnly: false,
    includeNotDue: false,
    starredOnly: false,
};

export function useLibraryFilter(){
  const [ filter, setFilter] = useState<ProblemFilter>(DefaultFilter)
  return {
    filter, setFilter
  }
}