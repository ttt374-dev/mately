import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Box, Button, IconButton } from '@mui/material';

import { AppLayout } from "@/shared/components/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
//import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import type { AnswerResult } from '@/domain/learning/types';
import type { PlaySession } from '@/domain/session/types';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { usePlayerPhase } from './hooks/usePlayerPhase';
import { useEffect } from 'react';
import { useReplayBoard } from './hooks/useReplayBoard';
import { BoardPanel } from './components/BoardPanel';
import PlayerFooterActions from './components/PlayerFooterActions';
import MovesPanel from './components/MovesPanel';
import ControlsPanel from './components/ControlPanel';
import { createKifContent } from '@/domain/kif/factory';

function getCurrentProblem(session: PlaySession | null, records: Record<string, Problem>): Problem | null {
    if (!session) return null

    const item = session.queue[session.currentIndex]
    if (!item) return null

    return records[item.problemId] ?? null
    //const currentProblemId = session && session.queue[session.currentIndex]?.problemId
    //return currentProblemId ? records[currentProblemId] ?? null : null;        
}

export default function PlayerScreen(){    
    const { session, isFinished, answerCurrent,
        advance: advanceQueue, retreat: retreatQueue,
    } = usePlaySessionContext()
    const { records } = useProblemRecordsContext()
    const currentProblem = getCurrentProblem(session, records)     
    const { currentPhase, advancePhase, retreatPhase, resetPhase } = usePlayerPhase()
    const kifContent = currentProblem?.kifContent ?? createKifContent()
    const moves = kifContent.events.filter(event => event.type ==="move")
    const { board, hands, advancePly, retreatPly, resetPly,
        currentPlyIndex, setCurrentPlyIndex } = useReplayBoard(
        kifContent.board, kifContent.hands, moves        
    )
    const navigate = useNavigate()
    const { learningRecords, markAnswer, toggleStar } = useLearningRecordsContext()

    // 最後のインデックスだったらサマリーに遷移
    useEffect(() => {
        if (!session || !isFinished) return;       

        navigate("/summary", { state: { session } });
    }, [session, isFinished, navigate]);
    
    useEffect(() => {
        if (!session) return

        resetPhase()
        resetPly()        
    }, [session?.currentIndex])

    if (!session || !currentProblem) return (<>NO SESSION / NO PROBLEM</>)

    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] ?? {}
    /////////////////////////////////////
    // ハンドラー
    const handleAnswer = (answer: AnswerResult) => {                                     
        markAnswer(currentProblem.id, answer)
        answerCurrent(answer)
    }    
    const handleStar = () => {
        toggleStar(currentProblem.id)        
    }
    
    return (
        <AppLayout
            header={ `${(session?.currentIndex ?? 0) + 1}: ${currentProblem.title}`}
            footer={<PlayerFooterActions 
                phase={currentPhase}
                onShowSolution={advancePhase}
                //onAnswer={handleAnswer}
                onSolve={() => handleAnswer("solved")}
                onFail={() => handleAnswer("solved")}
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