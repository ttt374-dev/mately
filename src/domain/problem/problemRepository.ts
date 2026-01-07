import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { Problem } from "./types/Problem";
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'

const LIB_FILE = "problem.json";

export interface ProblemRepository {
    load(): Promise<Problem[]>
    save(collection: Problem[]): Promise<void>
    add(problem: Problem): Promise<void>
    remove(problemId: string): Promise<void>
    removeMany(ids: string[]): Promise<void>
}
///////////////////////////////////////////////
export const createProblemRepository = (): ProblemRepository => {
   async function load(): Promise<Problem[]> {
    const result = await Filesystem.readFile({
        path: LIB_FILE,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });

    const dataStr =
        typeof result.data === "string"
            ? result.data
            : await result.data.text();

    const parsed = JSON.parse(dataStr);

    // 配列ならそのまま返す
    if (Array.isArray(parsed)) {
        return parsed as Problem[];
    }

    // Record 型で保存されている場合 → 配列に変換
    if (typeof parsed === "object" && parsed !== null) {
        return Object.values(parsed) as Problem[];
    }

    // それ以外は空配列
    return [];
}


    async function save(collection: Problem[]) {
        await Filesystem.writeFile({
            path: LIB_FILE,
            data: JSON.stringify(collection),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
    };
    async function add(problem: Problem){
        const records = await load()
        const next = [...records, problem]        
        await save(next)
        
    }
    async function remove(problemId: string) {
        const problems = await load();

        // filter で該当 id を除外
        const next = problems.filter(p => p.id !== problemId);

        // 永続化
        await save(next);
    }
    async function removeMany(ids: string[]) {
        if (!ids || ids.length === 0) return;

        const problems = await load();

        // filter で id 配列に含まれるものを除外
        const next = problems.filter(p => !ids.includes(p.id));

        await save(next);
    }
    return { load, save, add, remove, removeMany }
}