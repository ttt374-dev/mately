
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'
import { useNavigate, useLocation } from 'react-router-dom';

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, ProgramRecord } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { createLearningRepository } from '@/domain/learning/LearningRepository';
import { useLearningRecords } from '../hooks/useLearningRecords';
import type { AnswerResult } from '@/domain/learning/types';
import type { PlaySession } from '@/domain/session/types';
import type { PlayerMode } from './types/PlayerMode';

function getCurrentProblem(session: PlaySession | null, records: ProgramRecord): Problem | null {
    const currentProblemId = session && session.queue[session.currentIndex]?.problemId
    return currentProblemId ? records[currentProblemId] ?? null : null;        
}

export default function PlayerScreen(){    
    const navigate = useNavigate()
    //const { collection } = useProblemCollectionContext()
    const { records } = useProblemRecordsContext()
    const { session, advance, isLastIndex } = usePlaySessionContext()
    console.log("player session", session)
    const learningRepository = createLearningRepository()
    const { learningRecord, markAnswer } = useLearningRecords(learningRepository)

    console.log("session info", session)   
    const currentProblem = getCurrentProblem(session, records)

    // モード
    const location = useLocation();
    const state = location.state as { mode?: PlayerMode } | undefined;
    const mode: PlayerMode = state?.mode ?? "problem"

    const handleAnswer = (answer: AnswerResult) => { 
        if (currentProblem){                                   
            //markSolved(id)
            markAnswer(currentProblem.id, answer)
            console.log("handle solved", learningRecord)
        }   

        if (isLastIndex){
            navigate("/summary")
        } else {
            advance()
        }                  
    }

    return (
        <AppLayout
            footer={session !== null &&
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
                {currentProblem === null ? (
                    <div>
                        セッションがありません
                        <button onClick={()=>navigate("/deck")}>
                            デッキに戻る
                        </button>

                    </div>
                ) : (
                    <div>Player: [{session?.currentIndex}] {currentProblem.id}</div>
                )}

                

            </>
        </AppLayout>
    )
}