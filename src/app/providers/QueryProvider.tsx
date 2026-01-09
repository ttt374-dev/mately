import { useFilter } from "@/application/useFilter"
import { useSort } from "@/application/useSort"
import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

// context を作る
type QueryContextValue = {
  sort: ReturnType<typeof useSort>,
  filter: ReturnType<typeof useFilter>
}
export const QueryContext = createContext<QueryContextValue | null > (null)

export const QueryProvider = ({children}: { children: ReactNode}) => {
  const sort = useSort()
  const filter = useFilter()

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



