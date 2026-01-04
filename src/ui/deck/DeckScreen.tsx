import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import type { PlaySession, QueueItem } from '@/domain/session/types/';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { useNavigate } from 'react-router-dom';

export default function DeckScreen(){
    const deckPlaySession = usePlaySessionContext()
    const { collection } = useProblemRecordsContext()
    const navigate = useNavigate()

    const handleStart = () => {
        // build queue
        const queue: QueueItem[] = Object.values(collection).map((p) => ({problemId: p.id}))
        
        deckPlaySession.startSession(queue)
        navigate("/player")
    }
    return (
        <AppLayout 
            header={"Deck"}
            footer={
                <Button onClick={handleStart}>
                    開始
                </Button>
            }
        >
            <>
            
            </>
        </AppLayout>
    )
}