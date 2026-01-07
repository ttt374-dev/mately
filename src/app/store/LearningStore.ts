import { useState, useEffect } from 'react';

import type { LearningRepository } from '@/domain/learning/LearningRepository';
import type { LearningEntry, LearningRecord } from '@/domain/learning/types/LearningEntry';
import type { AnswerResult } from '@/domain/learning/types';
import { judgeAnswerQuality, scheduleNext } from '@/domain/learning/scheduleNext';

export function createLearningStore (repository: LearningRepository){
    const [records, setRecords] = useState<LearningRecord>({})

    useEffect(() => {
        reload().catch(() => setRecords({}))
    }, []);

    const reload = async () => {
        try {
            const data = await repository.load()
            setRecords(data)
        } catch {
            setRecords({})
        }
    }

    const update = (problemId: string, updater: (r: LearningEntry) => LearningEntry) => {        
        //console.log("update", entryId, updater)
        setRecords(prev => {
            const current = prev[problemId] ?? {
                problemId: problemId,
                solvedCount: 0,
                failedCount: 0,
                intervalDays: 0,
                nextReviewedAt: 0,
                easeFactor: 0,
            };
            return {
                ...prev,
                [problemId]: updater(current),
            };
        });
        //persist()
        repository.save(records)
    };
    const markAnswer = (problemId: string, answer: AnswerResult, secondsToAnswer?: number) =>{
        const addSolved = answer === "solved" ? 1 : 0
        const addFailed = answer === "failed" ? 1 : 0

        const answerQuality = judgeAnswerQuality(answer, secondsToAnswer ?? 20) // TODO: sec

        update(problemId, r => ({
            //...r,
            ...scheduleNext(r, answerQuality, Date.now()),
            solvedCount: r.solvedCount+addSolved,
            failedCount: r.failedCount+addFailed,
            lastAnsweredAt: Date.now()
        }))
    } 
    /*
    const toggleStar = (problemId: string) =>{
        //console.log("toggleStar in hook", )
        update(problemId, r => ({
            ...r,
            starred: !(r?.starred ?? false),
        }))
    }*/
    const replaceAll = (records: LearningRecord) => {
        repository.save(records)
        setRecords(records)
    }
    const clearAll = () => {
        console.log("learning daata cleared")
        repository.save({})
        setRecords({})
    }

    return {
        records,
        learningRecords: records,
        setLearningRecords: setRecords,
        reload,
        
        markAnswer, clearAll,
        markSolved: (id: string, secondsToAnswer?: number) => markAnswer(id, "solved", secondsToAnswer),
        markFailed: (id: string, secondsToAnswer?: number) => markAnswer(id, "failed", secondsToAnswer),
        //toggleStar,
        replaceAll,
    }
}