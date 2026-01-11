
import type { LearningEntry } from '@/domain/learning/types';
import { inDays } from '@/ui/screens/library/components/LibraryItemText';
import { Stack, Typography, Divider, } from '@mui/material';


function Stat({ label, value }: { label: string; value: number }) {
    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
                {value}
            </Typography>
        </Stack>
    )
}

function calcRate(solved = 0, failed = 0) {
    const total = solved + failed
    if (total === 0) return 0
    return Math.round((solved / total) * 100)
}
export const ResultSummary = ({ learningEntry }: {
    learningEntry: LearningEntry,
    
}) => {
    return (
        <Stack direction="column" alignItems="center" justifyContent="space-between" >
            <Stack direction="row" spacing={1} >
                <Stat label="正" value={learningEntry.solvedCount} />
                <Stat label="誤" value={learningEntry.failedCount} />
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="success.main"
                    textAlign="right"
                >
                    {calcRate(learningEntry.solvedCount, learningEntry.failedCount)} %

                </Typography>
            </Stack>
            <Stack direction="row">
                <Typography variant="body2">ef:{`${learningEntry.easeFactor.value.toFixed(2)}`}  /</Typography> 
                <Typography variant="body2">/ in {inDays(learningEntry.nextReviewedAt?.value ?? 0).toFixed(0)}d</Typography>
            </Stack>
        </Stack>
    )
}