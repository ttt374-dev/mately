import { Box, List, ListItem, Button, Stack  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "../../common/AppLayout"
import type { QueueItem } from '@/domain/fsm/types';
import { buildQueue } from '@/usecase/listBuilder/queueBuilder';
import type { SortState, SortKey, SortOrder } from '@/domain/problemCatalog/types/Sort';
import DeckFilterControl from './components/DeckFilterControl';
import { useSortFilterStateContext } from '@/app/providers/SortFilterStateProvider';
import { useFsmContext } from '@/app/providers/FsmProvider';
import { useStoreContext } from '@/app/providers/StoreProvider';

export default function DeckScreen(){
    const fsm = useFsmContext()
    //const deckPlaySession = usePlaySessionContext()
    const stores = useStoreContext()
    //const { problemRecords } = useProblemRecordsContext()
    //const { learningRecords, clearAll } = useLearningRecordsContext()
    //const learningRecords = {}
    const navigate = useNavigate()
    //const [filter, setFilter] = useState<Filter>(createDefaultFilter())
    const { filter: { filter, setFilter }} = useSortFilterStateContext()


    const sort: SortState = {
        key: "nextReviewedAt",
        order: "asc"
    }
    const queue: QueueItem[] = buildQueue(stores.problem.records, sort, filter, stores.learning.records)

    const handleStart = () => {
        // build queue
        //const queue: QueueItem[] = Object.values(records).map((p) => ({problemId: p.id}))
        
        fsm.start(queue)
        //deckPlaySession.startSession(queue)
        navigate("/player")
    }
    const handleClearLearning = () => {
        stores.learning.clearAll()
    }
    return (
        <AppLayout 
            header={"Deck"}
            /*
            footer={
                <Stack direction="row" spacing={1}>

                    <Button variant="outlined" onClick={() => navigate("/library")}
                        sx={{flex: 1}}>
                        ライブラリ
                    </Button>
                    
                </Stack>
            }*/
        >
            <Stack p={1} spacing={2}>
                <DeckFilterControl filter={filter} setFilter={setFilter}/>
                <Box>
                    問題数：{ queue.length}
                </Box>

                <Button variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                        //flex: 3,
                        minHeight: 100,
                        alignSelf: "center"
                    }}
                    onClick={handleStart}
                    disabled={queue.length===0}
                    >
                    セッション開始
                </Button>

            </Stack>
        </AppLayout>
    )
}