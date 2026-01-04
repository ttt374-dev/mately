
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, ProgramRecord } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { createLearningRepository } from '@/domain/learning/LearningRepository';
import { useLearningRecords } from '../hooks/useLearningRecords';
import { useNavigate } from 'react-router-dom';

export default function SummaryScreen(){
    const navigate = useNavigate()
    return (
        <AppLayout
            header={"Summary"}
        >
            <>
                おつかれさまでした。

                <button onClick={()=> navigate("/deck")}>
                    デッキに戻る
                </button>
            </>
        </AppLayout>
    )
}