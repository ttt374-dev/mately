import { useNavigate } from 'react-router-dom';
import { Stack, Button, Box } from '@mui/material';

import { AppLayout } from "@/ui/shared/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import type { FsmState, PlaySession } from '@/domain/fsm/types';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { usePlayerPhase } from './hooks/usePlayerPhase';
import { useEffect } from 'react';
import { useReplayView } from './hooks/useReplayView';
import { BoardPanel } from './components/BoardPanel';
import PlayerFooterActions from './components/PlayerFooterActions';
import MovesPanel from './components/MovesPanel';
import ControlsPanel from './components/ControlPanel';
import { createKifContent } from '@/domain/kif/factory';
import { useFsmContext } from '@/app/providers/FsmProvider';

const getCurrentProblem = (fsmState: FsmState, records: Record<string, Problem>): Problem | null => {
    const problemId = fsmState.queue[fsmState.currentIndex]?.problemId
    return records[problemId] ?? null
}
/*
const getCurrentProblem = (session: PlaySession | null, records: Record<string, Problem>): Problem | null =>
    session?.queue[session.currentIndex]?.problemId
        ? records[session.queue[session.currentIndex].problemId] ?? null
        : null;
*/
export default function PlayerScreen(){    
    // fsm
    const { state: fsmState, next, prev, solve, fail, reset,
        advancePhase, retreatPhase,
        //advancePly, retreatPly,
     } = useFsmContext()
    const currentPhase = fsmState.phase
    // session
    const { //session, //isFinished, 
        //markSolved: sessionMarkSolved, markFailed: sessionMarkFailed,
        //nextProblem, prevProblem,
    } = usePlaySessionContext()
    const { records } = useProblemRecordsContext()
    const currentProblem = getCurrentProblem(fsmState, records)     
    
    // replay
    const kifContent = currentProblem?.kifContent ?? createKifContent()
    const { board, hands, moves,
        advancePly, retreatPly, 
        moveToPly, resetPly,
        currentPlyIndex, 
     } = useReplayView(kifContent)

    // phase
    const { //phase: currentPhase, //advancePhase, retreatPhase,
        //resetPhase, showSolution,
    } = usePlayerPhase()    

    const { learningRecords, toggleStar,
        markSolved: learningMarkSolved, markFailed: learningMarkFailed,
     } = useLearningRecordsContext()
    const navigate = useNavigate()
    
    // 最後のインデックスだったらサマリーに遷移
    useEffect(() => {
        if (!fsmState.isFinished) return;       

        //navigate("/summary", { state: { session } });  // TODO
        navigate("/summary", { state: { fsmState }})
    }, [fsmState.isFinished, navigate]);
    
    useEffect(() => {
        if (!fsmState) return

        //resetPhase()
        resetPly()

        reset()
    }, [fsmState && fsmState.currentIndex])

    if (!fsmState || !currentProblem){
        console.log("empty state", fsmState, currentProblem)
        return (
            <AppLayout>
                <Box>NO SESSION / NO PROBLEM</Box>
                
                <Button onClick={() => navigate("/deck")}>戻る</Button>
            </AppLayout>)
    }

    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] ?? {}
    /////////////////////////////////////
    // ハンドラー
    const handleSolve = () => {                                     
        learningMarkSolved(currentProblem.id)
        //sessionMarkSolved()
        //nextProblem()
        //resetPhase()

        // fsm
        solve()
        next()
    }    
    const handleFail = () => {                                     
        learningMarkFailed(currentProblem.id)
        //sessionMarkFailed()
        //nextProblem()
        //resetPhase()
        fail()
        next()
    }    
    const handleBack = () => {
        navigate(-1)
    }
    
    const handleStar = () => {
        toggleStar(currentProblem.id)        
    }
    
    return (
        <AppLayout
            header={ `${currentProblem.title}`}
            footer={<PlayerFooterActions 
                phase={currentPhase}
                onShowSolution={advancePhase}
                onSolve={handleSolve}
                onFail={handleFail}
                onBack={handleBack}
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
                    advanceQueue={next}
                    retreatQueue={prev}
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
                        //session={session}
                        fsmState={fsmState}
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