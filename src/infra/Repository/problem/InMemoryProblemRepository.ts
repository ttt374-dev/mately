import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { Problem } from "@/domain/problem/Problem";

export class InMemoryProblemRepository implements ProblemRepository {
    private problems: Problem[];

    constructor(initial?: Partial<Problem>[]) {
        // 初期データを Problem クラスインスタンスに変換
        this.problems = initial ? initial.map(d => Problem.create(d)) : [];
    }

    async load(): Promise<Problem[]> {
        // 外部から mutate されないようコピーを返す
        // ※コピーは shallow copy。必要なら deep copy
        return [...this.problems];
    }

    async save(collection: Problem[]): Promise<void> {
        // 完全置き換え
        // collection が Problem インスタンスであることを想定
        this.problems = [...collection];
    }

    async add(problem: Problem): Promise<void> {
        this.problems = [...this.problems, problem];
    }

    async remove(problemId: string): Promise<void> {
        this.problems = this.problems.filter(p => p.id !== problemId);
    }

    async removeMany(ids: string[]): Promise<void> {
        if (!ids || ids.length === 0) return;
        const idSet = new Set(ids);
        this.problems = this.problems.filter(p => !idSet.has(p.id));
    }
}
