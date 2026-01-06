import { useSwipeable } from 'react-swipeable'
import { Stack, Box } from '@mui/material'

import type { PlayerPhase } from '../../../../domain/fsm/types/PlayerPhase'
import type { Board, Hands } from '@/domain/kif/types'
import BoardView from './BoardView'

export function BoardPanel({
    board, hands,
    currentPhase,
    advanceQueue, retreatQueue,
    advanceMove, retreatMove,
    advancePhase, retreatPhase

}: {
    board: Board, hands: Hands,
    currentPhase: PlayerPhase
    advanceQueue: () => void
    retreatQueue: () => void
    advanceMove: () => void
    retreatMove: () => void
    advancePhase: () => void
    retreatPhase: () => void
}) {
    const stepSwipeHandlers = useSwipeable({
        onSwipedRight: () => {
            retreatQueue()
        },
        onSwipedLeft: () => {
            advanceQueue()
        },
        onSwipedDown: () => {
            currentPhase === "problem" && advancePhase()
            advanceMove()
        },
        onSwipedUp: () => {
            currentPhase === "solution" && retreatPhase()
            retreatMove()
        },

        trackMouse: true, // PCでもマウスでスワイプ可能
        preventScrollOnSwipe: true,

    })
    /////////////////
    return (

        <Stack justifyContent="center" m={2} >
            <Box {...stepSwipeHandlers} sx={{ userSelect: "none", }}>
                <BoardView
                    board={board}
                    hands={hands}>
                </BoardView>
            </Box>
        </Stack>

    )
}