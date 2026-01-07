import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { Problem } from "./types/Problem";
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'

const LIB_FILE = "problem.json";

export interface ProblemRepository {
    load(): Promise<ProblemRecord>
    save(collection: ProblemRecord): Promise<void>
    add(problem: Problem): Promise<void>
    remove(problemId: string): Promise<void>
}
///////////////////////////////////////////////
export const createProblemRepository = (): ProblemRepository => {
    async function load(): Promise<ProblemRecord> {
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
        // 配列で保存されている場合は record に変換
        if (Array.isArray(parsed)) {
            const record: ProblemRecord = {};
            parsed.forEach((p: Problem) => {
                record[p.id] = p;
            });
            return record;
        }
        // すでに record の場合
        return typeof parsed === "object" && parsed !== null ? parsed : {};
    };

    async function save(collection: ProblemRecord) {
        await Filesystem.writeFile({
            path: LIB_FILE,
            data: JSON.stringify(collection),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
    };
    async function add(problem: Problem){
        const records = await load()
        // 既存IDチェック（必要なら）
        if (records[problem.id]) {
            throw new Error(`Problem already exists: ${problem.id}`)
        }
        const next: ProblemRecord = {
            ...records,
            [problem.id]: problem,
        }

        await save(next)
        
    }
    async function remove(problemId: string): Promise<void> {
        const records = await load()

        // 存在しない場合は何もしない（方針）
        if (!records[problemId]) {
            return
        }

        const { [problemId]: _, ...next } = records

        await save(next)
    }
    async function removeMany(problemIds: string[]): Promise<void> {
        const records = await load();

        const next = { ...records };
        for (const id of problemIds) {
            delete next[id];
        }

        await save(next);
    }



    return { load, save, add, remove }
}