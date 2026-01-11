import { useRepositoryContext } from "@/app/providers/RepositoryProvider";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { Problem } from "@/domain/problem/Problem";

type ImportResult = 
    | { ok: true, count: number}
    | { ok: false, message: string }



export function createImportProblemsUsecase(problemRepo: ProblemRepository) {
    
    const importFile = async (file: File): Promise<ImportResult> => {
        console.log("import file", file)
        try {
            const buf = await file.arrayBuffer();
            const text = new TextDecoder("shift_jis").decode(buf);

            // TODO filename
            const repos = useRepositoryContext()
            const problems = await repos.problem.load()
            const resolvedTitle = resolveUniqTitle(file.name, problems)
            const newProblem = Problem.createFromText(text, resolvedTitle)
            newProblem && await problemRepo.add(newProblem)
            
            return { ok: true, count: 1}
        } catch (e) {
            const message = `Failed to import file ${file.name}:`
            console.error(message, e);
            
            return { ok: false, message: message }
        }
    }
    const importFiles =  async (files: File[]): Promise<ImportResult> => {
        let successCount = 0
        let failedCount = 0

        for (const file of files) {
            const result = await importFile(file)
            if (result.ok){
                successCount++
            } else {
                failedCount++
            }
        }
        if (failedCount > 0){
            return { ok: false, message: `failed to import ${failedCount} files`}    
        }
        return { ok: true, count: successCount}        
    }
    return {
        importFile,
        importFiles
    }
}

//////////////////////////////////////
function splitFilename(filename: string): { basename: string, ext: string } {
    let basename = filename;
    let ext = "";
    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex >= 0) {
        basename = filename.slice(0, dotIndex);
        ext = filename.slice(dotIndex);
    }
    return { basename, ext }
}

function validateTitle(title: string, entries: Problem[]): boolean {
    const existingTitles = new Set(entries.map(e => e.title));
    return existingTitles.has(title)
}

function resolveUniqTitle(filename: string, existingEntries: Problem[]): string {
    // ファイル名と拡張子を分離
    const { basename, ext } = splitFilename(filename)
    const title = basename + ext

    let newTitle = basename + ext;
    let counter = 1;
    const existingTitles = new Set([...existingEntries].map(e => e.title));
    while (existingTitles.has(title)) {
        newTitle = `${basename}(${counter})${ext}`;
        counter++;
    }
    return newTitle
}
