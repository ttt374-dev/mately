import { describe, it, expect } from 'vitest'
import { createProblem } from '../../factory'
import { createKifContent } from '@/domain/kif/factory'
import {  matchMateLength } from '../mateFilter'
import { DefaultFilterState, type FilterState, type MateLengthFilter } from '../types'
import { applyFilter } from '../applyFilter'

describe("mate filter test", () => {
    const p3 = createProblem({ id: "003", kifContent: createKifContent({ mateLength: 3 }) })
    const p5 = createProblem({ id: "005", kifContent: createKifContent({ mateLength: 5 }) })
    const p7 = createProblem({ id: "007", kifContent: createKifContent({ mateLength: 7 }) })
    const p9 = createProblem({ id: "009", kifContent: createKifContent({ mateLength: 9 }) })
    const p11 = createProblem({ id: "011", kifContent: createKifContent({ mateLength: 11 }) })

    const problems = [p3, p5, p7, p9, p11]

    it("mate length", ()=>{
        const filter: MateLengthFilter = { length: 3, mode: "eq"}
        const r = matchMateLength(p3.kifContent, filter)
        expect(r).toBeTruthy

        const m3filter: FilterState = {
            ...DefaultFilterState,
            mateLength: filter,
        }
        const m3only = applyFilter(problems, m3filter)
        expect(m3only.map(r=>r.id)).toEqual([p3.id])

        /// eq 3
        const gte5filter: FilterState = { 
            ...DefaultFilterState,
            mateLength: { length: 5, mode: "gte"}
        }
        const gte5 = applyFilter(problems, gte5filter)
        expect(gte5.map(r=>r.id)).toEqual([p5.id, p7.id, p9.id, p11.id])
        
        /// gte 5
        const lte5filter: FilterState = { 
            ...DefaultFilterState,
            mateLength: { length: 5, mode: "lte"}
        }
        const lte5 = applyFilter(problems, lte5filter)
        expect(lte5.map(r=>r.id)).toEqual([p3.id, p5.id])
    })

    it("mate bucket", ()=>{
        const lte3filter: FilterState = {
            ...DefaultFilterState,
            mateBuckets: ["lte3"]
        }
        const lte3 = applyFilter(problems, lte3filter)
        expect(lte3.map(r=>r.id)).toEqual([p3.id])

        const eq5filter: FilterState = {
            ...DefaultFilterState,
            mateBuckets: ["eq5", "eq7"]
        }
        const eq5 = applyFilter(problems, eq5filter)
        expect(eq5.map(r=>r.id)).toEqual([p5.id, p7.id])

        const gte9filter: FilterState = {
            ...DefaultFilterState,
            mateBuckets: ["gte9"]
        }
        const gte9 = applyFilter(problems, gte9filter)
        expect(gte9.map(r=>r.id)).toEqual([p9.id, p11.id])


    })
})