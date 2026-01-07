import { useProblemRecordsContext } from "@/app/providers/ProblemCollectionProvider"
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

    const handleSelectFiles = (files: File[]) => {
        importFiles(files)        
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