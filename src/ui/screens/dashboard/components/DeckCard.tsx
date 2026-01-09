
import type { LearningRecord } from '@/domain/learning/types';
import type { Problem } from '@/domain/problem/types/Problem';
import { Box, List, ListItem, Button, Stack, Paper, Typography, Grid, Card, CardHeader } from '@mui/material';
import { calcStats } from '../utils/calcStats';



type StatItem = {
    label: string;
    value: number | string;
};

type Props = {
    problems: Problem[]
    title: string;
    learningRecords: LearningRecord
};

export function DeckCard({ problems, title, learningRecords }: Props) {
    const stats = calcStats(problems, learningRecords)

    const statsItems: StatItem[] = [
        { label: "問題数", value: stats.totalCount },
        { label: "未回答問題数", value: stats.unansweredProblemCount },
        { label: "回答数", value: stats.totalCount },
        { label: "正答数", value: stats.solvedCount },
        { label: "正答率", value: stats.accuracy ? (stats.accuracy * 100).toFixed(1) + "%"  : "-"}  ,
    ];

    return (
        
        <Card>
            <Box p={2}>
            <CardHeader title={
                <Typography variant='subtitle1'>{title}</Typography>} />
            
                { statsItems.map((item) => (                    
                    <Stack justifyContent="space-between" direction="row" p={0}>
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
