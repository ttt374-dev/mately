import { List, Box, Stack, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout"
import type { Problem } from '@/domain/problem/Problem';
import { useQueryContext } from '@/app/providers/QueryProvider';
import { useState } from 'react';
import BackupRestoreDialog from '@/ui/common/BackupRestoreDialog';
import { LibraryListMenu } from './components/LibraryListMenu';
import LibraryListItem from './components/LibraryItem';
import { useLibraryStore } from './hooks/useLibraryStore';
import { LibraryControls } from './components/LibraryControls';
import { useLibraryCheckbox } from './hooks/useLibraryCheckbox';
import { useFsmContext } from '@/app/providers/FsmProvider';
import { buildQueue } from '@/domain/problem/builder';
import ProblemDetailDialog from '../../common/ProblemDetailDialog/ProblemDetailDialog';
import { useProblemDetailDialog } from '@/application/useProblemDialog';
import { useToast } from '@/app/providers/ToastProvider';
import { useImportFiles } from '@/application/useImportFiles';

///////////////////////////////////////////////
export default function LibraryScreen() {    
    //const [index, setIndex] = useState(0)
    const toast = useToast()

    const [selectionMode, setSelectionMode] = useState(false)
    const [backupDialogOpen, setBackupDialogOpen] = useState(false)
    const { importFiles } = useImportFiles()
    const fsm = useFsmContext()
    const { learningRecords, libraryList,
        removeMany, clearAllLearnings, toggleStar,        
    } = useLibraryStore()
       
    const { checkedIds, api: checkboxApi } = useLibraryCheckbox(libraryList.map((p) => p.id))

    //const { sortState, api: sortApi } = useQueryContext().sort
    const { state: { sortState }, setSort } = useQueryContext()
    const navigate = useNavigate()

    // ハンドラー
        //// Dialog用
    const handleAfterDelete = () => {        
        //toast({message: `削除しました: ${currentProblem.title}`})
        //next()          // TODO
    }
    const dialog = useProblemDetailDialog(handleAfterDelete)
    const handleSelectProblem = (problem: Problem, index: number) => {        
        if (selectionMode) {
            checkboxApi.toggleChecked(problem.id)
        } else {
            dialog.openDialog(problem)
            //openDetailDialog(currentProb)
            
            //navigate(`/view/${problem.id}`)
            //fsm.start(buildQueue(libraryList), index)
            //navigate("/player")
        }
    }    
    const handleNavigateToPlayer = (problemId: string) => {

        const index = libraryList.findIndex(p => p.id === problemId)
        fsm.start(buildQueue(libraryList), index)
        navigate("/player")
        //navigate(`/view/${problemId}`)
    }
    //// Dialog用
    const handleImportFiles = async (files: File[]) => {        
        const result = await importFiles(files)
        if (result.ok) {
            toast({ message: `${result.count} 件インポートしました`, severity: "info" })
        } else {
            toast({ message: result.message, severity: "error" })
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
                onImportFiles={handleImportFiles}          
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
                setSort={setSort}
            />            

            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                <List>
                    {libraryList.map((p, i) => (                        
                        <LibraryListItem
                            key={p.id}
                            problem={p}
                            selectionMode={selectionMode}
                            isChecked={checkboxApi.isChecked(p.id)}
                            onToggleChecked={checkboxApi.toggleChecked}
                            onSelect={() => handleSelectProblem(p, i)}
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

            {dialog.problem && 
            <ProblemDetailDialog 
                open={dialog.open}
                problem={dialog.problem}
                onUpdateTitle={dialog.updateTitle}
                onConfirm={handleNavigateToPlayer}
                onClose={dialog.closeDialog}
                onDelete={dialog.deleteProblem}       
                onResetLearning={dialog.resetLearning}         
                learningEntry={learningRecords[dialog.problem.id]}
            />}


        </AppLayout>
    )
}