import { useNavigate } from 'react-router-dom';
import { Stack, Button, Box } from '@mui/material';

import { AppLayout } from "@/ui/common/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import type { FsmState } from '@/domain/fsm/types';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { useEffect, useMemo } from 'react';
import { useReplayView } from '@/ui/screens/player/hooks/useReplayView';
import { BoardPanel } from './components/BoardPanel';
import PlayerFooterActions from './components/PlayerFooterActions';
import MovesPanel from './components/MovesPanel';
import ControlsPanel from './components/ControlPanel';
import { createKifContent } from '@/domain/kif/factory';
import { useFsmContext } from '@/app/providers/FsmProvider';
import { useTimer } from './hooks/useTimer';
import NavigationControl from './components/NavigationControl';

const getCurrentProblem = (fsmState: FsmState, records: Record<string, Problem>): Problem | null => {
    const problemId = fsmState.queue[fsmState.currentIndex]?.problemId
    return records[problemId] ?? null
}
export default function PlayerScreen() {
    // fsm
    const { state: fsmState, next, prev, solve, fail,
        advancePhase, retreatPhase, 
    } = useFsmContext()
    const currentPhase = fsmState.phase
    const { problems } = useProblemRecordsContext()
    const currentProblem = useMemo(()=>
        getCurrentProblem(fsmState, problems),
    [fsmState, problems])

    // replay
    const kifContent = currentProblem?.kifContent ?? createKifContent()
    const { board, hands, moves, currentPlyIndex,
        advancePly, retreatPly,
        moveToPly, resetPly,
    } = useReplayView(kifContent)

    const { learningRecords, toggleStar,
        markSolved: learningMarkSolved, markFailed: learningMarkFailed,
    } = useLearningRecordsContext()

    // use tools
    const timer = useTimer()
    const navigate = useNavigate()

    // answer から次へ自動遷移
    useEffect(() => {
        if (fsmState.phase === "answered")
            next()
    }, [fsmState.phase])

    // 最後のインデックスだったらサマリーに遷移
    useEffect(() => {
        if (fsmState.isFinished) {
            navigate("/summary", { state: { fsmState } })
        }
    }, [fsmState.isFinished, navigate]);

    // 問題が変わったら手筋をリセット
    useEffect(() => {
        if (!fsmState) return

        timer.reset()
        timer.start()
        resetPly()
    }, [fsmState.currentIndex])

    if (!fsmState || !currentProblem) {
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
        learningMarkSolved(currentProblem.id, timer.seconds)
        solve()
    }
    const handleFail = () => {
        learningMarkFailed(currentProblem.id, timer.seconds)
        fail()
    }
    const handleBack = () => {
        navigate(-1)
    }

    const handleStar = () => {
        toggleStar(currentProblem.id)
    }

    return (
        <AppLayout
            header={`${currentProblem.title}`}
            footer={<PlayerFooterActions
                phase={currentPhase}
                onShowSolution={advancePhase}
                onSolve={handleSolve}
                onFail={handleFail}
                onBack={handleBack}
            />}
        >

            <Stack direction="column" sx={{ minHeight: 0, height: "100%" }} spacing={1}>
                <BoardPanel
                    board={board}
                    hands={hands}
                    currentPhase={currentPhase}
                    advancePly={advancePly}
                    retreatPly={retreatPly}
                    advancePhase={advancePhase}
                    retreatPhase={retreatPhase}
                    advanceQueue={next}
                    retreatQueue={prev}
                />
                { /* 
                <NavigationControl 
                    onNext={next} onPrev={prev} 
                    onFinishRun={finishRun} onBackToDeck={handleBackToDeck}/>
                        */ }
                <Stack direction="row" pb={1}
                    sx={{ minHeight: 0, flexGrow: 1 }} spacing={1} >

                    <MovesPanel
                        moves={moves}
                        currentPhase={currentPhase}
                        currentPlyIndex={currentPlyIndex}
                        moveToPly={moveToPly} />
                    <ControlsPanel
                        learningEntry={learningEntry}
                        fsmState={fsmState}
                        currentPhase={currentPhase}
                        advancePly={advancePly}
                        retreatPly={retreatPly}
                        onToggleStar={handleStar}
                        elaspedSec={timer.seconds}
                        toggleTimer={() => timer.toggle()}
                        isTimerRunning={timer.isRunning} />
                </Stack>
            </Stack>
        </AppLayout>
    )
}
