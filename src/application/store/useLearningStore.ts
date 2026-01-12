/*
import { useState, useEffect, useReducer, useRef } from 'react';

import type { LearningRepository } from '@/domain/learning/LearningRepository';
import type { LearningEntry, LearningRecord } from '@/domain/learning/types/LearningEntry';
import type { AnswerResult } from '@/domain/learning/types';
//import { judgeAnswerQuality, scheduleNext } from '@/domain/learning/scheduleNext';
import { learningReducer } from '@/domain/learning/learningReducer';

////////////////////////////////////
export function useLearningStore (repository: LearningRepository){
    const [records, dispatch] = useReducer(learningReducer, {});
    const isInitialized = useRef(false);

    useEffect(() => {
        reload().catch(() => reset())
    }, [])

    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            return;
        }
        repository.save(records)
    }, [records])



     //const update = async (problemId: string, updater: (r: LearningEntry) => LearningEntry) => {
     //   dispatch({ type: 'UPDATE', problemId, updater });
     //   await repository.save(records); // 注意: 非同期更新の競合には要検討
    //};
    const reload = async () => {
        try {
            const data = await repository.load()
            dispatch({ type: 'SET_ALL', payload: data });
        } catch {
            reset()
        }
    }
    const reset = () => {
        dispatch({ type: 'SET_ALL', payload: {} });
    }
    const markAnswer = (problemId: string, answerResult: AnswerResult, secondsToAnswer?: number) => {
        dispatch({ type: 'ANSWER', 
            problemId, answerResult, secondsToAnswer, now: Date.now()
        })
        //await repository.save(records);

    };

    const removeMany = (problemIds: string[]) => {
        if (problemIds.length === 0) return;
        dispatch({ type: 'REMOVE_MANY', problemIds });
    };


    const replaceAll = (newRecords: LearningRecord) => {
        dispatch({ type: 'SET_ALL', payload: newRecords });
    };

    const clearAll = () => {
        dispatch({ type: 'CLEAR_ALL' });
    };


    return {
        records,
        learningRecords: records,        
        reload, removeMany,
        
        markAnswer, clearAll,
        markSolved: (id: string, secondsToAnswer?: number) => markAnswer(id, "solved", secondsToAnswer),
        markFailed: (id: string, secondsToAnswer?: number) => markAnswer(id, "failed", secondsToAnswer),
        replaceAll,
    }
}*/