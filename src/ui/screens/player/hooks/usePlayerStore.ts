import { useStoreContext } from "@/app/providers/StoreProvider"


export function usePlayerStore(){
    const stores = useStoreContext()
    
    const deleteProblem = (id: string) => {
        stores.problem.removeMany([id])
        stores.learning.removeMany([id])
    }
    return {
        deleteProblem
    }    
}
