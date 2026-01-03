import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { Problem, Collection } from "./types/Problem";

const LIB_FILE = "problem.json";

export interface ProblemRepository {
    load(): Promise<Collection>
    save(collection: Collection): Promise<void>
}

export const createProblemRepository = (): ProblemRepository => {
    async function load(): Promise<Collection> {
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
            const record: Collection = {};
            parsed.forEach((p: Problem) => {
                record[p.id] = p;
            });
            return record;
        }
        // すでに record の場合
        return typeof parsed === "object" && parsed !== null ? parsed : {};
    };

    async function save(collection: Collection) {
        await Filesystem.writeFile({
            path: LIB_FILE,
            data: JSON.stringify(collection),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
    };

    return { load, save }
}