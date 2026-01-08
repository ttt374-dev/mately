import { useLibraryFilter } from "@/ui/screens/library/hooks/useLibraryFilter"
import { useLibrarySort } from "@/ui/screens/library/hooks/useLibrarySort"
import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

// context を作る
type QueryContextValue = {
  sort: ReturnType<typeof useLibrarySort>,
  filter: ReturnType<typeof useLibraryFilter>
}
export const QueryContext = createContext<QueryContextValue | null > (null)

export const QueryProvider = ({children}: { children: ReactNode}) => {
  const sort = useLibrarySort()
  const filter = useLibraryFilter()

  return (
    <QueryContext.Provider value={{
      sort, filter
    }}>
      {children}
    </QueryContext.Provider>
    )

}

// Hook で安全に取得
export function useQueryContext(): QueryContextValue {
  const ctx = useContext(QueryContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



