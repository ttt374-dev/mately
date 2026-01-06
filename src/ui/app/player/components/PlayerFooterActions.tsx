import type { PlayerPhase } from "../../../../domain/fsm/types/PlayerPhase";
import { Button, Stack, type ButtonProps } from "@mui/material";
import type { AnswerResult } from "@/domain/learning/types";

type PlayerAction = {
    id: string;
    label: string;
    onClick: () => void;
    variant: ButtonProps["variant"];
    color: ButtonProps["color"];
    flex?: number;
    fullWidth?: boolean;
};

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
    const actionsByPhase: Record<PlayerPhase, PlayerAction[]> = {
        problem: [
            { id: "back", label: "戻る", variant: "outlined", color: "info", onClick: onBack },
            { id: "show", label: "手筋を見る", variant: "contained", color: "primary", flex: 3, onClick: onShowSolution },
        ],
        solution: [
            { id: "fail", label: "不正解", variant: "contained", color: "error", onClick: onFail },
            { id: "solve", label: "正解", variant: "contained", color: "success", onClick: onSolve },
        ],
        answered: []
    };
    return (<Stack direction="row" spacing={1}>
        {actionsByPhase[phase].map(a => (
            <Button
                key={a.id}
                variant={a.variant}
                color={a.color}
                onClick={a.onClick}
                sx={a.flex !== undefined ? { flex: a.flex } : { flex: 1 }}
            >
                {a.label}
            </Button>
        ))}
    </Stack>)
}