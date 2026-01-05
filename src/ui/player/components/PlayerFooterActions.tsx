
///////////////////////

import type { PlaySession } from "@/domain/session/types";
import type { PlayerPhase } from "../types/PlayerPhase";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { AnswerResult } from "@/domain/learning/types";

// フッター
export default function PlayerFooterActions({
    currentPhase,
    advancePhase,
    onAnswer,
    onBack,
}: {
    currentPhase: PlayerPhase;
    advancePhase: () => void;
    onAnswer: (answer: AnswerResult) => void;
    onBack: () => void;
}) {
    const navigate = useNavigate();
    return currentPhase === "problem" ? (
        <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={onBack}>
                戻る
            </Button>
            <Button variant="contained" color="primary" onClick={advancePhase} sx={{ flex: 3 }}>
                手筋を見る
            </Button>
        </Stack>
    ) : (
        <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained" color="error"
                onClick={() => onAnswer("failed")}>
                不正解
            </Button>
            <Button fullWidth variant="contained" color="success"
                onClick={() => onAnswer("solved")}>
                正解
            </Button>
        </Stack>
    );
}