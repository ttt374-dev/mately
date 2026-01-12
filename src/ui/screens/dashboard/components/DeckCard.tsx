
import type { LearningRecord } from '@/domain/learning/types';
import type { Problem } from '@/domain/problem/Problem';
import { Box, List, ListItem, Button, Stack, Paper, Typography, Grid, Card, CardHeader } from '@mui/material'
import { calcDeckStats } from '../utils/calcDeckStats';
import type React from 'react';
import { useMemo } from 'react';
import type { Exercise } from '@/domain/Exercise/Exercise';


type StatItem = {
    label: string;
    value: React.ReactNode;
};

type Props = {
    exercises: Exercise[]
    title: string;    
};

export function DeckCard({ exercises, title}: Props) {
    const stats = calcDeckStats(exercises)

    const statsItems: StatItem[] = useMemo(() => [
        { label: "問題数", value: stats.problemCount},
        { label: "未回答問題数", value: stats.unansweredCount },
        { label: "回答数", value: stats.answeredCount },
        { label: "正答数", value: stats.solvedCount },
        { label: "正答率", value: (stats.accuracy * 100).toFixed(1) + "%"},
    ], [stats])

    return (
        
        <Card>
            <Box p={2}>
            <CardHeader title={
                <Typography variant='subtitle1'>{title}</Typography>} />
            
                { statsItems.map((item) => (                    
                    <Stack key={item.label} justifyContent="space-between" direction="row" p={0}>
                        <Typography variant='body2' color="textSecondary">
                            {item.label}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            { item.value }
                        </Typography>
                        </Stack>                    
                ))}
                
            </Box>
        </Card>
    )
}
