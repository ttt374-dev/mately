import type { FsmState, } from "@/domain/fsm/types";
import { Stack, Typography, Divider, Paper, } from '@mui/material';
import { PlyControl } from "./PlyControl";
import type { LearningEntry } from "@/domain/learning/types";
import { TimerControl } from "./TImerControl";
import { ResultSummary } from "./ResultSummary";
import { FsmStatus } from "./FsmStat";



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
        <Paper sx={{ width: 150 }}>
            {/* ===== 上段：操作・進行 ===== */}
            <Stack spacing={0.5}>
                { true &&
                    <PlyControl disabled={!showMoves} advancePly={advancePly} retreatPly={retreatPly}/>}

                <Stack direction="row" alignItems="center" justifyContent="space-between">                    
                    <FsmStatus index={fsmState.currentIndex} length={fsmState.queue.length}/>                    
                    <TimerControl isTimerRunning={isTimerRunning} 
                        elaspedSec={elaspedSec}
                        onToggleTimer={toggleTimer}/>
                </Stack>
            </Stack>

            <Divider />

            { learningEntry && <ResultSummary learningEntry={learningEntry}/>}
            
        </Paper>
    );
}
