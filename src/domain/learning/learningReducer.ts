/*
import { LearningEntry, type AnswerResult, type LearningRecord } from "./types";


type Action =
    | { type: 'SET_ALL'; payload: LearningRecord }
    | { type: 'ANSWER'; problemId: string, answerResult: AnswerResult, 
            secondsToAnswer?: number, now: number}
    //| { type: 'UPDATE'; problemId: string; updater: (r: LearningEntry) => LearningEntry }
    | { type: 'REMOVE_MANY'; problemIds: string[] }
    | { type: 'CLEAR_ALL' };

export function learningReducer(state: LearningRecord, action: Action): LearningRecord {
    switch (action.type) {
        case 'SET_ALL':
            return action.payload;
        case 'ANSWER': {
            const current = state[action.problemId] ?? LearningEntry.create(action.problemId);
            
            const updated = current.answer(
                action.answerResult, 
                action.secondsToAnswer,
                action.now
            );

            return {...state, [action.problemId]: updated,};
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
*/