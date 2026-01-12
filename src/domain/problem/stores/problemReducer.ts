import { Problem } from "../Problem";

// -------------------------
// state / action 定義

// -------------------------
type State = Problem[];

type Action =
    | { type: "SET_ALL"; payload: Problem[] }
    | { type: "ADD"; payload: Problem }
    | { type: "UPDATE"; payload: { id: string; updater: (p: Problem) => Problem } }
    | { type: "REMOVE_MANY"; payload: string[] }
    | { type: "REMOVE_ALL" };

// -------------------------
// reducer
// -------------------------
export function problemReducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_ALL":
            return action.payload;

        case "ADD":
            return [...state, action.payload];

        case "UPDATE":
            const index = state.findIndex(p => p.id === action.payload.id);
            if (index >= 0) {
                return state.map((p, i) => (i === index ? action.payload.updater(p) : p));
            } else {
                // 新規作成
                return [...state, action.payload.updater(Problem.create())];
            }

        case "REMOVE_MANY":
            return state.filter(p => !action.payload.includes(p.id));

        case "REMOVE_ALL":
            return [];

        default:
            return state;
    }
}