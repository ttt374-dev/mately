import { useState } from "react"
import type { PlayerPhase } from "../types/PlayerPhase"

const initialPhase: PlayerPhase = "problem"

export function usePlayerPhase(){
    const [currentPhase, setCurrentPhase] = useState<PlayerPhase>(initialPhase)

    const resetPhase = () => {
        setCurrentPhase(initialPhase)
    }
    const advancePhase = () => {
        currentPhase === "problem" && setCurrentPhase("solution")
    }
    const retreatPhase = () => {
        currentPhase === "solution" && setCurrentPhase("problem")
    }

    return {
        currentPhase, 
        advancePhase, retreatPhase, resetPhase
    }
}