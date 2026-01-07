import { useLearningRecordsContext } from "@/app/providers/LearningRecordsProvider"
import { useProblemRecordsContext } from "@/app/providers/ProblemCollectionProvider"
import { createLearningRepository } from "@/domain/learning/LearningRepository"
import { createProblemRepository } from "@/domain/problem/problemRepository"
import { createBackupRestoreUsecase, type BackupWriter } from "@/usecase/backupRestore/backupRestoreUsecasets"
import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { LeakRemove } from "@mui/icons-material"
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider
} from "@mui/material"
import { useRef } from "react"
//import { useKifBackupRestore } from "../hooks/library/useKifBackupRestore"

type Props = {
    open: boolean
    onClose: () => void
}

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
            //alert("バックアップを保存しました")
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
const useBackupRestore = () => {
    const problemApi = useProblemRecordsContext()
    const learningApi = useLearningRecordsContext()
    return createBackupRestoreUsecase(
        {
            records: problemApi.records,
            replaceAll: problemApi.replaceAll
        }, 
        {
            records: learningApi.records,
            replaceAll: learningApi.replaceAll
        },
        
        writer

    )
}

export default function BackupRestoreDialog({ open, onClose }: Props) {

    const { backup, restore } = useBackupRestore()
    const fileInputRef = useRef<HTMLInputElement>(null)

    /* ===== backup ===== */   
    const handleBackup = async () => {
        backup()
    }

    /* ===== restore ===== */
    const handleRestoreFile = async (file: File) => {
        const text = await file.text()
        const json = JSON.parse(text)

        if (!window.confirm("現在の棋譜・学習履歴はすべて上書きされます。よろしいですか？")) {
            return
        }

        restore(json)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>バックアップ / 復元</DialogTitle>

            <DialogContent>
                {/* backup */}
                <Box mb={3}>
                    <Typography variant="h6">バックアップ</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        棋譜ライブラリと学習履歴を JSON ファイルとして保存します。
                    </Typography>
                    <Button variant="contained" onClick={handleBackup}>
                        バックアップを保存
                    </Button>
                </Box>

                <Divider />

                {/* restore */}
                <Box mt={3}>
                    <Typography variant="h6">復元</Typography>
                    <Typography variant="body2" color="error" mb={1}>
                        復元すると現在のデータはすべて上書きされます。
                    </Typography>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        バックアップを読み込む
                    </Button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json"
                        hidden
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleRestoreFile(file)
                            e.currentTarget.value = ""
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>閉じる</Button>
            </DialogActions>
        </Dialog>
    )
}
