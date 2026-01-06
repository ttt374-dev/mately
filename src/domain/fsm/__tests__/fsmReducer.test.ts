
import { describe, expect, it } from 'vitest'
import { fsmReducer, initialState } from '../fsmReducer'
import type { FsmState, FsmAction, QueueItem } from '../types'

describe("fsm reducer", () => {
    it('SOLVE updates results', () => {
        const queue: QueueItem[] = [{ problemId: "001" }, { problemId: "002" }]
        const initial: FsmState = { currentIndex: 0, queue: queue, phase: "problem", isFinished: false, plyIndex: 0, results: [] }
        let state = initial
        expect(state.phase).toEqual("problem")

        state = fsmReducer(state, { type: "ADVANCE_PHASE" })
        expect(state.phase).toEqual("solution")

        //state = fsmReducer(state, { type: "ADVANCE_PLY"})
        //expect(state.plyIndex).toEqual(1)

        state = fsmReducer(state, { type: "SOLVE" })
        expect(state.results).toEqual([
            {
                "answerResult": "solved",
                "problemId": "001",
            },
        ])

        state = fsmReducer(state, { type: "NEXT"})
        expect(state.currentIndex).toEqual(1)
        expect(state.phase).toEqual("problem")
        expect(state.plyIndex).toEqual(0)

        // finish
        state = fsmReducer(state, { type: "NEXT"})
        expect(state.isFinished).toEqual(true)        

    })

})
