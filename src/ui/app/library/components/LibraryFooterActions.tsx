import { Button, Stack } from "@mui/material";

import MultipleFilesButton from "@/ui/shared/MultipleFilesButton";

export default function LibraryFooterActions({ onFileSelected, onBackToDeck }: {
    onFileSelected: (files: File[]) => Promise<void>
    onBackToDeck: () => void
}) {

    return (
        <Stack direction="row">
            <MultipleFilesButton
                onFileSelected={onFileSelected}
                label="インポート"
                useIconButton={false}
                buttonProps={{ fullWidth: true, variant: "outlined" }}
            />
            <Button fullWidth variant='outlined'
                onClick={onBackToDeck}>
                デッキに戻る
            </Button>
        </Stack>
    )
}