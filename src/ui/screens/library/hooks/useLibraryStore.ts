import { useQueryContext } from "@/app/providers/QueryProvider"
import { useStoreContext } from "@/app/providers/StoreProvider"
import { buildLibraryList } from "@/domain/problem/builder"

export function useLibraryStore(){
    const stores = useStoreContext()    

    const {  state: { sortState }  } = useQueryContext()
    //const sortState = state.sortState
    const libraryList = buildLibraryList(
        stores.exercise.exercises, sortState)
        //stores.problem.problems, sortState, stores.learning.records)
    
    const removeMany = async (ids: string[]) => {
        await stores.exercise.removeMany(ids)
        //await stores.problem.removeMany(ids)
        //await stores.learning.removeMany(ids)   
    }
    
    const clearAllLearings = () => {}

    return {
        //problems: stores.problem.problems, 
        libraryList,
        //learningRecords: stores.learning.records,  // TODO
        //clearAllLearnings: stores.learning.clearAll, // TODO
        clearAllLearings,
        toggleStar: stores.exercise.toggleStar,
        removeMany 
    }
}