import { useFSM } from "@/hooks/useFSM"
import type { ReactNode } from "react"
import { createContext, useContext } from "react"


// context を作る
type FsmContextValue = ReturnType<typeof useFSM>
export const FsmContext = createContext<FsmContextValue | null > (null)

export const FsmProvider = ({children}: { children: ReactNode}) => {
    return (
        <FsmContext.Provider value={
            useFSM()
        }>
            {children}
        </FsmContext.Provider>        
    )
}

// Hook で安全に取得
export function useFsmContext(): FsmContextValue {
  const ctx = useContext(FsmContext)
  if (!ctx) throw new Error("context provider error");
  return ctx;
}



