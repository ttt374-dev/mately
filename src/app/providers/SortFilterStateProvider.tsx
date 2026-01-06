import { useLibraryFilter } from "@/ui/screens/library/hooks/useLibraryFilter"
import { useLibrarySort } from "@/ui/screens/library/hooks/useLibrarySort"
import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

// context を作る
type SortFilterStateContextValue = {
  sort: ReturnType<typeof useLibrarySort>,
  filter: ReturnType<typeof useLibraryFilter>
}
export const SortFilterStateContext = createContext<SortFilterStateContextValue | null > (null)

export const SortFilterStateProvider = ({children}: { children: ReactNode}) => {
  const sort = useLibrarySort()
  const filter = useLibraryFilter()

  return (
    <SortFilterStateContext.Provider value={{
      sort, filter
    }}>
      {children}
    </SortFilterStateContext.Provider>
    )

}

// Hook で安全に取得
export function useSortFilterStateContext(): SortFilterStateContextValue {
  const ctx = useContext(SortFilterStateContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



