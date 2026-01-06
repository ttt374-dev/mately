import { Stack, IconButton, Button } from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import type { SxProps, Theme } from "@mui/material/styles";


export const noFocusVisible: SxProps<Theme> = {  // TODO: utils
    '&:focus': {
        outline: 'none',
    },
};


type Props = {
    onPrev: () => void
    onNext: () => void
    onBackToDeck: () => void
    onFinishRun: () => void
}

export default function NavigationControl({ onNext, onPrev, onFinishRun, onBackToDeck }: Props) {
    return (
        <Stack direction="row" gap={2} sx={{ justifyContent: "center" }}>

            <Button sx={noFocusVisible} onClick={onNext}>&gt;</Button>
            <Button sx={noFocusVisible} onClick={onFinishRun}>&gt;&gt;</Button>
            

{/*
            <IconButton sx={{ ...noFocusVisible }} onClick={() => navigateTo("first")}>
                <FirstPageIcon />
            </IconButton>

            <IconButton sx={{ ...noFocusVisible }} onClick={() => navigateTo("prev")}>
                <ChevronLeftIcon />
            </IconButton>
            <IconButton sx={{ ...noFocusVisible }} onClick={() => navigateTo("next")}>
                <ChevronRightIcon />
            </IconButton>
            <IconButton sx={{ ...noFocusVisible }} onClick={() => navigateTo("last")}>
                <LastPageIcon />
            </IconButton>
            */}

        </Stack>)
}