import { useRepositoryContext } from "@/app/providers/RepositoryProvider"
import { useStoreContext } from "@/app/providers/StoreProvider"
import { fileBackupWriter } from "@/infra/backup/backupWriter"
import { createBackupRestoreUsecase, type BackupData } from "@/usecase/backupRestore/backupRestoreUsecase"

export const useBackupRestore = () => {
    const repos = useRepositoryContext()
    const stores = useStoreContext()

    const usecase = createBackupRestoreUsecase(repos.problem, repos.learning, fileBackupWriter)
    const backup = async () => {
        await usecase.backup()        
    }
    const restore = async (data: BackupData) => {
        await usecase.restore(data)
        await stores.exercise.reload()
        
    }
    return {
        backup, restore
    }
    
}