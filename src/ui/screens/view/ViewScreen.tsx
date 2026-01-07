import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Button, Box } from '@mui/material';

import { AppLayout } from "@/ui/common/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import type { FsmState } from '@/domain/fsm/types';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { useEffect, useMemo } from 'react';
import { useReplayView } from '@/ui/screens/player/hooks/useReplayView';
import { createProblem } from '@/domain/problem/factory';
import { BoardPanel } from '../player/components/BoardPanel';
import MovesPanel from '../player/components/MovesPanel';
import ControlsPanel from '../player/components/ControlPanel';
import { PlyControl } from '../player/components/PlyControl';
import { StarControl } from '../player/components/StarControl';

export default function ViewScreen() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>invalid id</div>;
    }
    const { records, toggleStar } = useProblemRecordsContext()

    const currentProblem = records[id] ?? createProblem()

    const noop = () => { }
    const { board, hands, moves, currentPlyIndex,
        advancePly, retreatPly, moveToPly, 
    } = useReplayView(currentProblem.kifContent)

    return (
        <AppLayout
            header={`${currentProblem.title}`}
        >

            <Stack direction="column" sx={{ minHeight: 0, height: "100%" }} spacing={1}>
                <BoardPanel
                    board={board}
                    hands={hands}
                    currentPhase={"problem"}
                    advancePly={advancePly}
                    retreatPly={retreatPly}
                    advancePhase={noop}
                    retreatPhase={noop}
                    advanceQueue={noop}
                    retreatQueue={noop}
                />

                <Stack direction="row" pb={1}
                    sx={{ minHeight: 0, flexGrow: 1 }} spacing={1} >

                    <MovesPanel
                        moves={moves}
                        currentPhase={"solution"}
                        currentPlyIndex={currentPlyIndex}
                        moveToPly={moveToPly} />

                    <Stack
                        border={1}
                        borderColor="divider"
                        sx={{ width: 150 }}
                        p={1}
                        spacing={1}>
                        <PlyControl advancePly={advancePly} retreatPly={retreatPly}/>
                        <StarControl isStarred={currentProblem.starred} 
                            onToggleStar={() => { toggleStar(currentProblem.id)}}/>
                    </Stack>

                </Stack>
            </Stack>
        </AppLayout>
    )
}
