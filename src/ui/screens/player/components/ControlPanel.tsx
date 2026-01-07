import type { FsmState, } from "@/domain/fsm/types";
import type { PlayerPhase } from "../../../../domain/fsm/types/PlayerPhase";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack, Typography, Divider, Card, Box, Button, IconButton, toggleButtonClasses } from '@mui/material';
import { PlyControl } from "./PlyControl";
import { StarControl } from "./StarControl";

function Stat({ label, value }: { label: string; value: number }) {
    
    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
                {value}
            </Typography>
        </Stack>
    )
}

function calcRate(solved = 0, failed = 0) {
    const total = solved + failed
    if (total === 0) return 0
    return Math.round((solved / total) * 100)
}

function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
}



export const ResultSummary = ({solvedCount, failedCount}: {
    solvedCount: number,
    failedCount: number,    
}) => {
    return (
        <Stack direction = "row" alignItems = "center" justifyContent = "space-between" >
            < Stack direction = "row" spacing = { 1} >
                    <Stat label="正" value={solvedCount} />
                    <Stat label="誤" value={failedCount} />
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="success.main"
                        textAlign="right"
                    >
                        {calcRate(solvedCount, failedCount) } %
                        
                    </Typography> 
                </Stack>
        </Stack>
    )
}
////

export const TimerControl = ({isTimerRunning, elaspedSec, onToggleTimer}: {
    onToggleTimer: () => void
    isTimerRunning: boolean
    elaspedSec: number
}) => {    
    return (<Typography variant="body2" fontWeight="bold" sx={{ cursor: "pointer" }}
        onClick={onToggleTimer}
    >
        {isTimerRunning ? "II" : "▶"} {formatTime(elaspedSec)}
    </Typography>)
}
export const FsmStatus = ({index, length}: {
    index: number,
    length: number
}) => {
    return (
        <Typography variant="body2" fontWeight="bold">            
            { `${index} / ${length}` }
        </Typography>
    )
}
//////////////////////////////////////////////
// コントロールパネル
export default function ControlsPanel({
    isStarred,
    learningEntry,
    onToggleStar,
    currentPhase,
    advancePly,
    retreatPly,
    elaspedSec,
    toggleTimer,
    isTimerRunning,
    fsmState,
}: {
    learningEntry: { starred?: boolean; solvedCount?: number; failedCount?: number };
    isStarred: boolean
    onToggleStar: () => void;
    currentPhase: PlayerPhase;
    advancePly: () => void;
    retreatPly: () => void;
    elaspedSec: number,
    toggleTimer: () => void,
    isTimerRunning: boolean,
    fsmState: FsmState,
}) {
    const accuracy = calcRate(learningEntry.solvedCount, learningEntry.failedCount)

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
                { currentPhase === "solution" &&
                    <PlyControl advancePly={advancePly} retreatPly={retreatPly}/>}

                {/* スター + インデックス */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <StarControl isStarred={isStarred} onToggleStar={onToggleStar}/>
                    <FsmStatus index={fsmState.currentIndex} length={fsmState.queue.length}/>                    
                    <TimerControl isTimerRunning={isTimerRunning} 
                        elaspedSec={elaspedSec}
                        onToggleTimer={toggleTimer}/>
                </Stack>
            </Stack>

            <Divider />

            <ResultSummary solvedCount={learningEntry.solvedCount ?? 0} 
                failedCount={learningEntry.failedCount ?? 0}/>
            
        </Stack>
    );
}
