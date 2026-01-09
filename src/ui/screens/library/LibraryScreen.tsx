import { List, Box, Stack, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useState } from 'react';
import BackupRestoreDialog from '@/ui/common/BackupRestoreDialog';
import { LibraryListMenu } from './components/LibraryListMenu';
import LibraryListItem from './components/LibraryItem';
import { useLibraryStore } from './hooks/useLibraryStore';
import { LibraryControls } from './components/LibraryControls';
import { useLibraryCheckbox } from './hooks/useLibraryCheckbox';

///////////////////////////////////////////////
export default function LibraryScreen() {    
    const [selectionMode, setSelectionMode] = useState(false)
    const [backupDialogOpen, setBackupDialogOpen] = useState(false)
    

    const { learningRecords, libraryList,
        removeMany, clearAllLearnings, toggleStar,        
    } = useLibraryStore()
       
    const { checkedIds, api: checkboxApi } = useLibraryCheckbox(libraryList.map((p) => p.id))
    const { sortState, api: sortApi } = useQueryContext().sort
    const navigate = useNavigate()

    // ハンドラー
    const handleSelectProblem = (problem: Problem) => {        
        if (selectionMode) {
            checkboxApi.toggleChecked(problem.id)
        } else {
            navigate(`/view/${problem.id}`)
        }
    }    
    //////////////////////////////////////////////////
    return (
        <AppLayout
            header={"Library"}
            rightActions={
            <LibraryListMenu 
                onClearAllLearnings={clearAllLearnings}
                onBackupDialogOpen={()=>setBackupDialogOpen(true)}                
            />}            
        >            
            <LibraryControls
                selectionMode={selectionMode}
                onExitSelectionMode={(v: boolean) => { 
                    setSelectionMode(v); checkboxApi.clearAll()}
                }
                checkedIds={checkedIds}
                checkboxApi={checkboxApi}                
                onDelete={removeMany}
                sortState={sortState}
                sortApi={sortApi}
            />            

            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                <List>
                    {libraryList.map((p) => (                        
                        <LibraryListItem
                            key={p.id}
                            problem={p}
                            selectionMode={selectionMode}
                            isChecked={checkboxApi.isChecked(p.id)}
                            onToggleChecked={checkboxApi.toggleChecked}
                            onSelect={handleSelectProblem}
                            onEnterSelectionMode={() => setSelectionMode(true)}
                            learningEntry={learningRecords[p.id]}
                            onToggleStar={toggleStar}
                        />
                    ))}
                </List>
            </Box>
            { /* Dialogs */ }
            <BackupRestoreDialog open={backupDialogOpen} 
                onClose={()=>setBackupDialogOpen(false)}/>

            
        </AppLayout>
    )
}