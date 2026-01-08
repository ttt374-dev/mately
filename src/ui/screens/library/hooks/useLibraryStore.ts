import { useQueryContext } from "@/app/providers/QueryProvider"
import { useStoreContext } from "@/app/providers/StoreProvider"
import { buildLibraryList } from "@/domain/problem/builder"

export function useLibraryStore(){
    const stores = useStoreContext()    

    const { sort: { sortState } } = useQueryContext()
    const libraryList = buildLibraryList(stores.problem.problems, sortState, stores.learning.records)
    
    const removeMany = async (ids: string[]) => {
        await stores.problem.removeMany(ids)
        await stores.learning.removeMany(ids)   
    }
    
    return {
        //problems: stores.problem.problems, 
        libraryList,
        learningRecords: stores.learning.records,
        clearAllLearnings: stores.learning.clearAll,
        toggleStar: stores.problem.toggleStar,
        removeMany 
    }
}