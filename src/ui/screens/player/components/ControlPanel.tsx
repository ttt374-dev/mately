import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import type { FsmState, } from "@/domain/fsm/types";
import type { PlayerPhase } from "../../../../domain/fsm/types/PlayerPhase";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack, Typography, Divider, Card, Box, Button, IconButton, toggleButtonClasses } from '@mui/material';
import { ImageAspectRatio } from "@mui/icons-material";
import { formatPercent } from "@/utils";

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

                {/* 解答操作 */}
                {currentPhase === "solution" && (
                    <>
                    <Stack spacing={0.5}>
                        <Button size="small" variant="outlined" onClick={retreatPly}>
                            ↑ 前の手
                        </Button>
                        <Button size="small" variant="contained" onClick={advancePly}>
                            ↓ 次の手
                        </Button>
                    </Stack>
                    <Divider />
                    </>
                )}

                {/* スター + インデックス */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="small"
                        onClick={onToggleStar}
                        disableRipple
                        sx={{
                            '&:focus': { outline: 'none' },
                            '&:focus-visible': { outline: 'none' },
                        }}
                    >
                        {isStarred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>

                    <Typography variant="body2" fontWeight="bold">
                        {fsmState
                            ? `${fsmState.currentIndex + 1} / ${fsmState.queue.length}`
                            : '-'}
                    </Typography>

                    {/* タイマー */}
                    <Typography variant="body2" fontWeight="bold" sx={{ cursor: "pointer" }}
                        onClick={toggleTimer}
                    >

                        {isTimerRunning ? "II" : "▶"} {formatTime(elaspedSec)}

                    </Typography>
                </Stack>
            </Stack>

            <Divider />

            {/* ===== 下段：結果サマリー ===== */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">

                {/* 正答・誤答 */}
                <Stack direction="row" spacing={1}>
                    <Stat label="正" value={learningEntry.solvedCount ?? 0} />
                    <Stat label="誤" value={learningEntry.failedCount ?? 0} />
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="success.main"
                        textAlign="right"
                    >
                        {calcRate(
                            learningEntry.solvedCount,
                            learningEntry.failedCount
                        ) } %
                        
                    </Typography> 
                    </Stack>
            </Stack>
        </Stack>

    );
}
