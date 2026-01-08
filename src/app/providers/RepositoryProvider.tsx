import type { ReactNode, } from "react"
import { createContext, useContext, useState, useRef } from "react"

import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { ProblemRepository } from "@/domain/problem/problemRepository"
import { FileProblemRepository } from "@/infra/Repository/problem/FileProblemRepository"
import { FileLearningRepository } from "@/infra/Repository/learning/FileLearningRepository"

type RepositoryContextValue = {
    readonly problem: ProblemRepository
    readonly learning: LearningRepository
}
export const RepositoryContext = createContext<RepositoryContextValue | null>(null)

export const RepositoryProvider = ({ children }: { children: ReactNode }) => {
    const problemRepoRef = useRef<ProblemRepository|null>(null)
    const learningRepoRef = useRef<LearningRepository|null>(null)

    if (!problemRepoRef.current) {
        problemRepoRef.current = new FileProblemRepository()
    }
    if (!learningRepoRef.current) {
        learningRepoRef.current = new FileLearningRepository()
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
