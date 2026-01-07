import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Button, Box } from '@mui/material';

import { AppLayout } from "@/ui/common/AppLayout"
import { useReplayView } from '@/ui/screens/player/hooks/useReplayView';
import { createProblem } from '@/domain/problem/factory';
import { BoardPanel } from '../player/components/BoardPanel';
import MovesPanel from '../player/components/MovesPanel';
import { PlyControl } from '../player/components/controlPanels/PlyControl';
import { StarControl } from '../player/components/controlPanels/StarControl';
import { useStoreContext } from '@/app/providers/StoreProvider';
import BoardView from '../player/components/BoardView';
import { SwipeWrapper } from '../player/components/SwipeWrapper';

export default function ViewScreen() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>invalid id</div>;
    }
    const stores = useStoreContext()
    const { problems, toggleStar } = stores.problem

    const currentProblem = problems.find((p) => p.id === id) ?? createProblem()

    const noop = () => { }
    const { board, hands, moves, currentPlyIndex,
        advancePly, retreatPly, moveToPly, 
    } = useReplayView(currentProblem.kifContent)

    const handleStar = () => {
        toggleStar(currentProblem.id)
    }

    return (
        <AppLayout
            header={`${currentProblem.title}`}
            rightActions={<StarControl isStarred={currentProblem.starred} onToggleStar={handleStar}/>}
        >

            <Stack direction="column" sx={{ minHeight: 0, height: "100%" }} spacing={1}>
                <SwipeWrapper actions={{
                    onUp: retreatPly,
                    onDown: advancePly,
                }}>
                    <BoardView
                        board={board}
                        hands={hands}>
                    </BoardView>                
                </SwipeWrapper>

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
                    </Stack>

                </Stack>
            </Stack>
        </AppLayout>
    )
}
