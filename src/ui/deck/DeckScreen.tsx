import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import { useProblemCollectionContext } from '@/app/providers/ProblemCollectionProvider';
import type { PlayerSession, QueueItem } from '@/domain/session/types/';
import { useDeckPlaySessionContext } from '@/app/providers/DeckPlaySessionProvider';
import { useNavigate } from 'react-router-dom';

export default function DeckScreen(){
    const deckPlaySession = useDeckPlaySessionContext()
    const { collection } = useProblemCollectionContext()
    const navigate = useNavigate()

    const handleStart = () => {
        // build queue
        const queue: QueueItem[] = Object.values(collection).map((p) => ({problemId: p.id}))
        
        deckPlaySession.startSession(queue)
        navigate("/player")
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