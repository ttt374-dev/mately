import { useStoreContext } from "@/app/providers/StoreProvider"
import type { Exercise } from "@/domain/Exercise/Exercise"
import type { Problem } from "@/domain/problem/Problem"
import { useState } from "react"

export function useProblemDetailDialog(
    onAfterDelete?: () => void,
) {
    const [exercise, setExecise] = useState<Exercise | null>(null)

    const open = exercise !== null

    const openDialog = (exercise: Exercise) => {
        setExecise(exercise)
    }

    const closeDialog = () => {
        setExecise(null)
    }
    const store = useStoreContext()

    const updateTitle = (title: string) => {
        exercise && store.updateTitle(exercise.problem.id, title)
    }
    const deleteProblem = async () => {
        if(exercise){
            await store.remove(exercise.problem.id)
            onAfterDelete?.()
        }
    }
    const resetLearning = async () => {
        exercise && 
            await store.remove(exercise.problem.id)
    }
    return {
        open, openDialog, closeDialog,
        exercise,
        updateTitle, deleteProblem, resetLearning,

    }
}