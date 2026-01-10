import { useState, useEffect, useReducer } from 'react';

import type { LearningRepository } from '@/domain/learning/LearningRepository';
import type { LearningEntry, LearningRecord } from '@/domain/learning/types/LearningEntry';
import type { AnswerResult } from '@/domain/learning/types';
import { judgeAnswerQuality, scheduleNext } from '@/domain/learning/scheduleNext';
import { learningReducer } from '@/domain/learning/stores/learningReducer';

////////////////////////////////////
export function useLearningStore (repository: LearningRepository){
    //const [records, setRecords] = useState<LearningRecord>({})
    const [records, dispatch] = useReducer(learningReducer, {});

    useEffect(() => {
        reload().catch(() => reset())
    }, []);

    const reload = async () => {
        try {
            const data = await repository.load()
            dispatch({ type: 'SET_ALL', payload: data });
        } catch {
            reset()
        }
    }
    const reset = async () => {
        dispatch({ type: 'SET_ALL', payload: {} });
    }

     const update = async (problemId: string, updater: (r: LearningEntry) => LearningEntry) => {
        dispatch({ type: 'UPDATE', problemId, updater });
        await repository.save(records); // 注意: 非同期更新の競合には要検討
    };

    const markAnswer = (problemId: string, answer: AnswerResult, secondsToAnswer?: number) => {
        const addSolved = answer === 'solved' ? 1 : 0;
        const addFailed = answer === 'failed' ? 1 : 0;
        const answerQuality = judgeAnswerQuality(answer, secondsToAnswer ?? 20);

        update(problemId, r => ({
            ...scheduleNext(r, answerQuality, Date.now()),
            solvedCount: r.solvedCount + addSolved,
            failedCount: r.failedCount + addFailed,
            lastAnsweredAt: Date.now(),
            lastResult: answer,
        }));
    };

    const removeMany = async (problemIds: string[]) => {
        if (problemIds.length === 0) return;
        const loadedRecords = await repository.load();
        dispatch({ type: 'REMOVE_MANY', problemIds });
        await repository.save(loadedRecords);
    };

    const replaceAll = async (newRecords: LearningRecord) => {
        dispatch({ type: 'SET_ALL', payload: newRecords });
        await repository.save(newRecords);
    };

    const clearAll = async () => {
        dispatch({ type: 'CLEAR_ALL' });
        await repository.save({});
    };


    return {
        records,
        learningRecords: records,
        //setLearningRecords: (r: LearningRecord) => dispatch({ type: 'SET_ALL', payload: r }),        
        
        
        reload, removeMany,
        
        markAnswer, clearAll,
        markSolved: (id: string, secondsToAnswer?: number) => markAnswer(id, "solved", secondsToAnswer),
        markFailed: (id: string, secondsToAnswer?: number) => markAnswer(id, "failed", secondsToAnswer),
        replaceAll,
    }
}