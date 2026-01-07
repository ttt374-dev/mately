import { buildProblem } from "@/domain/problem/factory";




export function createImportProblemsUsecase() {
    const importFile = async (file: File) => {
        try {
            const buf = await file.arrayBuffer();
            const text = new TextDecoder("shift_jis").decode(buf);

            const newProblem = buildProblem(text, file.name)
            console.log("new problem", newProblem)
            //newProblem && addProblem(newProblem)
        } catch (e) {
            console.error(`Failed to import file ${file.name}:`, e);
        }
    }
    const importFiles = (files: File[]) => {

    }
    return {
        importFiles
    }
}