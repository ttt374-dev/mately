
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
export const ResultSummary = ({solvedCount, failedCount}: {
    solvedCount: number,
    failedCount: number,    
}) => {
    return (
        <Stack direction = "row" alignItems = "center" justifyContent = "space-between" >
            < Stack direction = "row" spacing = { 1} >
                    <Stat label="正" value={solvedCount} />
                    <Stat label="誤" value={failedCount} />
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="success.main"
                        textAlign="right"
                    >
                        {calcRate(solvedCount, failedCount) } %
                        
                    </Typography> 
                </Stack>
        </Stack>
    )
}