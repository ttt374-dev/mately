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
  problem: ProblemRecord // export 形式
  learning: LearningRecord  
}

export function createBackupRestoreUsecase(
  problem: {
    records: ProblemRecord,
    replaceAll: (problemRecords: ProblemRecord) => void,
  },
  learning: {
    records: LearningRecord,
    replaceAll: (LearningRecord: LearningRecord) => void,  
  }
  ,
  writer: BackupWriter,
): BackupRestoreUsecase {

  // TODO: error check
  return {
    async backup() {    
      const backupData = {
        problem: problem.records,
        learning: learning.records,
      }
      const json = JSON.stringify(backupData, null, 2)
      await writer.write(json, "backup-filename.json")
    },

    async restore(data: BackupData) {
      problem.replaceAll(data.problem)
      learning.replaceAll(data.learning)
    }
  }
}

export interface BackupWriter {
  write(data: string, fileName: string): Promise<void>
  //revoke?(fileUrl: string): void
}
