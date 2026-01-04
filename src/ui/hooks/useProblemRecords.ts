import { useState, useEffect } from 'react';

import type { Problem, ProgramRecord } from'@/domain/problem/types/Problem'
import type { ProblemRepository } from '@/domain/problem/problemRepository';

export function useProblemRecords (repository: ProblemRepository){
    const [records, setRecords] = useState<ProgramRecord>({})

    useEffect(() => {
        repository.load().
            then(setRecords).
            catch(() => setRecords({}))
    }, []);

const addProblem = (newProblem: Problem) => {
    setRecords(prev => {
        const updated = { ...prev, [newProblem.id]: newProblem };
        repository.save(updated);  // ← prev ではなく updated を保存
        return updated;
    });
}
      
    const removeAll = () => {
        setRecords({})
        repository.save({})
    }

    return {
        records,
        addProblem, 
        removeAll,
    }
}