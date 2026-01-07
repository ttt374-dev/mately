import type { ReactNode, } from "react"
import { createContext, useContext, useState, useRef } from "react"

import { createLearningRepository, type LearningRepository } from "@/domain/learning/LearningRepository"
import { createProblemRepository, type ProblemRepository } from "@/domain/problem/problemRepository"


type RepositoryContextValue = {
    readonly problem: ProblemRepository
    readonly learning: LearningRepository
}
export const RepositoryContext = createContext<RepositoryContextValue | null>(null)

export const RepositoryProvider = ({ children }: { children: ReactNode }) => {
    const problemRepoRef = useRef<ProblemRepository|null>(null)
    const learningRepoRef = useRef<LearningRepository|null>(null)

    if (!problemRepoRef.current) {
        problemRepoRef.current = createProblemRepository()
    }
    if (!learningRepoRef.current) {
        learningRepoRef.current = createLearningRepository()
    }
    return (
        <RepositoryContext.Provider value={{
            problem: problemRepoRef.current,
            learning: learningRepoRef.current,
        }}>
            {children}
        </RepositoryContext.Provider>
    )
}

export function useRepositoryContext() {
    const ctx = useContext(RepositoryContext)
    if (!ctx) throw new Error("context provider error");
    return ctx;
}
