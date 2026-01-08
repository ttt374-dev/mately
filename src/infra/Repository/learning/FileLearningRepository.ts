
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import type { LearningRepository } from "@/domain/learning/LearningRepository";
import type { LearningRecord } from "@/domain/learning/types";

const LIB_FILE = "learning.json";

export class FileLearningRepository implements LearningRepository {

    async load(): Promise<LearningRecord> {
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

        return typeof parsed === "object" && parsed !== null ? parsed : {};
    }

    async save(learningRecord: LearningRecord): Promise<void> {
        await Filesystem.writeFile({
            path: LIB_FILE,
            data: JSON.stringify(learningRecord),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
    }

    async remove(problemId: string): Promise<void> {
        const records = await this.load();

        if (!records[problemId]) return;

        const { [problemId]: _, ...next } = records;

        await this.save(next);
    }

    async removeMany(ids: string[]): Promise<void> {
        if (!ids || ids.length === 0) return;

        const records = await this.load();

        let changed = false;
        const next = { ...records };

        for (const id of ids) {
            if (id in next) {
                delete next[id];
                changed = true;
            }
        }

        if (changed) {
            await this.save(next);
        }
    }
}
