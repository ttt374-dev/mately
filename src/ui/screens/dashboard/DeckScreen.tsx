import { Box, List, ListItem, Button, Stack, Paper, Typography, Grid, Card, CardHeader  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "../../common/AppLayout"
import { buildQueue } from '@/domain/problem/builder/queueBuilder';
import type { SortState } from '@/domain/problem/query/types/Sort';
import DashboardFilterControl from './components/DashboardFilterControl';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useFsmContext } from '@/app/providers/FsmProvider';
import { useStoreContext } from '@/app/providers/StoreProvider';
import { useEffect, useMemo, useState } from 'react';
import { DeckCard } from './components/DeckCard';
import { useDeckStats } from './hooks/useDeckStats';
import { applyQuery } from '@/domain/problem/query/applyQuery';

type Deck = "deck" | "all"

export default function DashboardScreen(){
    const [selected, setSelected] = useState<Deck>("deck");
    const fsm = useFsmContext()
    const stores = useStoreContext()
    const navigate = useNavigate()
    const { filter: { filter, setFilter }} = useQueryContext()

    useEffect(() => { console.log("selected", selected) }, [selected])
    const sort: SortState = {
        key: "nextReviewedAt",
        order: "asc"
    }
    const queriedProblems = useMemo(()=> {
        return applyQuery(stores.problem.problems, sort, filter, stores.learning.records)
    }, [stores.learning.records, sort, filter ])

    const handleStart = () => {
        const r = selected ==="deck" ? queriedProblems : stores.problem.problems
        fsm.start(buildQueue(r))                
        
        navigate("/player")
    }
    const { sessionStats, totalStats} = useDeckStats(queriedProblems, stores.problem.problems, stores.learning.learningRecords)
    return (
        <AppLayout 
            header={"Deck"}            
            footer={
                <Stack direction="row" spacing={1}>
                    <Button variant="contained"
                        size="large"
                        fullWidth                        
                        onClick={handleStart}                        
                    >
                        セッション開始
                    </Button>
                    
                </Stack>
            }
        >
            
            <Paper elevation={1} sx={{p: 1}}>                
                <Grid container spacing={1}>
                    <Grid size={6} onClick={()=>setSelected("deck")}                        
                    >
                        
                        <DeckCard title="カスタム" items={sessionStats} selected={
                            selected === "deck"
                        } />

                    </Grid>
                    <Grid size={6} onClick={()=>setSelected("all")}
                        sx={{
                              cursor: "pointer",
                            border: selected === "all" ? "20px" : "1px"}}
                        >
                        <DeckCard title="すべて" items={totalStats} selected={selected==="all"}/> 
                    </Grid>
 
                    <Grid size={12}>
                        <DashboardFilterControl filter={filter} setFilter={setFilter} />                    
                    </Grid>
                    
                </Grid>
            </Paper>
        </AppLayout>
    )
}