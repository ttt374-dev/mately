import { Capacitor } from "@capacitor/core"

import { createLearningRepository } from "@/domain/learning/LearningRepository"
import { createProblemRepository } from "@/domain/problem/problemRepository"
import { createBackupRestoreUsecase, type BackupData, type BackupWriter } from "@/usecase/backupRestore/backupRestoreUsecasets"
import type { ReactNode } from "react"
import { createContext, useContext } from "react"
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem"


const writer: BackupWriter = {
    write: async (data: string, filename: string) => {
        if (Capacitor.isNativePlatform()) {
            // Android / iOS
            await Filesystem.writeFile({
                path: `Download/kif-backup-${Date.now()}.json`,
                directory: Directory.External,
                data: data,
                encoding: Encoding.UTF8,
            })
            alert("バックアップを保存しました")
        } else {
            // Web
            const blob = new Blob([data], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `kif-backup-${Date.now()}.json`
            a.click()
            URL.revokeObjectURL(url)
        }
    }
}
// context を作る
type BackupRestoreContextValue = ReturnType<typeof createBackupRestoreUsecase>
export const BackupRestoreContext = createContext<BackupRestoreContextValue | null>(null)

export const BackupRestoreProvider = ({ children }: { children: ReactNode }) => {
    const problemRepo = createProblemRepository()
    const learningRepo = createLearningRepository()
    return (
        <BackupRestoreContext.Provider value={
            createBackupRestoreUsecase(problemRepo, learningRepo, writer)
        }>
            {children}
        </BackupRestoreContext.Provider>
    )
}

// Hook で安全に取得
export function useBackupRestoreContext(): BackupRestoreContextValue {
    const ctx = useContext(BackupRestoreContext)
    if (!ctx) throw new Error("context provider error");
    return ctx;
}



