import { describe, it, expect } from 'vitest'
import { InMemoryProblemRepository } from "@/infra/Repository/problem/InMemoryProblemRepository";
import { InMemoryLearningRepository } from "@/infra/Repository/learning/InMemoryLearningRepository";
import { createProblem } from '../../factory';
import type { LearningEntry } from '@/domain/learning/types';
import { createLearningEntry } from '@/domain/learning/factory/createLearningEntry';
import { DefaultFilterState, type FilterState } from '../types';
import { startOfDay } from 'date-fns';
import { applyFilter } from '../applyFilter';

describe("filter test", async () => {
    const p1 = createProblem({ id: "001", title: "foo", starred: true})
    const p2 = createProblem({ id: "002", title: "bar", starred: false})
    const p3 = createProblem({ id: "003", title: "baz", starred: false})
    
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

    it("starred", async () => {        
        const filter: FilterState = {
            ...DefaultFilterState,
            starredOnly: true,
        }
        const filtered = applyFilter(problems, filter, learningRecords)
        expect(filtered.map(p => p.id)).toEqual([p1.id])
    })

    it("unanswered only", () => {
        const filter = {
            ...DefaultFilterState,
            unansweredOnly: true,
        }
        const filtered = applyFilter(problems, filter, learningRecords)
        expect(filtered.map(p => p.id)).toEqual([p2.id, p3.id])
    })
    it("text match", () => {
        const filter = {
            ...DefaultFilterState,
            text: "foo",
        }
        const filtered = applyFilter(problems, filter, learningRecords)
        expect(filtered.map(p => p.id)).toEqual([p1.id])
    })
     it("next due", () => {
        const filter = {
            ...DefaultFilterState,            
        }
        const filtered = applyFilter(problems, filter, learningRecords)
        expect(filtered.map(p => p.id)).toEqual([p1.id, p3.id])
    })
  
})