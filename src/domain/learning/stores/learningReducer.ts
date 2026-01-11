import { createLearningEntry } from "../factory/createLearningEntry";
import { LearningEntry, type AnswerResult, type LearningRecord } from "../types";

export type AnswerQuality = 0 | 1 | 2 | 3
type Action =
    | { type: 'SET_ALL'; payload: LearningRecord }
    | { type: 'ANSWER'; problemId: string, result: AnswerResult, 
            secondsToAnswer?: number, now: number}
    | { type: 'UPDATE'; problemId: string; updater: (r: LearningEntry) => LearningEntry }
    | { type: 'REMOVE_MANY'; problemIds: string[] }
    | { type: 'CLEAR_ALL' };

export function judgeAnswerQuality(answer: AnswerResult, sec: number): AnswerQuality {
    if (answer === "failed") return 0
    if (sec < 10) return 3
    return 0
}

export function learningReducer(state: LearningRecord, action: Action): LearningRecord {
    switch (action.type) {
        case 'SET_ALL':
            return action.payload;
        case 'ANSWER': {
            const current =
                state[action.problemId] ??
                createLearningEntry(action.problemId, action.now);

            const quality = judgeAnswerQuality(
                action.result,
                action.secondsToAnswer ?? 20
            );

            const updated = current.answer(
                action.result,
                quality,
                action.now
            );

            return {
                ...state,
                [action.problemId]: updated,
            };
        }
        /*
        case 'UPDATE': {
            const current = state[action.problemId] ?? createLearningEntry(action.problemId)            
            return {
                ...state,
                [action.problemId]: action.updater(current),
            };
        }*/
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