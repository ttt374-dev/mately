
import { Stack, Typography, Divider, } from '@mui/material';

function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
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