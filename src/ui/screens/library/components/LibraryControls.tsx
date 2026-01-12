import { Box, Stack } from "@mui/material"
import LibraryDeleteControl from "./LibraryDeleteControl"
import LibrarySelectionControl from "./LibrarySelectionControl"
import LibrarySortControl from "./LibrarySortControl"
import type { LibraryCheckboxApi, useLibraryCheckbox } from "../hooks/useLibraryCheckbox"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type { SortState } from "@/domain/Exercise/query/types"

type Props = {
    selectionMode: boolean
    onExitSelectionMode: (v: boolean) => void
    checkedIds: Set<string>
    checkboxApi: LibraryCheckboxApi
    onDelete: (problemIds: string[]) => Promise<void>
    sortState: SortState
    setSort: (partial: Partial<SortState>) => void
}

export function LibraryControls({
    selectionMode, onExitSelectionMode, onDelete, 
    checkedIds, checkboxApi,    
    sortState, setSort,
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
            <LibrarySortControl sort={sortState} setSort={setSort}/>
        </Stack >
    )
}