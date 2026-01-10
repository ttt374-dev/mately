import { useProblemQuery } from "@/application/query/useProblemQuery"
import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"
import { useStoreContext } from "./StoreProvider"

// context を作る
type QueryContextValue = ReturnType<typeof useProblemQuery>

export const QueryContext = createContext<QueryContextValue | null > (null)

export const QueryProvider = ({children}: { children: ReactNode}) => {
  return (
    <QueryContext.Provider value={useProblemQuery()}>
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



