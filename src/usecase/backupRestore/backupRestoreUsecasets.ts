// backupRestoreUsecase.ts

import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { LearningRecord } from "@/domain/learning/types"
import type { ProblemRepository } from "@/domain/problem/problemRepository"
import type { Problem } from "@/domain/problem/types/Problem"
import type { ProblemRecord } from "@/domain/problemCatalog/types"

export interface BackupRestoreUsecase {
  backup(): Promise<void> // TODO
  restore(data: BackupData): Promise<void>
}

export type BackupData = {
  problems: ProblemRecord // export 形式
  learningRecords: LearningRecord
  
}

export function createBackupRestoreUsecase(
  problemRepository: ProblemRepository,
  learningRepository: LearningRepository,
  setProblems: (problems: ProblemRecord) => void,
  setLearningRecords: (LearningRecords: LearningRecord) => void,
  writer: BackupWriter,
): BackupRestoreUsecase {

  // TODO: error check
  return {
    async backup() {    
      const backupData = {
        problems: await problemRepository.load(),
        learningRecords: await learningRepository.load()
      }
      const json = JSON.stringify(backupData, null, 2)
      await writer.write(json, "backup-filename.json")
    },

    async restore(data: BackupData) {
      await problemRepository.save(data.problems)
      setProblems(data.problems)

      await learningRepository.save(data.learningRecords)
      setLearningRecords(data.learningRecords)      
      
    }
  }
}

export interface BackupWriter {
  write(data: string, fileName: string): Promise<void>
  //revoke?(fileUrl: string): void
}
