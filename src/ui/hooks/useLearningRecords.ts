import { useState, useEffect } from 'react';

import type { LearningRepository } from '@/domain/learning/LearningRepository';
import type { LearningEntry, LearningRecord } from '@/domain/learning/types/LearningEntry';
import type { AnswerResult } from '@/domain/learning/types';
import { judgeAnswerQuality, scheduleNext } from '@/domain/learning/scheduleNext';


export function useLearningRecords (repository: LearningRepository){
    const [learningRecords, setLearningRecords] = useState<LearningRecord>({})

    useEffect(() => {
        repository.load().
            then(setLearningRecords).
            catch(() => setLearningRecords({}))
    }, []);

    const update = (problemId: string, updater: (r: LearningEntry) => LearningEntry) => {        
        //console.log("update", entryId, updater)
        setLearningRecords(prev => {
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
        repository.save(learningRecords)
    };
    const markAnswer = (problemId: string, answer: AnswerResult) =>{
        const addSolved = answer === "solved" ? 1 : 0
        const addFailed = answer === "failed" ? 1 : 0

        const answerQuality = judgeAnswerQuality(answer, 20) // TODO: sec

        update(problemId, r => ({
            //...r,
            ...scheduleNext(r, answerQuality, Date.now()),
            solvedCount: r.solvedCount+addSolved,
            failedCount: r.failedCount+addFailed,
            lastAnsweredAt: Date.now()
        }))
    } 
    const toggleStar = (problemId: string) =>{
        //console.log("toggleStar in hook", )
        update(problemId, r => ({
            ...r,
            starred: !(r?.starred ?? false),
        }))
    }
    const clearAll = () => {
        repository.save({})
        setLearningRecords({})
    }

    return {
        learningRecords,
        markAnswer, clearAll,
        toggleStar,
    }
}