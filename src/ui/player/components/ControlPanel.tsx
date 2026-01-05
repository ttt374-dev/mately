
///////////////////////

import type { PlaySession } from "@/domain/session/types";
import type { PlayerPhase } from "../types/PlayerPhase";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack, Box, Button, IconButton } from '@mui/material';


// コントロールパネル
export default function ControlsPanel({
    learningEntry,
    onToggleStar,
    currentPhase,
    advancePly,
    retreatPly,
    session,
}: {
    learningEntry: { starred?: boolean; solvedCount?: number; failedCount?: number };
    onToggleStar: () => void;
    currentPhase: PlayerPhase;
    advancePly: () => void;
    retreatPly: () => void;
    session: PlaySession | null;
}) {
    return (
        <Stack border={1} sx={{ width: 150 }} gap={2} p={2}>
            <IconButton onClick={() => onToggleStar()} disableRipple sx={{ '&:focus': { outline: "none" }, '&:focus-visible': { outline: "none" } }}>
                {learningEntry.starred ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>

            {currentPhase === "solution" && (
                <Stack spacing={1}>
                    <Button variant="outlined" onClick={retreatPly}>↑前の手</Button>
                    <Button variant="contained" onClick={advancePly}>↓次の手</Button>
                </Stack>
            )}

            <Box>
                {learningEntry.solvedCount ?? 0} / {(learningEntry.solvedCount ?? 0) + (learningEntry.failedCount ?? 0)}
            </Box>

            <Box>
                session: {session ? `${session.currentIndex + 1} / ${session.queue.length}` : "-"}
            </Box>
        </Stack>
    );
}
