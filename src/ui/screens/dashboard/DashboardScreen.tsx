import { Box, List, ListItem, Button, Stack, Paper, Typography, Grid, Card, CardHeader  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "../../common/AppLayout"
import { buildQueue } from '@/domain/problem/builder/queueBuilder';
import DashboardFilterControl from './components/DashboardFilterControl';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useFsmContext } from '@/app/providers/FsmProvider';
import { useStoreContext } from '@/app/providers/StoreProvider';
import { useEffect, useMemo, useState } from 'react';
import { DeckCard } from './components/DeckCard';
import { applyFilter } from '@/domain/problem/query/applyFilter';


export default function DashboardScreen(){
    const { filter: { filter, setFilter}} = useQueryContext()
    const fsm = useFsmContext()
    const stores = useStoreContext()
    const navigate = useNavigate()

    const problems = stores.problem.problems
    const queriedProblems = useMemo(()=> {
        return applyFilter(problems, filter)
    }, [problems, filter])

    const startMission = () => {
        const queue = buildQueue(queriedProblems)
        fsm.start(queue)
        navigate("/player")        
    }
    ///
    useEffect(() => { setFilter(f => ({...f, isMissionTarget: true}))}, [])
    return (
        <AppLayout
            header={ <>Dashboard</>}
            footer={
                <Button variant="contained" fullWidth onClick={startMission}>
                    開始
                </Button>
            }
        >
            <>
                
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <DeckCard title="deck" problems={queriedProblems} learningRecords={stores.learning.records}/>
                    </Grid>
                    <Grid size={6}>
                        <DeckCard title="All" problems={queriedProblems} learningRecords={stores.learning.records}/>
                    </Grid>
                    <Grid size={12}>
                    <DashboardFilterControl filter={filter} setFilter={setFilter}/>
                    </Grid>
                </Grid>
                
            </>

        </AppLayout>
    )

}