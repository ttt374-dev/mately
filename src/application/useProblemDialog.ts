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
    const stores = useStoreContext()

    const updateTitle = (title: string) => {
        exercise && stores.exercise.updateTitle(exercise.problem.id, title)
    }
    const deleteProblem = async () => {
        if(exercise){
            await stores.exercise.remove(exercise.problem.id)
            onAfterDelete?.()
        }
    }
    const resetLearning = async () => {
        exercise && 
            await stores.exercise.remove(exercise.problem.id)
    }
    return {
        open, openDialog, closeDialog,
        exercise,
        updateTitle, deleteProblem, resetLearning,

    }
}