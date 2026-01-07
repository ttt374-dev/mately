import { Stack, Divider, Button, IconButton, toggleButtonClasses } from '@mui/material';


export const PlyControl = ({advancePly, retreatPly }: {
    advancePly: () => void
    retreatPly: () => void
}) => {
    return (
        <>
            <Stack spacing={0.5}>
                <Button size="small" variant="outlined" onClick={retreatPly}>
                    ↑ 前の手
                </Button>
                <Button size="small" variant="contained" onClick={advancePly}>
                    ↓ 次の手
                </Button>
            </Stack>
            <Divider />
        </>
    )
}

