import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { LearningEntry, LearningRecord } from "./types/LearningEntry";

const LIB_FILE = "learning.json";

export interface LearningRepository {
    load(): Promise<LearningRecord>
    save(learningrecord: LearningRecord): Promise<void>
    remove(problemId: string): Promise<void>
    removeMany(ids: string[]): Promise<void>
}

export const createLearningRepository = (): LearningRepository => {
    async function load(): Promise<LearningRecord> {
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

        // すでに record の場合
        return typeof parsed === "object" && parsed !== null ? parsed : {};
    };

    async function save(learningrecord: LearningRecord) {
        await Filesystem.writeFile({
            path: LIB_FILE,
            data: JSON.stringify(learningrecord),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
    };
     async function remove(problemId: string) {
        const records = await load();

        // problemId が存在しなければ何もしない
        if (!records[problemId]) return;

        // 削除
        const { [problemId]: _, ...next } = records;

        // 永続化
        await save(next);
    }
    async function removeMany(ids: string[]){
        const records = await load()

        let changed = false;

        const next = { ...records };

        for (const id of ids) {
            if (id in next) {
                delete next[id];
                changed = true;
            }
        }

        // 実際に変更があった場合のみ保存
        if (changed) {
            await save(next);
        }
    
    }

    return { load, save, remove, removeMany }
}