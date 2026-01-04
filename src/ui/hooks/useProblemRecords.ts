import { useState, useEffect } from 'react';

import type { Problem, ProgramRecord } from'@/domain/problem/types/Problem'
import type { ProblemRepository } from '@/domain/problem/problemRepository';

export function useProblemRecords (repository: ProblemRepository){
    const [collection, setCollection] = useState<ProgramRecord>({})

    useEffect(() => {
        repository.load().
            then(setCollection).
            catch(() => setCollection({}))
    }, []);

const addProblem = (newProblem: Problem) => {
    setCollection(prev => {
        const updated = { ...prev, [newProblem.id]: newProblem };
        repository.save(updated);  // ← prev ではなく updated を保存
        return updated;
    });
}
      
    const removeAll = () => {
        setCollection({})
        repository.save({})
    }

    return {
        collection,
        addProblem, 
        removeAll,
    }
}