import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import { usePlaySession } from "@/hooks/usePlaySession"
import type { PlaySession, QueueItem } from "@/domain/session/types/"

// context を作る
type PlaySessionContextValue = ReturnType<typeof usePlaySession>
export const PlaySessionContext = createContext<PlaySessionContextValue | null > (null)

export const PlaySessionProvider = ({children}: { children: ReactNode}) => {
    return (
        <PlaySessionContext.Provider value={
            usePlaySession()
        }>
            {children}
        </PlaySessionContext.Provider>        
    )
}

// Hook で安全に取得
export function usePlaySessionContext(): PlaySessionContextValue {
  const ctx = useContext(PlaySessionContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



