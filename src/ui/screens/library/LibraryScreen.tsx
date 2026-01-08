import { List, Box, Stack, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useState } from 'react';
import BackupRestoreDialog from '@/ui/common/BackupRestoreDialog';
import { ListMenu } from './components/ListMenu';
import LibraryListItem from './components/LibraryItem';
import { useLibraryStore } from './hooks/useLibraryStore';
import { LibraryControls } from './components/LibraryControls';
import { useLibraryCheckbox } from './hooks/useLibraryCheckbox';

///////////////////////////////////////////////
export default function LibraryScreen() {
    const { learningRecords, libraryList,
        removeMany, clearAllLearnings, toggleStar,        
    } = useLibraryStore()
    const [backupDialogOpen, setBackupDialogOpen] = useState(false)
    const [selectionMode, setSelectionMode] = useState(false)
    
    const { checkedIds, api: checkboxApi } = useLibraryCheckbox(libraryList.map((p) => p.id))
    const { toggleChecked, isChecked, clearAll: clearAllCheckbox } = checkboxApi
        const { sort: sortApi }= useQueryContext()
        const navigate = useNavigate()

    // ハンドラー
    const handleSelectProblem = (problem: Problem) => {        
        if (selectionMode) {
            toggleChecked(problem.id)
        } else {
            navigate(`/view/${problem.id}`)
        }
    }
    const handleDelete = async (ids: string[]) => {                
        await removeMany(ids)
    }
    //////////////////////////////////////////////////
    return (
        <AppLayout
            header={"Library"}
            rightActions={
            <ListMenu onClearAllLearnings={clearAllLearnings}
                onBackupDialogOpen={()=>setBackupDialogOpen(true)}
            />}            
        >            
            <LibraryControls
                selectionMode={selectionMode}
                onExitSelectionMode={(v: boolean) => { setSelectionMode(v); clearAllCheckbox()}}
                checkedIds={checkedIds}
                checkboxApi={checkboxApi}                
                onDelete={handleDelete}
                sortApi={sortApi}
            />            

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
                            learningEntry={learningRecords[p.id]}
                            onToggleStar={toggleStar}
                        />
                    ))}
                </List>
            </Box>
            { <BackupRestoreDialog open={backupDialogOpen} 
                onClose={()=>setBackupDialogOpen(false)}/>}
        </AppLayout>
    )
}