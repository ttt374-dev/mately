import { Box, List, ListItem, Button, Stack, Paper, Typography, Grid, Card, CardHeader  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "../../common/AppLayout"
import type { QueueItem } from '@/domain/fsm/types';
import { buildQueue } from '@/domain/problem/builder/queueBuilder';
import type { ProblemSort, SortKey, SortOrder } from '@/domain/problem/query/types/Sort';
import DeckFilterControl from './components/DeckFilterControl';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useFsmContext } from '@/app/providers/FsmProvider';
import { useStoreContext } from '@/app/providers/StoreProvider';
import type { LearningEntry, LearningRecord } from '@/domain/learning/types';
import type { Problem } from '@/domain/problem/types/Problem';


type StatItem = {
  label: string;
  value: number | string;
};

type Props = {
  items: StatItem[];
  title: string;
  width?: number | string; // optional, Paper の幅
  spacing?: number;        // optional, 行間
};

export const StatList = ({ items, title, spacing = 1 }: Props) => {
  return (
    <Card elevation={1} sx={{ p: 2,  }}>
        <CardHeader title={
            <Typography variant="subtitle2" fontSize="0.9rem" fontWeight={500}>
                {title}
          </Typography>
        }/>
      {items.map((item) => (
        <Box
          key={item.label}
          display="flex"
          justifyContent="space-between"
          mb={spacing}
        >
          <Typography variant="body2" color="textSecondary">
            {item.label}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {item.value}
          </Typography>
        </Box>
      ))}
    </Card>
  );
};

function calcStats(problems: Problem[], learningRecords: LearningRecord){    
    let solvedCount = 0
    let failedCount = 0
    let unansweredProblemCount = 0
    
    problems.map((problem: Problem) => {
    //Object.values(records).map((learningEntity: LearningEntry) => {
        const learningEntity = learningRecords[problem.id]
        if (learningEntity) {
            solvedCount += learningEntity.solvedCount
            failedCount += learningEntity.failedCount
        } else {
            unansweredProblemCount++
        }
    })
    const totalCount = solvedCount + failedCount

    return {
        totalCount, solvedCount, failedCount,
        accuracy: solvedCount / totalCount,
        unansweredProblemCount,
    }    
}


export default function DeckScreen(){
    const fsm = useFsmContext()
    //const deckPlaySession = usePlaySessionContext()
    const stores = useStoreContext()
    //const { problemRecords } = useProblemRecordsContext()
    //const { learningRecords, clearAll } = useLearningRecordsContext()
    //const learningRecords = {}
    const navigate = useNavigate()
    //const [filter, setFilter] = useState<Filter>(createDefaultFilter())
    const { filter: { filter, setFilter }} = useQueryContext()


    const sort: ProblemSort = {
        key: "nextReviewedAt",
        order: "asc"
    }
    const queue: QueueItem[] = buildQueue(stores.problem.problems, sort, filter, stores.learning.records)

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
    const problemMap = new Map(stores.problem.problems.map(p => [p.id, p]));

    // queue を map して problem を取得
    const queuedProblems = queue.map(q => problemMap.get(q.problemId))
        .filter((p): p is Problem => !!p); // null / undefined を除外
    const sessionResult = calcStats(queuedProblems, stores.learning.records)
    const sessionStats = [
        { label: "問題数", value: queue.length },
        { label: "未回答問題数", value: sessionResult.unansweredProblemCount},
        { label: "回答数", value: sessionResult.totalCount},
        { label: "正答数", value: sessionResult.solvedCount},
        { label: "正答率", value: (sessionResult.accuracy * 100).toFixed(1) + "%"  },
    ];
    const totalResult = calcStats(stores.problem.problems, stores.learning.records)
    const totalStats = [
        { label: "問題数", value: stores.problem.problems.length },
        { label: "未回答問題数", value: totalResult.unansweredProblemCount},
        { label: "回答数", value: totalResult.totalCount},
        { label: "正答数", value: totalResult.solvedCount},
        { label: "正答率", value: (totalResult.accuracy * 100).toFixed(1) + "%"  },
    ];
    return (
        <AppLayout 
            header={"Deck"}            
            footer={
                <Stack direction="row" spacing={1}>
                    <Button variant="contained"
                        size="large"
                        fullWidth                        
                        onClick={handleStart}
                        disabled={queue.length === 0}
                    >
                        セッション開始
                    </Button>
                    
                </Stack>
            }
        >
            <Paper elevation={1} sx={{p: 1}}>
                
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <DeckFilterControl filter={filter} setFilter={setFilter} />                    
                    </Grid>
                    <Grid size={6}>
                        <StatList title="セッション" items={sessionStats}/> 
                    </Grid>
                    <Grid size={6}>
                        <StatList title="トータル" items={totalStats}/> 
                    </Grid>
 
                </Grid>
            </Paper>
        </AppLayout>
    )
}