import { Button, Stack } from "@mui/material";

import ImportFilesButton from "@/ui/common/ImportFilesButton";

export default function LibraryFooterActions({ onFileSelected, onBackToDeck }: {
    onFileSelected: (files: File[]) => Promise<void>
    onBackToDeck: () => void
}) {

    return (
        <Stack direction="row">
            <ImportFilesButton/>
            <Button fullWidth variant='outlined'
                onClick={onBackToDeck}>
                デッキに戻る
            </Button>
        </Stack>
    )
}