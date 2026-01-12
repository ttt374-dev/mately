import { useQueryContext } from "@/app/providers/QueryProvider"
import { useStoreContext } from "@/app/providers/StoreProvider"
import { buildLibraryList } from "@/domain/Exercise/builder"

export function useLibraryStore(){
    const store = useStoreContext()    

    const {  state: { sortState }  } = useQueryContext()
    //const sortState = state.sortState
    const libraryList = buildLibraryList(
        store.exercises, sortState)
        //stores.problem.problems, sortState, stores.learning.records)
    
    const removeMany = async (ids: string[]) => {
        await store.removeMany(ids)
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
        toggleStar: store.toggleStar,
        removeMany 
    }
}