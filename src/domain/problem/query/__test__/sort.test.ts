import { describe, it, expect } from 'vitest'

import { InMemoryProblemRepository } from "@/infra/Repository/problem/InMemoryProblemRepository";
import { InMemoryLearningRepository } from "@/infra/Repository/learning/InMemoryLearningRepository";

import { createLearningEntry } from '@/domain/learning/factory/createLearningEntry';
import { createProblem } from '../../factory';
import { applySort } from '../applySort';
import type { SortState } from '../types';

describe("filter test", async () => {
    const p1 = createProblem({ id: "001", title: "ccc", 
        createdAt: Date.now(),
        starred: true})
    const p2 = createProblem({ id: "002", title: "aaa", 
        createdAt: Date.now() -  24*60*60 * 3,
        starred: false})
    const p3 = createProblem({ id: "003", title: "bbb", 
        createdAt: Date.now() -  24*60*60 * 1,
        starred: false})
    
    const problemRepo = new InMemoryProblemRepository([p1, p2, p3])

    const learning1 = createLearningEntry(p1.id, {
        solvedCount: 1,
        nextReviewedAt: Date.now() - 24*60*60
    })
    const learning2 = createLearningEntry(p2.id, {
        nextReviewedAt: Date.now() + 24*60*60
    })
    const learningRepo = new InMemoryLearningRepository({
        [p1.id]: learning1,
        [p2.id]: learning2,
    }
    )
    const problems = await problemRepo.load()
    const learningRecords = await learningRepo.load()

    ////////////
    it("title", async () => {        
        const sortState: SortState = {
            key: "title", order: "asc"
        }
        const sorted = applySort(problems, sortState, learningRecords)        
        expect(sorted.map(p => p.id)).toEqual([p2.id, p3.id, p1.id])
    })

    it("createdAt", async () => {        
        const sortState: SortState = {
            key: "createdAt", order: "asc"
        }
        const sorted = applySort(problems, sortState, learningRecords)        
        expect(sorted.map(p => p.id)).toEqual([p2.id, p3.id, p1.id])
    })

    
  
})