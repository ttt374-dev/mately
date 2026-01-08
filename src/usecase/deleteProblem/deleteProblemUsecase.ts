import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { ProblemRepository } from "@/domain/problem/problemRepository"

export interface DeleteProblemUsecase {
  execute(problemId: string): Promise<void>
  executeMany(ids: string[]): Promise<void>
}

export const createDeleteProblemUsecase = (
  problemRepo: ProblemRepository,
  learningRepo: LearningRepository
): DeleteProblemUsecase => {

    const execute = async (problemId: string) => {
      // ① 問題を削除
      await problemRepo.remove(problemId)

      // ② 紐づく学習履歴を削除
      await learningRepo.remove(problemId)
    }

    const executeMany = async (ids: string[]) => {
        await problemRepo.removeMany(ids)
        //await learningRepo.deleteByProblemId()
    }

    return { execute, executeMany}
  
}
