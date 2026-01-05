import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import { useLearningRecords } from "@/hooks/useLearningRecords"
import { createLearningRepository } from "@/domain/learning/LearningRepository"

// context を作る
type LearningRecordsContextValue = ReturnType<typeof useLearningRecords>
export const LearningRecordsContext = createContext<LearningRecordsContextValue | null > (null)

export const LearningRecordsProvider = ({children}: { children: ReactNode}) => {
    const learningRepository = createLearningRepository()
    return (
        <LearningRecordsContext.Provider value={
            useLearningRecords(learningRepository)
        }>
            {children}
        </LearningRecordsContext.Provider>        
    )
}

// Hook で安全に取得
export function useLearningRecordsContext(): LearningRecordsContextValue {
  const ctx = useContext(LearningRecordsContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



