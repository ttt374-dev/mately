import { Stack, Divider, Button, IconButton, toggleButtonClasses } from '@mui/material';


export const PlyControl = ({advancePly, retreatPly, disabled = false }: {
    advancePly: () => void
    retreatPly: () => void
    disabled?: boolean
}) => {
    return (
        <>
            <Stack spacing={0.5}>
                <Button size="small" variant="outlined" onClick={retreatPly} disabled={disabled}>
                    ↑ 前の手
                </Button>
                <Button size="small" variant="contained" onClick={advancePly} disabled={disabled}>
                    ↓ 次の手
                </Button>
            </Stack>
            <Divider />
        </>
    )
}

