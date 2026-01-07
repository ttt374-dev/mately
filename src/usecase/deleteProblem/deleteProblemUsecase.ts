import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { ProblemRepository } from "@/domain/problem/problemRepository"

export interface DeleteProblemUsecase {
  execute(problemId: string): Promise<void>
}

export const createDeleteProblemUsecase = (
  problemRepo: ProblemRepository,
  learningRepo: LearningRepository
): DeleteProblemUsecase => {
  return {
    async execute(problemId: string) {
      // ① 問題を削除
      await problemRepo.remove(problemId)

      // ② 紐づく学習履歴を削除
      await learningRepo.deleteByProblemId(problemId)
    }
  }
}
