import type { JSX } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Box, Button, IconButton } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { AppLayout } from "@/shared/components/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import type { AnswerResult } from '@/domain/learning/types';
import type { PlaySession } from '@/domain/session/types';
import type { PlayerMode } from './types/PlayerMode';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { usePlayerPhase } from './hooks/usePlayerPhase';
import { useEffect } from 'react';
import { useReplayBoard } from './hooks/useReplayBoard';
import MovesView from './components/MoveView';
import { createProblem } from '@/domain/problem/factory/createProblem';
import type { PlayerPhase } from './types/PlayerPhase';
import { BoardPanel } from './components/BoardPanel';
import FooterAction from './components/FooterAction';

function getCurrentProblem(session: PlaySession | null, records: ProblemRecord): Problem | null {
    const currentProblemId = session && session.queue[session.currentIndex]?.problemId
    return currentProblemId ? records[currentProblemId] ?? null : null;        
}
/*
function getPlayerMode(): PlayerMode {
    const location = useLocation();
    const state = location.state as { mode?: PlayerMode } | undefined;
    return state?.mode ?? "problem"
}
    */

export default function PlayerScreen(){    
        //const { collection } = useProblemCollectionContext()
    const { session, isFinished, answerCurrent,
        advance: advanceQueue, retreat: retreatQueue,
     } = usePlaySessionContext()
    //console.log("session info", session)   
    const { records } = useProblemRecordsContext()
    const currentProblem = getCurrentProblem(session, records) ?? createProblem()
    const navigate = useNavigate()
    /////////////////////////////////////////    
    const { currentPhase, advancePhase, retreatPhase, resetPhase } = usePlayerPhase()
    const moves = currentProblem.kifContent.events.filter(event => event.type ==="move")
    const { board, hands, advancePly, retreatPly, resetPly,
        currentPlyIndex, setCurrentPlyIndex } = useReplayBoard(
        currentProblem.kifContent.board, currentProblem.kifContent.hands, moves        
    )

    //console.log("player session", session)
    //const learningRepository = createLearningRepository()
    const { learningRecords, markAnswer, toggleStar } = useLearningRecordsContext()
    ///////////    
    
    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] || {}
    // モード    
    //const mode = getPlayerMode()        

    // 最後のインデックスだったらサマリーに遷移
    useEffect(() => {
        //console.log("effect", session?.currentIndex, isFinished)
        if (!session) return;
        if (!isFinished) return;

        navigate("/summary", { state: { session } });
    }, [session?.results, isFinished]);
    
    useEffect(() => {
        if (!session) return
        resetPhase()
        resetPly()
        
    }, [session?.currentIndex])

    /////////////////////////////////////
    // ハンドラー
    const handleAnswer = (answer: AnswerResult) => {                                     
        markAnswer(currentProblem.id, answer)
        answerCurrent(answer)
        //console.log("handle solved", session?.results)            
    }    
    const handleStar = () => {
        toggleStar(currentProblem.id)
        //console.log("toggled ", learningEntry.starred)
    }
    
    return (
        <AppLayout
            header={ `${(session?.currentIndex ?? 0) + 1}: ${currentProblem.title}`}
            //ooter={ ModeActions[mode] }
            //footer={phaseActions[currentPhase]}
            footer={<FooterAction 
                currentPhase={currentPhase}
                advancePhase={advancePhase}
                session={session}
                onAnswer={handleAnswer}
            />}
            >

            <Stack spacing={1}>
                <Box sx={{ justifyContent: "center" }}>
                    <BoardPanel
                        board={board}
                        hands={hands}
                        currentPhase={currentPhase}
                        advanceMove={advancePly}
                        retreatMove={retreatPly}
                        advancePhase={advancePhase}
                        retreatPhase={retreatPhase}
                        advanceQueue={advanceQueue}
                        retreatQueue={retreatQueue}
                    />
                </Box>
                

                <Box sx={{ minHeight: 0, display: "flex", flexDirection: "row" }}>
                    { /* 手順リスト */}
                    <Box
                        border={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            overflowY: "auto",
                            gap: 2, flex: 7,
                        }}>
                        {currentPhase === "problem" &&
                            <Box p={2}>
                                {moves.length}手詰め
                            </Box>
                        }
                        {currentPhase === "solution" &&
                            <MovesView
                                moves={moves}
                                currentPlyIndex={currentPlyIndex}
                                onMoveClick={(i) => setCurrentPlyIndex(i)} />
                        }
                    </Box>

                    { /* コントロール */}
                    <Stack border={1} sx={{ width: 150 }} gap={2} p={2}>
                        <IconButton onClick={handleStar} disableRipple
                            sx={{
                                '&:focus': {outline: "none"},
                                '&:focus-visible': {outline: "none"},
                        }}
                        >
                            { learningEntry.starred ? <StarIcon/> : <StarBorderIcon/> }
                        </IconButton>
                        
                        
                        {currentPhase === "solution" && 
                        <Stack spacing={1}>
                            <Button variant="outlined" onClick={retreatPly}>
                                ↑前の手
                            </Button>
                            <Button variant="contained" onClick={advancePly}>
                                ↓次の手
                            </Button>
                        </Stack>}
                        <Box>
                            { learningEntry.solvedCount} / 
                            { learningEntry.solvedCount + learningEntry.failedCount}
                        </Box>
                        
                        <Box>
                            session: {session && `${session.currentIndex + 1} / ${session.queue.length}`}
                        </Box>
       
                    </Stack>
                </Box>

            </Stack>
        </AppLayout>
    )
}