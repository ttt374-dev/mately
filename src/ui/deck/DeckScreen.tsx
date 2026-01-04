import { useState, useEffect } from 'react';
import { Box, List, ListItem, Button, Stack  } from '@mui/material';

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import type { PlaySession, QueueItem } from '@/domain/session/types/';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { useNavigate } from 'react-router-dom';
import { buildQueue } from '@/application/queue/queueBuilder';
import type { SortState, SortKey, SortOrder } from '@/domain/problemCatalog/types/Sort';
import type { Filter } from '@/domain/problemCatalog/types/Filter';
import { createDefaultFilter, createDefaultSort } from '@/domain/problemCatalog/factory';
import DeckFilterControl from './components/DeckFilterControl';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';

export default function DeckScreen(){
    const deckPlaySession = usePlaySessionContext()
    const { records } = useProblemRecordsContext()
    const { learningRecords, clearAll } = useLearningRecordsContext()
    //const learningRecords = {}
    const navigate = useNavigate()
    const [filter, setFilter] = useState<Filter>(createDefaultFilter())

    const sort = createDefaultSort()
    const queue: QueueItem[] = buildQueue(records, sort, filter, learningRecords)

    const handleStart = () => {
        // build queue
        //const queue: QueueItem[] = Object.values(records).map((p) => ({problemId: p.id}))
        
        deckPlaySession.startSession(queue)
        navigate("/player")
    }
    const handleClearLearning = () => {
        clearAll()
    }
    return (
        <AppLayout 
            header={"Deck"}
            footer={
                <Stack direction="row" spacing={1}>
                    <Button fullWidth variant="contained" onClick={handleStart}
                    sx={{ flex: 3}}>
                        開始
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/library")}
                        sx={{flex: 1}}>
                        ライブラリ
                    </Button>
                </Stack>
            }
        >
            <>
                <DeckFilterControl filter={filter} setFilter={setFilter}/>
                <Box>
                    問題数：{ queue.length}
                </Box>

            </>
        </AppLayout>
    )
}