import { describe, it, expect } from 'vitest'
import { createKifContent } from '@/domain/kif/factory'
import {  matchMateLength } from '../mateFilter'
import { DefaultFilterState, type FilterState, type MateLengthFilter } from '../types'
import { applyFilter } from '../applyFilter'
import { Problem } from '../../Problem'
import type { Exercise } from '@/domain/Exercise/Exercise'

describe("mate filter test", () => {
    const p3 = Problem.create({ id: "003", kifContent: createKifContent({ mateLength: 3 }) })
    const p5 = Problem.create({ id: "005", kifContent: createKifContent({ mateLength: 5 }) })
    const p7 = Problem.create({ id: "007", kifContent: createKifContent({ mateLength: 7 }) })
    const p9 = Problem.create({ id: "009", kifContent: createKifContent({ mateLength: 9 }) })
    const p11 = Problem.create({ id: "011", kifContent: createKifContent({ mateLength: 11 }) })

    const problems = [p3, p5, p7, p9, p11]
    const exercises: Exercise[] = problems.map(p=>({problem: p}))

    it("mate length", ()=>{
        const filter: MateLengthFilter = { length: 3, mode: "eq"}
        const r = matchMateLength(p3.kifContent, filter)
        expect(r).toBeTruthy

        const m3filter: FilterState = {
            ...DefaultFilterState,
            mateLength: filter,
        }
        const m3only = applyFilter(exercises, m3filter)
        expect(m3only.map(r=>r.problem.id)).toEqual([p3.id])

        /// eq 3
        const gte5filter: FilterState = { 
            ...DefaultFilterState,
            mateLength: { length: 5, mode: "gte"}
        }
        const gte5 = applyFilter(exercises, gte5filter)
        expect(gte5.map(r=>r.problem.id)).toEqual([p5.id, p7.id, p9.id, p11.id])
        
        /// gte 5
        const lte5filter: FilterState = { 
            ...DefaultFilterState,
            mateLength: { length: 5, mode: "lte"}
        }
        const lte5 = applyFilter(exercises, lte5filter)
        expect(lte5.map(r=>r.problem.id)).toEqual([p3.id, p5.id])
    })

    it("mate bucket", ()=>{
        const lte3filter: FilterState = {
            ...DefaultFilterState,
            mateBuckets: ["lte3"]
        }
        const lte3 = applyFilter(exercises, lte3filter)
        expect(lte3.map(r=>r.problem.id)).toEqual([p3.id])

        const eq5filter: FilterState = {
            ...DefaultFilterState,
            mateBuckets: ["eq5", "eq7"]
        }
        const eq5 = applyFilter(exercises, eq5filter)
        expect(eq5.map(r=>r.problem.id)).toEqual([p5.id, p7.id])

        const gte9filter: FilterState = {
            ...DefaultFilterState,
            mateBuckets: ["gte9"]
        }
        const gte9 = applyFilter(exercises, gte9filter)
        expect(gte9.map(r=>r.problem.id)).toEqual([p9.id, p11.id])


    })
})