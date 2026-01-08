import { createLearningRepository } from '@/domain/learning/LearningRepository'
import { createProblemRepository } from '@/domain/problem/problemRepository'
import { describe, it, expect } from 'vitest'
import { createDeleteProblemUsecase } from './deleteProblemUsecase'
import { createProblem } from '@/domain/problem/factory'



////////////////////////////
describe("delete problem usecase", () => {
    const problemRepo = createProblemRepository()
    const learningRepo = createLearningRepository()
    const usecase = createDeleteProblemUsecase(problemRepo, learningRepo)
    it("delete", () => {
        const p1 = createProblem({title: "foo"})
        const p2 = createProblem({title: "bar"})
        problemRepo.save([p1, p2])
        usecase.execute(p1.id)


        
    })
})