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
import type { SortState } from '@/domain/problem/query/types';
import { applyQuery } from '@/domain/problem/query/applyQuery';


export default function DashboardScreen(){
    //const { filter: { filter, api: { setFilter} }} = useQueryContext()
    const { state, setFilter, } = useQueryContext()
    const fsm = useFsmContext()    
    const navigate = useNavigate()

    const exercises = useStoreContext().exercises

    //const problems = stores.problem.problems
    //const learningRecords = stores.learning.records
    const queriedExercises = useMemo(()=> {
        //console.log("reload query problems", problems, filter)
        const sort: SortState = {
            key: "nextReviewedAt",
            order: "asc",
        }
        
        return applyQuery(exercises, sort, state.filterState)
    }, [exercises, state.filterState])

    const startMission = () => {        
        fsm.start(buildQueue(queriedExercises))
        navigate("/player")        
    }
    ///
    //useEffect(() => { setFilter(f => ({...f, isMissionTarget: true}))}, [])
    useEffect(() => { setFilter( {isMissionTarget: true})}, [])
    return (
        <AppLayout
            header={ <>Dashboard</>}
            footer={
                <Button variant="contained" fullWidth 
                onClick={startMission}>
                    ミッション開始
                </Button>
            }
        >
            <>
                
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <DeckCard title="Mission" exercises={queriedExercises} />
                    </Grid>
                    <Grid size={6}>
                        { /* <DeckCard title="All" exercises={problems} />*/ }
                    </Grid>           
                    <Grid size={12}>
                    <DashboardFilterControl/>
                    </Grid>
                </Grid>
                
            </>

        </AppLayout>
    )

}