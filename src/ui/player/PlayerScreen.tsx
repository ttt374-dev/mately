import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { AppLayout } from "@/shared/components/AppLayout/AppLayout"
import type { Problem, ProblemRecord } from '@/domain/problem/types/Problem';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { createLearningRepository } from '@/domain/learning/LearningRepository';
import { useLearningRecords } from '../hooks/useLearningRecords';
import type { AnswerResult } from '@/domain/learning/types';
import type { PlaySession } from '@/domain/session/types';
import type { PlayerMode } from './types/PlayerMode';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { usePlayerPhase } from './hooks/usePlayerPhase';
import { useEffect } from 'react';

function getCurrentProblem(session: PlaySession | null, records: ProblemRecord): Problem | null {
    const currentProblemId = session && session.queue[session.currentIndex]?.problemId
    return currentProblemId ? records[currentProblemId] ?? null : null;        
}

function getPlayerMode(): PlayerMode {
    const location = useLocation();
    const state = location.state as { mode?: PlayerMode } | undefined;
    return state?.mode ?? "problem"
}

export default function PlayerScreen(){    
        //const { collection } = useProblemCollectionContext()
    const { session, advance, isLastIndex, answerCurrent } = usePlaySessionContext()
    console.log("session info", session)   
    const { records } = useProblemRecordsContext()
    const currentProblem = getCurrentProblem(session, records)
    const navigate = useNavigate()
    // セッションがなければここで返す
    if (session === null || currentProblem == null){
        return (
            <div>
                セッションがありません
                <button onClick={() => navigate("/deck")}>
                    デッキに戻る
                </button>

            </div>)
    }
    /////////////////////////////////////////    
    const { currentPhase, advancePhase, resetPhase } = usePlayerPhase()

    console.log("player session", session)
    //const learningRepository = createLearningRepository()
    const { learningRecords, markAnswer } = useLearningRecordsContext()
    
    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] || {}
    // モード    
    const mode = getPlayerMode()

    useEffect(()=> {
        resetPhase()
    }, [records, session])

    // ハンドラー

    const handleAnswer = (answer: AnswerResult) => { 
        if (currentProblem){                                   
            markAnswer(currentProblem.id, answer)
            answerCurrent(answer)
            console.log("handle solved", learningRecords)
        }   
        if (isLastIndex){
            navigate("/summary", { state: { session}})
        } else {
            advance()
        }                  
    }
    const handleShowMove = () => {
        advancePhase()
    }
    return (
        <AppLayout
            footer={
                <>
                    {mode === "problem" && <>
                        { currentPhase === "problem" ?
                            (<>
                               <Button onClick={handleShowMove}>
                                    手筋を見る
                                </Button> 
                            </>) : 
                            (<>
                                <button onClick={() => handleAnswer("solved")}>
                                    正解
                                </button>
                                <button onClick={() => handleAnswer("failed")}>
                                    不正解
                                </button>
                            </>)
                        }
                        
                        <button onClick={() => navigate("/deck")}>
                            デッキに戻る
                        </button>
                    </>
                    }
                    {mode === "review" && <>
                        <button onClick={() => navigate("/library")}>
                            ライブラリに戻る
                        </button>
                    </>
                    }
                </>}>

            <>

                <div>Player: [{session?.currentIndex}] {currentProblem.id}</div>
                <Box>
                    mode: {mode} / phase: {currentPhase}
                </Box>
                <Box>
                    成績：{ learningEntry.solvedCount } / { learningEntry.solvedCount + learningEntry.failedCount}
                </Box>


            </>
        </AppLayout>
    )
}