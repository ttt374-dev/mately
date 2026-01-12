import type { ReactNode, } from "react"
import { createContext, useContext, } from "react"
import { useRepositoryContext } from "./RepositoryProvider"
import { useExerciseStore } from "@/application/store/useExerciseStore"

type StoreContextValue = {
    //readonly problem: ReturnType<typeof useProblemStore>
    //readonly learning: ReturnType<typeof useLearningStore>
    readonly exercise: ReturnType<typeof useExerciseStore>
}
export const StoreContext = createContext<StoreContextValue | null>(null)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const repos = useRepositoryContext()
    return (
        <StoreContext.Provider value={{
            //problem: useProblemStore(repos.problem),
            //learning: useLearningStore(repos.learning),
            exercise: useExerciseStore(repos.problem, repos.learning),
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export function useStoreContext() {
    const ctx = useContext(StoreContext)
    if (!ctx) throw new Error("context provider error");
    return ctx;
}
