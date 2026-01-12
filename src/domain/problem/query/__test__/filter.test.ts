import { describe, it, expect } from 'vitest'

import { DefaultFilterState, type FilterState, type SortState } from '../types';
import { applySort } from '../applySort';
import { applyFilter } from '../applyFilter';
import { IntervalDays, LearningEntry, ReviewedAt } from '@/domain/learning/types';
import { Problem } from '../../Problem';
import { Exercise } from '@/domain/Exercise/Exercise';

describe("filter test", () => {   

    it("unanswered", () => {
        const p1 = Problem.create({ id: "001"})
        const p2 = Problem.create({ id: "002"})
        const p3 = Problem.create({ id: "003"})

        const l1 = LearningEntry.create("001", { solvedCount: 1})
        const l2 = LearningEntry.create("002", { solvedCount: 0})

        const exercises = [new Exercise(p1, l1), new Exercise(p2, l2), Exercise.create(p3)]
        
        const filter: FilterState = {...DefaultFilterState, unansweredOnly: true}
        const r = applyFilter(exercises, filter)
        expect(r.map(p=>p.problem.id)).toEqual([p2.id, p3.id])
    })    

    it("ismissiontarget", () => {
        const p1 = Problem.create({ id: "001"})
        const p2 = Problem.create({ id: "002"})
        const p3 = Problem.create({ id: "003"})        

        const now = Date.now()
        const l1 = LearningEntry.create("001", { nextReviewedAt: ReviewedAt.fromNow(now, IntervalDays.of(1))})
        const l2 = LearningEntry.create("002", { nextReviewedAt: ReviewedAt.fromNow(now, IntervalDays.of(0))})
        const exercises = [new Exercise(p1, l1), new Exercise(p2, l2), Exercise.create(p3)]

        const filter: FilterState = {...DefaultFilterState, isMissionTarget: true}
        const r = applyFilter(exercises, filter)
        expect(r.map(p=>p.problem.id)).toEqual([p2.id, p3.id])
    })    

})