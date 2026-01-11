import { useRepositoryContext } from "@/app/providers/RepositoryProvider"
import { useStoreContext } from "@/app/providers/StoreProvider"
import { createImportProblemsUsecase } from "@/usecase/importProblems/importProblemsUsecase"

// 専用フック
export const useImportFiles = () => {
    //const addProblem = problemApi.addProblem
    const repos = useRepositoryContext()
    const usecase = createImportProblemsUsecase(repos.problem)
    const stores = useStoreContext()
    
    
    return {
        importFiles: async (files: File[]) => {
            console.log("importfiles:", files)
            const result = await usecase.importFiles(files)
            await stores.problem.reload()
            return result
        }
    }
}