// backupRestoreUsecase.ts

import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { LearningRecord } from "@/domain/learning/types"
import type { ProblemRepository } from "@/domain/problem/problemRepository"
import type { Problem } from "@/domain/problem/Problem"

export interface BackupRestoreUsecase {
  backup(): Promise<BackupRestoreResult> // TODO
  restore(data: BackupData): Promise<BackupRestoreResult>
}

export type BackupData = {
  problem: Problem[]
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
        const message = e  instanceof Error ? e.message : `Backup failed to save: ${filename}`
        throw new Error(message)
        console.error(message)
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
      await problemRepo.save(backupData.problem)
      await learningRepo.save(backupData.learning)          

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
