

import { Stack, Typography, Divider, } from '@mui/material';


export const FsmStatus = ({index, length}: {
    index: number,
    length: number
}) => {
    return (
        <Typography variant="body2" fontWeight="bold">            
            { `${index} / ${length}` }
        </Typography>
    )
}