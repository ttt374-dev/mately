import { describe, it, expect } from 'vitest'

import { createProblem } from '../../factory';
import { createLearningEntry } from '@/domain/learning/factory/createLearningEntry';
import { DefaultFilterState, type FilterState, type SortState } from '../types';
import { applySort } from '../applySort';
import { applyFilter } from '../applyFilter';

describe("filter test", () => {   

    it("unanswered", () => {
        const p1 = createProblem({ id: "001"})
        const p2 = createProblem({ id: "002"})
        const p3 = createProblem({ id: "003"})
        const problems = [p1, p2, p3]

        const l1 = createLearningEntry("001", { solvedCount: 1})
        const l2 = createLearningEntry("002", { solvedCount: 0})
        const records = {
            [l1.problemId]: l1,
            [l2.problemId]: l2,
        }
        
        const filter: FilterState = {...DefaultFilterState, unansweredOnly: true}
        const r = applyFilter(problems, filter, records)
        expect(r.map(p=>p.id)).toEqual([p2.id, p3.id])
    })    

    it("ismissiontarget", () => {
        const p1 = createProblem({ id: "001"})
        const p2 = createProblem({ id: "002"})
        const p3 = createProblem({ id: "003"})
        const problems = [p1, p2, p3]

        const now = Date.now()
        const l1 = createLearningEntry("001", { nextReviewedAt: now + 3600})
        const l2 = createLearningEntry("002", { nextReviewedAt: now - 3600})
        const records = {
            [l1.problemId]: l1,
            [l2.problemId]: l2,
        }
        
        const filter: FilterState = {...DefaultFilterState, isMissionTarget: true}
        const r = applyFilter(problems, filter, records)
        expect(r.map(p=>p.id)).toEqual([p2.id, p3.id])
    })    
})