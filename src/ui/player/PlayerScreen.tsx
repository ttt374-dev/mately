
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, Collection } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemCollectionContext } from '@/app/providers/ProblemCollectionProvider';
import { useDeckPlaySessionContext } from '@/app/providers/DeckPlaySessionProvider';

export default function PlayerScreen(){
    const { session, advance } = useDeckPlaySessionContext()
    console.log("player session", session)

    const curId = session ? session.queue[session.currentIndex].problemId : "-"  

    return (
        <AppLayout>
            <>
                PLAYER: { session && session.currentIndex}: 
                { curId }
                <button onClick={advance}>
                    進む
                    
                </button>
            </>
        </AppLayout>
    )
}