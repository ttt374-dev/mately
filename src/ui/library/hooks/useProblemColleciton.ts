import { useState, useEffect } from 'react';

import type { Problem, Collection } from'@/domain/problem/types/Problem'
import type { ProblemRepository } from '@/domain/problem/problemRepository';

export function useProblemCollection (repository: ProblemRepository){
    const [collection, setCollection] = useState<Collection>({})

    useEffect(() => {
        repository.load().
            then(setCollection).
            catch(() => setCollection({}))
    }, []);
    
    const addProblem = (newProblem: Problem) => {
        setCollection(prev => ({...prev, [newProblem.id]: newProblem}))
        repository.save(collection)
    }        

    return {
        collection,
        addProblem, 
    }
}