import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { LearningEntry, LearningRecord } from "./types/LearningEntry";

const LIB_FILE = "learning.json";

export interface LearningRepository {
    load(): Promise<LearningRecord>
    save(learningrecord: LearningRecord): Promise<void>
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

    return { load, save }
}