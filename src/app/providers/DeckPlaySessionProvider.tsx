import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import type { Problem, Collection } from "@/domain/problem/types/Problem"
import { createProblemRepository } from "@/domain/problem/problemRepository"
import type { DeckPlaySession } from "@/ui/deck/DeckPlaySession"
import { useDeckPlaySession } from "@/ui/deck/useDeckplaySession"
import type { QueueItem } from "@/ui/deck/DeckPlaySession"

// context を作る
export const DeckPlaySessionContext = createContext<DeckPlaySessionContextValue | null > (null)

type DeckPlaySessionContextValue = {
    session: DeckPlaySession | null
    startSession: (queue: QueueItem[]) => void
}

export const DeckPlaySessionProvider = ({children}: { children: ReactNode}) => {
    
    const { session, startSession } = useDeckPlaySession()

    return (
        <DeckPlaySessionContext.Provider value={{
            session, startSession
        }}>
            {children}
        </DeckPlaySessionContext.Provider>        
    )

}

// Hook で安全に取得
export function useDeckPlaySessionContext(): DeckPlaySessionContextValue {
  const ctx = useContext(DeckPlaySessionContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



