import { useProblemRecordsContext } from "@/app/providers/ProblemCollectionProvider"
import { useToast } from "@/app/providers/ToastProvider"
import MultipleFilesButton, { type ButtonType } from "@/ui/sharedComponents/MultipleFilesButton"
import { createImportProblemsUsecase } from "@/usecase/importProblems/importProblemsUsecase"

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

    const toast = useToast()

    const handleSelectFiles = async (files: File[]) => {
        
        const result = await importFiles(files)        
        if (result.ok){
            toast({message: `${result.count} 件インポートしました`, severity: "info"})
        } else {
            toast({message: result.message, severity: "error"})
        }
    }
    return (
        <MultipleFilesButton
            onFileSelected={handleSelectFiles}
            label="インポート"
            type={buttonType}
            buttonProps={{ variant: "outlined" }}
        />
    )

}