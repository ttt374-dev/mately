import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import type { BackupWriter } from "@/usecase/backupRestore/backupRestoreUsecase"



export const fileBackupWriter: BackupWriter = {   
    write: async (data: string, filename: string) => {
        if (Capacitor.isNativePlatform()) {
            // Android / iOS
            await Filesystem.writeFile({
                path: `Download/${filename}`,
                directory: Directory.External,
                data: data,
                encoding: Encoding.UTF8,
            })
        } else {
            // Web
            const blob = new Blob([data], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = filename
            a.click()
            URL.revokeObjectURL(url)
        }

    }
}
