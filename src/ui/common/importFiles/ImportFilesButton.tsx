import { useLearningRecordsContext } from "@/app/providers/LearningRecordsProvider"
import { useProblemRecordsContext } from "@/app/providers/ProblemCollectionProvider"
import { createLearningRepository } from "@/domain/learning/LearningRepository"
import { createProblemRepository } from "@/domain/problem/problemRepository"
import MultipleFilesButton, { type ButtonType } from "@/ui/sharedComponents/MultipleFilesButton"
import { createBackupRestoreUsecase, type BackupWriter } from "@/usecase/backupRestore/backupRestoreUsecase"
import { createImportProblemsUsecase } from "@/usecase/importProblems/importProblemsUsecase"
import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { LeakRemove } from "@mui/icons-material"
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider
} from "@mui/material"
import { useRef } from "react"
//import { useKifBackupRestore } from "../hooks/library/useKifBackupRestore"
////////////////////
// 専用フック
const useImportFiles = () => {
    const problemApi = useProblemRecordsContext()
    const addProblem = problemApi.addProblem
    const usecase = createImportProblemsUsecase(addProblem)
    return {
        importFiles: usecase.importFiles
    }
}

type Props = {
    buttonType?: ButtonType
}
export default function ImportFilesButton({ buttonType = "button" } : Props){
    const { importFiles } = useImportFiles()

    const handleSelectFiles = (files: File[]) => {
        importFiles(files)        
    }
    return (
        <MultipleFilesButton
            onFileSelected={handleSelectFiles}
            label="インポート"
            type={buttonType}
            buttonProps={{ fullWidth: true, variant: "outlined" }}
        />
    )

}