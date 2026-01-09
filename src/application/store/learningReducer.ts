import type { LearningEntry, LearningRecord } from "@/domain/learning/types";

type Action =
    | { type: 'SET_ALL'; payload: LearningRecord }
    | { type: 'UPDATE'; problemId: string; updater: (r: LearningEntry) => LearningEntry }
    | { type: 'REMOVE_MANY'; problemIds: string[] }
    | { type: 'CLEAR_ALL' };

export function learningReducer(state: LearningRecord, action: Action): LearningRecord {
    switch (action.type) {
        case 'SET_ALL':
            return action.payload;
        case 'UPDATE': {
            const current = state[action.problemId] ?? {
                problemId: action.problemId,
                solvedCount: 0,
                failedCount: 0,
                intervalDays: 0,
                nextReviewedAt: 0,
                easeFactor: 0,
            };
            return {
                ...state,
                [action.problemId]: action.updater(current),
            };
        }
        case 'REMOVE_MANY': {
            const next = { ...state };
            let changed = false;
            for (const id of action.problemIds) {
                if (id in next) {
                    delete next[id];
                    changed = true;
                }
            }
            return changed ? next : state;
        }
        case 'CLEAR_ALL':
            return {};
        default:
            return state;
    }
}