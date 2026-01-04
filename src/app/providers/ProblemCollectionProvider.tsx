import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import { createProblemRepository } from "@/domain/problem/problemRepository"
import { useProblemRecords } from "@/ui/hooks/useProblemRecords"

// context を作る
type ProblemRecordsContextValue = ReturnType<typeof useProblemRecords>
export const ProblemRecordsContext = createContext<ProblemRecordsContextValue | null > (null)

export const ProblemRecordProvider = ({children}: { children: ReactNode}) => {
    const repository = createProblemRepository()    
    return (
        <ProblemRecordsContext.Provider value={
            useProblemRecords(repository)
        }>
            {children}
        </ProblemRecordsContext.Provider>        
    )

}

// Hook で安全に取得
export function useProblemRecordsContext(): ProblemRecordsContextValue {
  const ctx = useContext(ProblemRecordsContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



