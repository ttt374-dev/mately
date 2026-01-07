import { buildProblem } from "@/domain/problem/factory";
import type { Problem } from "@/domain/problem/types/Problem";


export function createImportProblemsUsecase(addProblem: (problem: Problem) => void) {
    const importFile = async (file: File) => {
        console.log("import file", file)
        try {
            const buf = await file.arrayBuffer();
            const text = new TextDecoder("shift_jis").decode(buf);

            const newProblem = buildProblem(text, file.name)
            console.log("add program info", addProblem)
            console.log("new problem", newProblem)

            newProblem && addProblem(newProblem)
            console.log("add problem must be done/????")
        } catch (e) {
            console.error(`Failed to import file ${file.name}:`, e);
        }
    }
    const importFiles = (files: File[]) => {
        for (const file of files) {
            importFile(file)
        }
    }
    return {
        importFile,
        importFiles
    }
}