
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, Collection } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemCollectionContext } from '@/app/providers/ProblemCollectionProvider';
import type { DeckPlaySession, QueueItem } from './DeckPlaySession';
import { useDeckPlaySession } from './useDeckplaySession';
import { useDeckPlaySessionContext } from '@/app/providers/DeckPlaySessionProvider';

export default function DeckScreen(){
    const deckPlaySession = useDeckPlaySessionContext()
    const { collection } = useProblemCollectionContext()

    const handleStart = () => {
        // build queue
        const queue: QueueItem[] = Object.values(collection).map((p) => ({problemId: p.id}))
        
        deckPlaySession.startSession(queue)
    }
    return (
        <AppLayout>
            <>
            <Button onClick={handleStart}>
                開始
            </Button>
            </>
        </AppLayout>
    )
}