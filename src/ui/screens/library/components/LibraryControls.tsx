import { Box, Stack } from "@mui/material"
import LibraryDeleteControl from "./LibraryDeleteControl"
import LibrarySelectionControl from "./LibrarySelectionControl"
import LibrarySortControl from "./LibrarySortControl"
import type { useLibrarySort } from "../hooks/useLibrarySort"
import type { LibraryCheckboxApi, useLibraryCheckbox } from "../hooks/useLibraryCheckbox"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    selectionMode: boolean
    onExitSelectionMode: (v: boolean) => void
    checkedIds: Set<string>
    checkboxApi: LibraryCheckboxApi
    onDelete: (problemIds: string[]) => Promise<void>
    sortApi: ReturnType<typeof useLibrarySort>
}

export function LibraryControls({
    selectionMode, onExitSelectionMode,
    checkedIds,
    checkboxApi,
    onDelete, sortApi
}: Props) {
    return (
        <Stack direction="row">
            {selectionMode &&
                <>
                    <LibrarySelectionControl checkboxApi={checkboxApi} />
                    <LibraryDeleteControl
                        deleteIds={Array.from(checkedIds)}
                        onDelete={onDelete}
                    />
                    <IconButton onClick={ () => onExitSelectionMode(false)}>
                        <CloseIcon/>
                    </IconButton>
                </>}
            <Box sx={{ flexGrow: 1 }} />
            <LibrarySortControl sort={sortApi.sortState} setSortKey={sortApi.setSortKey} setSortOrder={sortApi.setSortOrder} />
        </Stack >
    )
}