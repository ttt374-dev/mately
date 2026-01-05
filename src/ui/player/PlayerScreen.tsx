import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Box, Button, IconButton } from '@mui/material';

import { AppLayout } from "@/shared/components/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import type { AnswerResult } from '@/domain/learning/types';
import type { PlaySession } from '@/domain/session/types';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { usePlayerPhase } from './hooks/usePlayerPhase';
import { useEffect } from 'react';
import { useReplayBoard } from './hooks/useReplayBoard';
import { createProblem } from '@/domain/problem/factory/createProblem';
import { BoardPanel } from './components/BoardPanel';
import PlayerFooterActions from './components/PlayerFooterActions';
import MovesPanel from './components/MovesPanel';
import ControlsPanel from './components/ControlPanel';

function getCurrentProblem(session: PlaySession | null, records: ProblemRecord): Problem | null {
    const currentProblemId = session && session.queue[session.currentIndex]?.problemId
    return currentProblemId ? records[currentProblemId] ?? null : null;        
}

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
        if (!session || !isFinished) return;
        

        navigate("/summary", { state: { session } });
    }, [session, isFinished, navigate]);
    
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
            footer={<PlayerFooterActions 
                currentPhase={currentPhase}
                advancePhase={advancePhase}
                onAnswer={handleAnswer}
                onBack={()=>navigate(-1)}
            />}
            >

            <Stack direction="column" sx={{ minHeight: 0 }}>
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

                <Stack direction="row" sx={{ minHeight: 0}}>
                    { /* 手順リスト */}
                    <MovesPanel
                        moves={moves}
                        currentPhase={currentPhase}
                        currentPlyIndex={currentPlyIndex}
                        setCurrentPlyIndex={setCurrentPlyIndex} />
                    { /* コントロール */}
                    <ControlsPanel
                        learningEntry={learningEntry}
                        session={session}
                        currentPhase={currentPhase}
                        advancePly={advancePly}
                        retreatPly={retreatPly}
                        onToggleStar={handleStar}                          
                    />
                                        
                </Stack>
            </Stack>
        </AppLayout>
    )
}