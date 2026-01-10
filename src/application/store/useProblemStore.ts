import { useReducer, useEffect } from "react";
import type { Problem } from "@/domain/problem/types/Problem";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { problemReducer } from "@/domain/problem/stores/problemReducer";

// -------------------------
// hook
// -------------------------
export function useProblemStore(repository: ProblemRepository) {
  const [problems, dispatch] = useReducer(problemReducer, []);

  // 初期ロード
  useEffect(() => {
    (async () => {
      try {
        const data = await repository.load();
        dispatch({ type: "SET", payload: data });
        console.log("problems reload", data);
      } catch {
        dispatch({ type: "SET", payload: [] });
      }
    })();
  }, []);

  // -------------------------
  // 非同期対応メソッド
  // -------------------------
  const addProblem = async (newProblem: Problem) => {
    dispatch({ type: "ADD", payload: newProblem });
    await repository.save([...problems, newProblem]);
  };

  const replaceAll = async (newProblems: Problem[]) => {
    dispatch({ type: "SET", payload: newProblems });
    await repository.save(newProblems);
  };

  const update = async (problemId: string, updater: (p: Problem) => Problem) => {
    dispatch({ type: "UPDATE", payload: { id: problemId, updater } });
    const next = problems.map(p =>
      p.id === problemId ? updater(p) : p
    );
    await repository.save(next);
  };

  const updateTitle = async (problemId: string, title: string) => {
    await update(problemId, p => ({ ...p, title }));
  };

  const toggleStar = async (problemId: string) => {
    await update(problemId, p => ({ ...p, starred: !(p?.starred ?? false) }));
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

  const reload = async () => {
    try {
      const data = await repository.load();
      dispatch({ type: "SET", payload: data });
    } catch {
      dispatch({ type: "SET", payload: [] });
    }
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
