import { useReducer, useState } from "react"
import type { PlayerPhase } from "../types/PlayerPhase"

const initialPhase: PlayerPhase = "problem"
type PlayerPhaseAction = "ADVANCE" | "SHOW_SOLUTION" | "RETREAT" | "RESET";

type PhaseTransition = {
  [P in PlayerPhase]: Partial<Record<PlayerPhaseAction, PlayerPhase>>;
};
const phaseTransition: PhaseTransition = {
  problem: {
    ADVANCE: "solution",
    SHOW_SOLUTION: "solution",
    
  },
  solution: {
    RETREAT: "problem",
    RESET: "problem"
  },
};

function reducer(
  state: PlayerPhase,
    action: PlayerPhaseAction
): PlayerPhase {
    console.log("recuder", state, action)
    return phaseTransition[state][action] ?? state    
}

export function usePlayerPhaseFSM(){
    const [currentPhase, dispatch] = useReducer(reducer, initialPhase);

    /*
    const [_currentPhase, setCurrentPhase] = useState<PlayerPhase>(initialPhase)

    const resetPhase = () => {
        setCurrentPhase(initialPhase)
    }
    const advancePhase = () => {
        currentPhase === "problem" && setCurrentPhase("solution")
    }
    const retreatPhase = () => {
        currentPhase === "solution" && setCurrentPhase("problem")
    }
*/
    return {
        currentPhase, 
        //advancePhase, retreatPhase, resetPhase,

        dispatch
    }
}