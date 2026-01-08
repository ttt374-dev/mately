import { List, Box, Stack, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { buildLibraryList } from '@/usecase/listBuilder/libraryListBuilder';
import LibrarySortControl from './components/LibrarySortControl';
import { useLibraryChecked } from './hooks/useLibraryChecked';
import LibraryDeleteControl from './components/LibraryDeleteControl';
import LibrarySelectionControl from './components/LibrarySelectionControl';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useStoreContext } from '@/app/providers/StoreProvider';
import { useState } from 'react';
import BackupRestoreDialog from '@/ui/common/BackupRestoreDialog';
import { ListMenu } from './components/ListMenu';
import LibraryListItem from './components/LibraryItem';

export default function LibraryScreen() {
    const [backupDialogOpen, setBackupDialogOpen] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false)
    
    const stores = useStoreContext()    
    const { sort: { sortState, setSortKey, setSortOrder } } = useQueryContext()
    const libraryList = buildLibraryList(stores.problem.problems, sortState, stores.learning.records)
    const { isChecked, checkedIds,
        toggleChecked, clearChecked, selectAllChecked
    } = useLibraryChecked(stores.problem.problems.map((p) => p.id))
    const navigate = useNavigate()
    const targetProblems = stores.problem.problems.filter(e => checkedIds.has(e.id))

    // ハンドラー
    const handleSelectProblem = (problem: Problem) => {
        if (selectionMode) {
            toggleChecked(problem.id)
        } else {
            navigate(`/view/${problem.id}`)
        }
    }
    const handleDelete = async (problems: Problem[]) => {        
        const ids = problems.map((p) => p.id)
        stores.problem.removeMany(ids)
        stores.learning.removeMany(ids)
    }
    //////////////////////////////////////////////////
    return (
        <AppLayout
            header={"Library"}
            rightActions={
            <ListMenu onClearAllLearnings={stores.learning.clearAll}
                onBackupDialogOpen={()=>setBackupDialogOpen(true)}
            />}            
        >
            <Stack direction="row">
                { selectionMode && <>
                <LibrarySelectionControl
                    isAllChecked={checkedIds.size == Object.keys(stores.problem.problems).length}
                    onSelectAll={selectAllChecked}
                    onClearAll={clearChecked}
                />
                <LibraryDeleteControl
                    targetProblems={targetProblems}
                    onDelete={handleDelete}
                /></>}
                <Box sx={{ flexGrow: 1 }} />
                <LibrarySortControl sort={sortState} setSortKey={setSortKey} setSortOrder={setSortOrder} />
            </Stack>

            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                <List>
                    {libraryList.map((p) => (                        
                        <LibraryListItem
                            key={p.id}
                            problem={p}
                            selectionMode={selectionMode}
                            isChecked={isChecked(p.id)}
                            onToggleChecked={toggleChecked}
                            onSelect={handleSelectProblem}
                            onEnterSelectionMode={() => setSelectionMode(true)}
                            learningEntry={stores.learning.records[p.id]}
                            onToggleStar={stores.problem.toggleStar}
                        />
                    ))}
                </List>
            </Box>
            { <BackupRestoreDialog open={backupDialogOpen} 
                onClose={()=>setBackupDialogOpen(false)}/>}
        </AppLayout>
    )
}