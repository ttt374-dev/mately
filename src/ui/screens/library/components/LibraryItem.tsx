import { Box, Typography, IconButton } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder"; import { AppLayout } from "@/ui/common/AppLayout/AppLayout"

import type { Problem } from '@/domain/problem/types/Problem';
import type { LearningEntry } from '@/domain/learning/types';
import { calcAccuracy } from '@/domain/learning/calcAccuracy';
import { formatDate } from '@/utils';

function inDays(date: number): number {
    return (date - Date.now()) / (60*60*24*100)
}
export default function LibraryItem({ problem, learningEntry }: { problem: Problem, learningEntry?: LearningEntry }) {
    return (
        <>
            {/* 一行目: タイトル */}
            <Typography variant="subtitle1" fontWeight="bold">
                {problem.title}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    mt: 0.5,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    登録日: {formatDate(problem.createdAt)}
                </Typography>

                {learningEntry && <>
                    <Typography variant="body2" color="text.primary">
                        {(calcAccuracy(learningEntry) * 100).toFixed(1)}%, 
                        EF:{ learningEntry.easeFactor.toFixed(2)},
                        in {inDays(learningEntry.nextReviewedAt).toFixed(0)} days
                        
                    </Typography>
                    <IconButton size="small">
                        {problem.starred ? <StarIcon fontSize="small" color="warning" /> : <StarBorderIcon fontSize="small" />}
                    </IconButton>
                </>
                }
            </Box>
        </>

    );
}