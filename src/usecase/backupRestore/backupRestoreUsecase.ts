// backupRestoreUsecase.ts

import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { LearningRecord } from "@/domain/learning/types"
import type { ProblemRepository } from "@/domain/problem/problemRepository"
import type { Problem } from "@/domain/problem/types/Problem"
import type { ProblemRecord } from "@/domain/problemCatalog/types"

export interface BackupRestoreUsecase {
  backup(): Promise<BackupRestoreResult> // TODO
  restore(data: BackupData): Promise<BackupRestoreResult>
}

export type BackupData = {
  problem: ProblemRecord // export 形式
  learning: LearningRecord  
}

export type BackupRestoreResult = {
  count: { problem: number, learning: number},
  filename?: string,
}

export function createBackupRestoreUsecase(
  problemRepo: ProblemRepository, 
  learningRepo: LearningRepository,  
  writer: BackupWriter,
): BackupRestoreUsecase {

  // TODO: error check
  return {
    async backup(): Promise<BackupRestoreResult> {         

      const backupData = {
        problem: await problemRepo.load(),
        learning: await learningRepo.load(),
      }
      const json = JSON.stringify(backupData, null, 2)
      const filename = `kif-backup-${Date.now()}.json`
      try {
        await writer.write(json, filename)
      } catch (e) {
        throw new Error(`Backup failed to save: ${filename}`)
      }

      return {
        count: {
          problem: Object.keys(backupData.problem).length, 
          learning: Object.keys(backupData.learning).length
        },
        filename: filename
      }
    },

    async restore(backupData: BackupData): Promise<BackupRestoreResult> {      
      if (!backupData.problem){
        throw new Error("Invalid Backup Data")
      }
      problemRepo.save(backupData.problem)
      learningRepo.save(backupData.learning)          

      return {
        count: {
          problem: Object.keys(backupData.problem).length,
          learning: Object.keys(backupData.learning).length
        },
      }
    }
  }
}

export interface BackupWriter {
  write(data: string, fileName: string): Promise<void>
  //revoke?(fileUrl: string): void
}
