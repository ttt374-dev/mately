import { useState, useEffect } from 'react';

import type { Problem, ProgramRecord } from'@/domain/problem/types/Problem'
import type { LearningRepository } from '@/domain/learning/LearningRepository';
import type { LearningEntry, LearningRecord } from '@/domain/learning/types/LearningEntry';

export function useLearningRecords (repository: LearningRepository){
    const [learningRecord, setLearningRecord] = useState<LearningRecord>({})

    useEffect(() => {
        repository.load().
            then(setLearningRecord).
            catch(() => setLearningRecord({}))
    }, []);

    const update = (problemId: string, updater: (r: LearningEntry) => LearningEntry) => {        
        //console.log("update", entryId, updater)
        setLearningRecord(prev => {
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
        repository.save(learningRecord)
    };
    const markSolved = (problemId: string) =>{
        update(problemId, r => ({
            ...r,
            solvedCount: r.solvedCount+1,
            lastAnsweredAt: Date.now()
        }))
    } 

    return {
        learningRecord,
        markSolved
    }
}