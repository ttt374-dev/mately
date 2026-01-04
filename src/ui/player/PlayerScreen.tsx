
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, ProgramRecord } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { createLearningRepository } from '@/domain/learning/LearningRepository';
import { useLearningRecords } from '../hooks/useLearningRecords';
import type { AnswerResult } from '@/domain/learning/types';


export default function PlayerScreen(){
    const navigate = useNavigate()
    //const { collection } = useProblemCollectionContext()
    const { session, advance, isLastIndex } = usePlaySessionContext()
    console.log("player session", session)
    const learningRepository = createLearningRepository()
    const { learningRecord, markAnswer } = useLearningRecords(learningRepository)

    const curId = session ? session.queue[session.currentIndex].problemId : "-"  

    const handleAnswer = (answer: AnswerResult) => { 
        if (session){
            const id = session.queue[session.currentIndex].problemId
            //markSolved(id)
            markAnswer(id, answer)
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
            footer={
                <>
                <button onClick={() => handleAnswer("solved")}>
                    正解
                </button>
                <button onClick={() => handleAnswer("failed")}>
                    不正解
                </button>
                </>
            }
        >
            <>
                PLAYER: { session && session.currentIndex}: 
                { curId }                


            </>
        </AppLayout>
    )
}