import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import type { PlaySession, QueueItem } from '@/domain/session/types/';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { useNavigate } from 'react-router-dom';
import { buildQueue } from '@/application/queue/queueBuilder';
import type { SortState, SortKey, SortOrder } from '@/domain/problemCatalog/types/Sort';
import type { Filter } from '@/domain/problemCatalog/types/Filter';
import { createDefaultFilter, createDefaultSort } from '@/domain/problemCatalog/factory';

export default function DeckScreen(){
    const deckPlaySession = usePlaySessionContext()
    const { records } = useProblemRecordsContext()
    const navigate = useNavigate()

    // キュー
    //const queue: QueueItem[] = Object.values(records).map((p) => ({problemId: p.id}))
    const sort = createDefaultSort()
    const filter = createDefaultFilter()
    //const sort: SortState = {key: "title", order: "asc"}
    //const filter: Filter = {unansweredOnly: false, dueOnly: false}

    const queue: QueueItem[] = buildQueue(records, sort, filter)
    

    const handleStart = () => {
        // build queue
        //const queue: QueueItem[] = Object.values(records).map((p) => ({problemId: p.id}))
        
        deckPlaySession.startSession(queue)
        navigate("/player")
    }
    return (
        <AppLayout 
            header={"Deck"}
            footer={<>
                <Button onClick={handleStart}>
                    開始
                </Button>
                <Button onClick={()=>navigate("/library")}>
                    ライブラリー
                </Button>
                </>
            }
        >
            <>
                問題数：{ queue.length}


            </>
        </AppLayout>
    )
}