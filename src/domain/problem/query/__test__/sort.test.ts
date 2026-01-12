import { describe, it, expect } from 'vitest'

import { applySort } from '../applySort';
import type { SortState } from '../types';
import { LearningEntry } from '@/domain/learning/types';
import { Problem } from '../../Problem';
import type { Exercise } from '@/domain/Exercise/Exercise';


describe("sort test", () => {   

    it("title sort", () => {
        const p1 = Problem.create({ id: "001", title: "bbb" })
        const p2 = Problem.create({ id: "002", title: "ccc" })
        const p3 = Problem.create({ id: "003", title: "aaa" })
        const problems = [p1, p2, p3]
        const exercises: Exercise[] = problems.map(p => ({ problem: p}))

        const sortAsc: SortState = { key: "title", order: "asc"}
        let sorted = applySort(exercises, sortAsc)
        expect(sorted.map(p => p.problem.id)).toEqual([p3.id, p1.id, p2.id])

        const sortDesc: SortState = { key: "title", order: "desc"}
        sorted = applySort(exercises, sortDesc)
        expect(sorted.map(p => p.problem.id)).toEqual([p2.id, p1.id, p3.id])
    })    
  
    it("accuracy", () => {
        const p1 = Problem.create({ id: "001",  })
        const p2 = Problem.create({ id: "002", })
        const p3 = Problem.create({ id: "003",  })
        const problems = [p1, p2, p3]

        const l1 = LearningEntry.create("001",  { solvedCount:2, failedCount: 1})
        const l2 = LearningEntry.create("002", { solvedCount:2, failedCount: 0})
        const l3 = LearningEntry.create("003", { solvedCount:0, failedCount: 2})
        const learnings = [l1, l2, l3]
        
        //const exercises: Exercise[] = [0,1,2].map(i => { return { problem: problems[i], learning: learnings[i]}}) 
        const exercises: Exercise[] = [0,1,2].map(i => ({ problem: problems[i], learning: learnings[i]})) 

        const sort: SortState = { key: "accuracy", order: "asc"}
        const sorted = applySort(exercises, sort)
        expect(sorted.map(p=>p.problem.id)).toEqual([p3.id, p1.id, p2.id])
    })
})