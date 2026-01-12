import { useReducer, useEffect, useRef } from "react";
import type { Problem } from "@/domain/problem/Problem";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { problemReducer } from "@/domain/problem/stores/problemReducer";

// -------------------------
// hook
// -------------------------
export function useProblemStore(repository: ProblemRepository) {
    const [problems, dispatch] = useReducer(problemReducer, [] as Problem[]);
    const isInitialized = useRef(false);

    useEffect(() => {
        reload().catch(() => reset())
    }, [])

    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            return;
        }
        repository.save(problems)
    }, [problems])

    // -------------------------
    // 非同期対応メソッド
    // -------------------------

    const reload = async () => {
        try {
            const data = await repository.load();
            dispatch({ type: "SET_ALL", payload: data });
        } catch {
            reset()
        }
    };
    const reset = async () => {
        dispatch({ type: "SET_ALL", payload: [] });
    }
    const addProblem = async (newProblem: Problem) => {
        dispatch({ type: "ADD", payload: newProblem });
        await repository.save([...problems, newProblem]);
    };

    const replaceAll = async (newProblems: Problem[]) => {
        dispatch({ type: "SET_ALL", payload: newProblems });
        await repository.save(newProblems);
    };

    const update = async (problemId: string, updater: (p: Problem) => Problem) => {
        // updater は Problem インスタンスのメソッドを呼ぶ形にする
        dispatch({ type: "UPDATE", payload: { id: problemId, updater } });

        const next = problems.map(p => {
            if (p.id === problemId) {
                updater(p); // Problem クラスのメソッドで更新
            }
            return p;
        });

        await repository.save(next);
    };

    const updateTitle = async (problemId: string, title: string) => {
        await update(problemId, p => p.setTitle(title)); // ProblemクラスにsetTitleを用意
    };

    const toggleStar = async (problemId: string) => {
        await update(problemId, p => p.toggleStar()); // ProblemクラスにtoggleStarメソッド
    };

    const removeMany = async (ids: string[]) => {
        if (!ids || ids.length === 0) return;
        dispatch({ type: "REMOVE_MANY", payload: ids });
        await repository.save(problems.filter(p => !ids.includes(p.id)));
    };

    const removeAll = async () => {
        dispatch({ type: "REMOVE_ALL" });
        await repository.save([]);
    };



    return {
        problems,
        reload,
        addProblem,
        replaceAll,
        update,
        updateTitle,
        toggleStar,
        removeMany,
        removeAll,
    };
}
