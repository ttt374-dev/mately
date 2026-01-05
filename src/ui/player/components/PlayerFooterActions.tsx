import type { PlayerPhase } from "../types/PlayerPhase";
import { Button, Stack } from "@mui/material";
import type { AnswerResult } from "@/domain/learning/types";

// フッター
export default function PlayerFooterActions({
    phase,
    onShowSolution,
    onSolve,
    onFail,
    onBack,
}: {
    phase: PlayerPhase;
    onShowSolution: () => void
    //onAnswer: (answer: AnswerResult) => void;
    onSolve: () => void;
    onFail: () => void
    onBack: () => void;
}) {
    return phase === "problem" ? (
        <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={onBack}>
                戻る
            </Button>
            <Button variant="contained" color="primary" 
                onClick={onShowSolution} sx={{ flex: 3 }}>
                手筋を見る
            </Button>
        </Stack>
    ) : (
        <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained" color="error"
                onClick={() => onFail}>
                不正解
            </Button>
            <Button fullWidth variant="contained" color="success"
                onClick={() => onSolve}>
                正解
            </Button>
        </Stack>
    );
}