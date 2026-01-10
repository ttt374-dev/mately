import { useStoreContext } from "@/app/providers/StoreProvider"
import type { Problem } from "@/domain/problem/types/Problem"
import { useState } from "react"

export function useProblemDetailDialog(
    onAfterDelete?: () => void,
) {
    const [problem, setProblem] = useState<Problem | null>(null)

    const open = problem !== null

    const openDialog = (problem: Problem) => {
        setProblem(problem)
    }

    const closeDialog = () => {
        setProblem(null)
    }

    const stores = useStoreContext()

    const updateTitle = (title: string) => {
        problem && stores.problem.updateTitle(problem.id, title)
    }
    const deleteProblem = async () => {
        if(problem){
            await stores.problem.removeMany([problem.id])
            await stores.learning.removeMany([problem.id])
            onAfterDelete?.()
        }
    }
    const resetLearning = async () => {
        problem && 
            await stores.learning.removeMany([problem.id])
    }
    return {
        open, openDialog, closeDialog,
        problem,
        updateTitle, deleteProblem, resetLearning,

    }
}