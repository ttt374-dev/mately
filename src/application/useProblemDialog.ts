import { useStoreContext } from "@/app/providers/StoreProvider"
import { useState } from "react"

export function useProblemDetailDialog(
    problemId: string,
    onAfterDelete?: () => void,
){
    const [open, setOpen] = useState(false)
    const stores = useStoreContext()

    const handleUpdateTitle = (title: string) => {
        stores.problem.updateTitle(problemId, title)
    }
    const handleDeleteProblem = async () => {
        await stores.problem.removeMany([problemId])
        await stores.learning.removeMany([problemId])
        onAfterDelete?.()
    }
    return { 
        open, setOpen,
        handleUpdateTitle, handleDeleteProblem

    }
}