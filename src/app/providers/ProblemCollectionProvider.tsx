import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import type { Problem, ProgramRecord } from "@/domain/problem/types/Problem"
import { createProblemRepository } from "@/domain/problem/problemRepository"
import { useProblemRecords } from "@/ui/hooks/useProblemRecords"

// context を作る
export const ProblemCollectionContext = createContext<ProblemCollectionContextValue | null > (null)
type ProblemCollectionContextValue = {
    collection: ProgramRecord,
    removeAll: () => void,
    addProblem: (problem: Problem) => void
}

export const ProblemRecordProvider = ({children}: { children: ReactNode}) => {
    const repository = createProblemRepository()
    const { collection, removeAll, addProblem } = useProblemRecords(repository)

    return (
        <ProblemCollectionContext.Provider value={{
            collection, removeAll, addProblem
        }}>
            {children}
        </ProblemCollectionContext.Provider>
        
    )

}

// Hook で安全に取得
export function useProblemCollectionContext(): ProblemCollectionContextValue {
  const ctx = useContext(ProblemCollectionContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



