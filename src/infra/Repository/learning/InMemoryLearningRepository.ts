import type { LearningRecord } from "@/domain/learning/types/LearningEntry";
import type { LearningRepository } from "@/domain/learning/LearningRepository";

export class InMemoryLearningRepository implements LearningRepository {
    private records: LearningRecord;

    constructor(initial?: LearningRecord) {
        this.records = initial ? { ...initial } : {};
    }

    async load(): Promise<LearningRecord> {
        // 防御的コピー（外から破壊されないように）
        return { ...this.records };
    }

    async save(record: LearningRecord): Promise<void> {
        // 完全置き換え
        this.records = { ...record };
    }

    async remove(problemId: string): Promise<void> {
        if (!(problemId in this.records)) return;

        const { [problemId]: _, ...next } = this.records;
        this.records = next;
    }

    async removeMany(ids: string[]): Promise<void> {
        if (!ids || ids.length === 0) return;

        let changed = false;
        const next = { ...this.records };

        for (const id of ids) {
            if (id in next) {
                delete next[id];
                changed = true;
            }
        }

        if (changed) {
            this.records = next;
        }
    }
}
