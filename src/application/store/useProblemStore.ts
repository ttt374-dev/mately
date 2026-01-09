import { useReducer, useEffect } from "react";
import type { Problem } from "@/domain/problem/types/Problem";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { createProblem } from "@/domain/problem/factory";

// -------------------------
// state / action 定義
// -------------------------
type State = Problem[];

type Action =
  | { type: "SET"; payload: Problem[] }
  | { type: "ADD"; payload: Problem }
  | { type: "UPDATE"; payload: { id: string; updater: (p: Problem) => Problem } }
  | { type: "REMOVE_MANY"; payload: string[] }
  | { type: "REMOVE_ALL" };

// -------------------------
// reducer
// -------------------------
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "UPDATE":
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        return state.map((p, i) => (i === index ? action.payload.updater(p) : p));
      } else {
        // 新規作成
        return [...state, action.payload.updater(createProblem())];
      }

    case "REMOVE_MANY":
      return state.filter(p => !action.payload.includes(p.id));

    case "REMOVE_ALL":
      return [];

    default:
      return state;
  }
}

// -------------------------
// hook
// -------------------------
export function useProblemStore(repository: ProblemRepository) {
  const [problems, dispatch] = useReducer(reducer, []);

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
