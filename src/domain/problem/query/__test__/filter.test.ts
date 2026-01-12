import { describe, it, expect } from 'vitest'

import { DefaultFilterState, type FilterState, type SortState } from '../types';
import { applySort } from '../applySort';
import { applyFilter } from '../applyFilter';
import { IntervalDays, LearningEntry, ReviewedAt } from '@/domain/learning/types';
import { Problem } from '../../Problem';
import type { Exercise } from '@/domain/Exercise/Exercise';

describe("filter test", () => {   

    it("unanswered", () => {
        const p1 = Problem.create({ id: "001"})
        const p2 = Problem.create({ id: "002"})
        const p3 = Problem.create({ id: "003"})
        const problems = [p1, p2, p3]

        const l1 = LearningEntry.create("001", { solvedCount: 1})
        const l2 = LearningEntry.create("002", { solvedCount: 0})
        const learnings = [l1, l2, undefined]
        const exercises: Exercise[] = [0,1,2].map(i => ({ problem: problems[i], learning: learnings[i]})) 
        const filter: FilterState = {...DefaultFilterState, unansweredOnly: true}
        const r = applyFilter(exercises, filter)
        expect(r.map(p=>p.problem.id)).toEqual([p2.id, p3.id])
    })    
/*  TODO
    it("ismissiontarget", () => {
        const p1 = Problem.create({ id: "001"})
        const p2 = Problem.create({ id: "002"})
        const p3 = Problem.create({ id: "003"})
        const problems = [p1, p2, p3]

        const now = Date.now()
        const l1 = createLearningEntry("001", { nextReviewedAt: ReviewedAt.fromNow(IntervalDays.of(1))})
        const l2 = createLearningEntry("002", { nextReviewedAt: ReviewedAt.fromNow(IntervalDays.of(0))})
        const records = {
            [l1.problemId]: l1,
            [l2.problemId]: l2,
        }
        
        const filter: FilterState = {...DefaultFilterState, isMissionTarget: true}
        const r = applyFilter(problems, filter, records)
        expect(r.map(p=>p.id)).toEqual([p2.id, p3.id])
    })    
        */
})