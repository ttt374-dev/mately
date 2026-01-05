import { useLibraryFilter } from "@/ui/library/hooks/useLibraryFilter"
import { useLibrarySort } from "@/ui/library/hooks/useLibrarySort"
import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

// context を作る
type SortFilterContextValue = {
  sort: ReturnType<typeof useLibrarySort>,
  filter: ReturnType<typeof useLibraryFilter>
}
export const SortFilterContext = createContext<SortFilterContextValue | null > (null)

export const SortFilterProvider = ({children}: { children: ReactNode}) => {
  const sort = useLibrarySort()
  const filter = useLibraryFilter()

  return (
    <SortFilterContext.Provider value={{
      sort, filter
    }}>
      {children}
    </SortFilterContext.Provider>
    )

}

// Hook で安全に取得
export function useSortFilterContext(): SortFilterContextValue {
  const ctx = useContext(SortFilterContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



