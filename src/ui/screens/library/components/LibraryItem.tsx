import { Box, Stack, Typography, IconButton } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder"; 

import type { Problem } from '@/domain/problem/types/Problem';
import type { LearningEntry } from '@/domain/learning/types';
import { calcAccuracy } from '@/domain/learning/calcAccuracy';
import { formatDate } from '@/utils';

function inDays(date: number): number {
    return (date - Date.now()) / (60*60*24*100)
}

type Props = {
    problem: Problem 
    learningEntry?: LearningEntry
    onToggleStar: (id: string) => void
}

export default function LibraryItem({ problem, learningEntry, onToggleStar }: Props) {
    
    return (
        <Box>
            {/* 一行目: タイトル */}
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                    {problem.title}
                </Typography>
                <IconButton size="small" 
                    onClick={(e) => { e.stopPropagation(); onToggleStar(problem.id)}}>
                    {problem.starred ? <StarIcon fontSize="small" color="warning" /> : 
                    <StarBorderIcon fontSize="small" />}
                </IconButton>
            </Stack>

            <Stack direction="row" justifyContent={"space-between"}>               
            
                <Typography variant="body2" color="text.secondary">
                    {formatDate(problem.createdAt)}
                </Typography>

                {learningEntry && <>
                    <Typography variant="body2" color="text.primary">
                        {(calcAccuracy(learningEntry) * 100).toFixed(1)}%/
                        ef:{ learningEntry.easeFactor.toFixed(2)}/
                        {inDays(learningEntry.nextReviewedAt).toFixed(0)}d
                        
                    </Typography>
                    
                </>
                }
            </Stack>
        </Box>

    );
}