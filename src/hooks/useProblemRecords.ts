// UI hook

import { useState, useEffect } from 'react';

import type { Problem} from'@/domain/problem/types/Problem'
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import type { ProblemRepository } from '@/domain/problem/problemRepository';

export function useProblemRecords (repository: ProblemRepository){
    const [records, setRecords] = useState<ProblemRecord>({})

    useEffect(() => {
        repository.load().
            then(setRecords).
            catch(() => setRecords({}))
    }, []);

    /*
    const addProblem = (newProblem: Problem) => {
        setRecords(prev => {
            const updated = { ...prev, [newProblem.id]: newProblem };
            repository.save(updated);  // ← prev ではなく updated を保存
            return updated;
        });
    }*/
    const replaceAll = (problemRecords: ProblemRecord) => {
        setRecords(problemRecords)
        repository.save(problemRecords)
    }

    const removeMany = (problems: Problem[]) => {
        const removeIds = new Set(problems.map(p => p.id));

        setRecords(prev => {
            const next = Object.entries(prev).reduce<Record<string, Problem>>(
                (acc, [id, problem]) => {
                    if (!removeIds.has(id)) acc[id] = problem;
                    return acc;
                },
                {}
            );

            repository.save(next);
            return next;
        });
    };

    
    const removeAll = () => {
        setRecords({})
        repository.save({})
    }

    return {
        records,
        problemRecords: records,
        //getAll: records,
        replaceAll,
        //setRecords,
        //addProblem, 
        removeAll,
        removeMany,

        //repository,
    }
}