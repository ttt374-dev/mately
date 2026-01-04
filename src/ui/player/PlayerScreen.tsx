
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, ProgramRecord } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemCollectionContext } from '@/app/providers/ProblemCollectionProvider';
import { useDeckPlaySessionContext } from '@/app/providers/DeckPlaySessionProvider';
import { createLearningRepository } from '@/domain/learning/LearningRepository';
import { useLearningProgress } from '../hooks/useLearningProgress';

export default function PlayerScreen(){
    //const { collection } = useProblemCollectionContext()
    const { session, advance } = useDeckPlaySessionContext()
    console.log("player session", session)
    const learningRepository = createLearningRepository()
    const { learningRecord, markSolved } = useLearningProgress(learningRepository)

    const curId = session ? session.queue[session.currentIndex].problemId : "-"  

    const handleSolved = () => { 
        if (session){
            const id = session.queue[session.currentIndex].problemId
            markSolved(id)
            console.log("handle solved", learningRecord)
        }   
        advance()
    }

    return (
        <AppLayout>
            <>
                PLAYER: { session && session.currentIndex}: 
                { curId }
                <button onClick={advance}>
                    進む
                    
                </button>
                <button onClick={handleSolved}>
                    正解
                </button>
            </>
        </AppLayout>
    )
}