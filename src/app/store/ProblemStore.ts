import { useState, useEffect } from "react";
import type { Problem } from "@/domain/problem/types/Problem";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { createProblem } from "@/domain/problem/factory";

export function createProblemStore(repository: ProblemRepository) {
    const [problems, setProblems] = useState<Problem[]>([]);

    // 初期ロード
    useEffect(() => {
        reload().catch(() => setProblems([]));
    }, []);

    const reload = async () => {
        try {
            const data = await repository.load();
            setProblems(data);
            console.log("problems reload", data);
        } catch {
            setProblems([]);
        }
    };

    // -------------------------
    // 非同期対応メソッド
    // -------------------------

    const addProblem = async (newProblem: Problem) => {
        //console.log("add problem", newProblem);    
        // 現在の state から新しい配列を作る
        const next = [...problems, newProblem];
        // state を更新
        setProblems(next);

        // 永続化
        await repository.save(next);
    };

    const replaceAll = async (newProblems: Problem[]) => {
        setProblems(newProblems);
        await repository.save(newProblems);
    };

    const update = async (problemId: string, updater: (p: Problem) => Problem) => {
        // 現在の state から新しい配列を作る
        const index = problems.findIndex(p => p.id === problemId);
        let next: Problem[];

        if (index >= 0) {
            // 既存問題を更新
            next = problems.map((p, i) => (i === index ? updater(p) : p));
        } else {
            // 新規作成
            next = [...problems, updater(createProblem())];
        }

        // state を更新
        setProblems(next);

        // 永続化
        await repository.save(next);
    };


    const toggleStar = async (problemId: string) => {
        await update(problemId, (p) => ({ ...p, starred: !(p?.starred ?? false) }));
    };

    const removeMany = async (ids: string[]) => {
        if (!ids || ids.length === 0) return;

        // まず最新の state から新しい配列を作る
        const next = problems.filter(p => !ids.includes(p.id));

        // state を更新
        setProblems(next);

        // 永続化
        await repository.save(next);
    };

    const removeAll = async () => {
        setProblems([]);
        await repository.save([]);
    };

    return {
        problems,
        reload,
        addProblem,
        replaceAll,
        update,
        toggleStar,
        removeMany,
        removeAll,
    };
}
