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
import { usePlayerPhaseFSM } from './hooks/usePlayerPhaseFSM';
import { useEffect } from 'react';
import { useReplayView } from './hooks/useReplayView';
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
    // session
    const { session, isFinished, answerCurrent, dispatch: dispatchSession,
        //advance: advanceQueue, retreat: retreatQueue,
    } = usePlaySessionContext()
    const { records } = useProblemRecordsContext()
    const currentProblem = getCurrentProblem(session, records)     
    
    // replay
    const kifContent = currentProblem?.kifContent ?? createKifContent()
    const { board, hands, moves,
        dispatch: dispatchPly, moveToPly,
        currentPlyIndex,  } = useReplayView(kifContent)

    // FSM
    const { currentPhase, dispatch: dispatchPhase} = usePlayerPhaseFSM()    

    const { learningRecords, markAnswer, toggleStar } = useLearningRecordsContext()
    const navigate = useNavigate()
    
    // 最後のインデックスだったらサマリーに遷移
    useEffect(() => {
        if (!session || !isFinished) return;       

        navigate("/summary", { state: { session } });
    }, [session, isFinished, navigate]);
    
    useEffect(() => {
        if (!session) return

        //resetPhase()
        dispatchPhase("RESET")
        dispatchPly("RESET")
        //resetPly()        
    }, [session?.currentIndex])

    if (!session || !currentProblem) return (<>
        NO SESSION / NO PROBLEM
        <button onClick={()=>navigate("/deck")}>戻る</button>
    </>)

    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] ?? {}
    /////////////////////////////////////
    // ハンドラー
    const handleAnswer = (answer: AnswerResult) => {                                     
        markAnswer(currentProblem.id, answer)
        answerCurrent(answer)
        dispatchPhase("RESET")
    }    
    const handleStar = () => {
        toggleStar(currentProblem.id)        
    }
    
    return (
        <AppLayout
            header={ `${(session?.currentIndex ?? 0) + 1}: ${currentProblem.title}`}
            footer={<PlayerFooterActions 
                phase={currentPhase}
                //onShowSolution={advancePhase}
                onShowSolution={()=>dispatchPhase("SHOW_SOLUTION")}
                //onAnswer={handleAnswer}
                onSolve={() => handleAnswer("solved")}
                onFail={() => handleAnswer("failed")}
                onBack={()=>navigate(-1)}
            />}
            >

            <Stack direction="column" sx={{ minHeight: 0 }}>
                <BoardPanel
                    board={board}
                    hands={hands}
                    currentPhase={currentPhase}
                    advanceMove={() => dispatchPly("NEXT")}
                    retreatMove={() => dispatchPly("PREV")}
                    //advancePhase={advancePhase}
                    advancePhase={() => dispatchPhase("ADVANCE")}
                    //retreatPhase={retreatPhase}
                    retreatPhase={() => dispatchPhase("RETREAT")}
                    advanceQueue={() => dispatchSession({type: "NEXT"})}
                    retreatQueue={() => dispatchSession({type: "PREV"})}
                />                

                <Stack direction="row" sx={{ minHeight: 0}}>
                    { /* 手順リスト */}
                    <MovesPanel
                        moves={moves}
                        currentPhase={currentPhase}
                        currentPlyIndex={currentPlyIndex}
                        moveToPly={moveToPly} />
                    { /* コントロール */}
                    <ControlsPanel
                        learningEntry={learningEntry}
                        session={session}
                        currentPhase={currentPhase}
                        advancePly={() => dispatchPly("NEXT")}
                        retreatPly={() => {dispatchPly("PREV")}}
                        onToggleStar={handleStar}                          
                    />                                        
                </Stack>
            </Stack>
        </AppLayout>
    )
}