import { Box, Typography } from "@mui/material";
import type { PlayerPhase } from "../../../../domain/fsm/types/PlayerPhase";
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
            borderColor="divider"
            sx={{
                display: "flex",
                justifyContent: "center",
                overflowY: "auto",
                flexGrow: 1,
                gap: 2,
                p: 1,
                flex: 1,
            }}
        >
            {currentPhase === "problem" && 
                <Typography p={2} variant="body1">
                    {moves.length}手詰め
                </Typography>
            }
            {currentPhase === "solution" && (
                <MovesView moves={moves} currentPlyIndex={currentPlyIndex} onMoveClick={moveToPly} />
            )}
        </Box>
    );
}