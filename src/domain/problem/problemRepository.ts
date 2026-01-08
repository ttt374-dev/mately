import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { Problem } from "./types/Problem";

const LIB_FILE = "problem.json";

export interface ProblemRepository {
    load(): Promise<Problem[]>
    save(problems: Problem[]): Promise<void>
    add(problem: Problem): Promise<void>
    remove(problemId: string): Promise<void>
    removeMany(ids: string[]): Promise<void>
}
