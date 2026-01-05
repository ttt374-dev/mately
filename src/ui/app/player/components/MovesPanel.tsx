import { Box } from "@mui/material";
import type { PlayerPhase } from "../types/PlayerPhase";
import MovesView from "./MoveView";

export default function MovesPanel({
    moves,
    currentPhase,
    currentPlyIndex,
    moveToPly,
}: {
    moves: any[];
    currentPhase: PlayerPhase;
    currentPlyIndex: number;
    moveToPly: (i: number) => void;
}) {
    return (
        <Box
            border={1}
            sx={{
                display: "flex",
                justifyContent: "center",
                overflowY: "auto",
                gap: 2,
                p: 1,
                flex: 1,
            }}
        >
            {currentPhase === "problem" && <Box p={2}>{moves.length}手詰め</Box>}
            {currentPhase === "solution" && (
                <MovesView moves={moves} currentPlyIndex={currentPlyIndex} onMoveClick={moveToPly} />
            )}
        </Box>
    );
}