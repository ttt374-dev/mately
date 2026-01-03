import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import type { Problem, Collection } from "@/domain/problem/types/Problem"
import { createProblemRepository } from "@/domain/problem/problemRepository"
import { useProblemCollection } from "@/ui/library/hooks/useProblemColleciton"

// context を作る
export const ProblemCollectionContext = createContext<ProblemCollectionContextValue | null > (null)
type ProblemCollectionContextValue = {
    collection: Collection,
    removeAll: () => void,
    addProblem: (problem: Problem) => void
}

export const ProblemCollectionProvider = ({children}: { children: ReactNode}) => {
    const repository = createProblemRepository()
    const { collection, removeAll, addProblem } = useProblemCollection(repository)

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



