import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

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
    const navigate = useNavigate()
    //const { collection } = useProblemCollectionContext()
    const { records } = useProblemRecordsContext()
    const { session, advance, isLastIndex, answerCurrent } = usePlaySessionContext()
    console.log("player session", session)
    //const learningRepository = createLearningRepository()
    const { learningRecords, markAnswer } = useLearningRecordsContext()
    
    console.log("session info", session)   
    const currentProblem = getCurrentProblem(session, records)

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
    
    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] || {}
    // モード    
    const mode = getPlayerMode()

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

    return (
        <AppLayout
            footer={
                <>
                    {mode === "problem" && <>
                        <button onClick={() => handleAnswer("solved")}>
                            正解
                        </button>
                        <button onClick={() => handleAnswer("failed")}>
                            不正解
                        </button>

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
                    mode: {mode}
                </Box>
                <Box>
                    成績：{ learningEntry.solvedCount } / { learningEntry.solvedCount + learningEntry.failedCount}
                </Box>


            </>
        </AppLayout>
    )
}