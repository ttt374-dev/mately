import type { FsmState, } from "@/domain/fsm/types";
import { Stack, Typography, Divider, } from '@mui/material';
import { PlyControl } from "./PlyControl";
import type { LearningEntry } from "@/domain/learning/types";
import { FsmStatus } from "../FsmStat";
import { TimerControl } from "./TImerControl";
import { ResultSummary } from "./ResultSummary";



//////////////////////////////////////////////
// コントロールパネル
export default function ControlsPanel({
    learningEntry,
    //currentPhase,
    showMoves,
    advancePly,
    retreatPly,
    timer: {
        elaspedSec,
        toggleTimer,
        isTimerRunning,
    },
    fsmState,
}: {
    learningEntry: LearningEntry | undefined;
    //currentPhase: PlayerPhase;
    showMoves: boolean,
    advancePly: () => void;
    retreatPly: () => void;
    timer: {
        elaspedSec: number,
        toggleTimer: () => void,
        isTimerRunning: boolean,
    }
    fsmState: FsmState,
}) {
    
    return (
        <Stack
            border={1}
            borderColor="divider"
            sx={{ width: 150 }}
            p={1}
            spacing={1}
        >
            {/* ===== 上段：操作・進行 ===== */}
            <Stack spacing={0.5}>
                { showMoves &&
                    <PlyControl advancePly={advancePly} retreatPly={retreatPly}/>}

                {/* スター + インデックス */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">                    
                    <FsmStatus index={fsmState.currentIndex} length={fsmState.queue.length}/>                    
                    <TimerControl isTimerRunning={isTimerRunning} 
                        elaspedSec={elaspedSec}
                        onToggleTimer={toggleTimer}/>
                </Stack>
            </Stack>

            <Divider />

            { learningEntry && <ResultSummary solvedCount={learningEntry.solvedCount ?? 0} 
                failedCount={learningEntry.failedCount ?? 0}/>}
            
        </Stack>
    );
}
