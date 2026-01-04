import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import { useDeckPlaySession } from "@/ui/deck/hooks/useDeckplaySession"
import type { PlayerSession, QueueItem } from "@/domain/session/types/"

// context を作る
export const DeckPlaySessionContext = createContext<DeckPlaySessionContextValue | null > (null)

type DeckPlaySessionContextValue = {
    session: PlayerSession | null
    startSession: (queue: QueueItem[]) => void
    advance: () => void
}

export const DeckPlaySessionProvider = ({children}: { children: ReactNode}) => {
    
    const { session, startSession, advance } = useDeckPlaySession()

    return (
        <DeckPlaySessionContext.Provider value={{
            session, startSession, advance
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



