import { List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Box, Stack, Checkbox,
    IconButton, MenuItem,
    Menu} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from "@mui/icons-material/MoreVert"

import { AppLayout } from "@/ui/common/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import type { QueueItem } from '@/domain/fsm/types';
import { buildLibraryList } from '@/usecase/listBuilder/libraryListBuilder';
import LibrarySortControl from './components/LibrarySortControl';
import { useLibraryChecked } from './hooks/useLibraryChecked';
import LibraryDeleteControl from './components/LibraryDeleteControl';
import LibrarySelectionControl from './components/LibrarySelectionControl';
import { useSortFilterStateContext } from '@/app/providers/SortFilterStateProvider';
import LibraryItem from './components/LibraryItem';
import { useStoreContext } from '@/app/providers/StoreProvider';
import { useRef, useState } from 'react';
import { useToast } from '@/app/providers/ToastProvider';
import ImportFilesButton from '@/ui/common/ImportFilesButton';
import BackupRestoreDialog from '@/ui/common/BackupRestoreDialog';
import { ListMenu } from './components/ListMenu';
import { createDeleteProblemUsecase } from '@/usecase/deleteProblem/deleteProblemUsecase';
import { useRepositoryContext } from '@/app/providers/RepositoryProvider';

function useDeleteProblem(){
    const repos = useRepositoryContext()
    const stores = useStoreContext()
    const usecase = createDeleteProblemUsecase(repos.problem, repos.learning)
    
    const deleteProblem = async (problemId: string) => {
        await usecase.execute(problemId)
        await stores.problem.reload()
        await stores.learning.reload()
    }
    const deleteProblems = async(ids: string[]) => {
        await usecase.executeMany(ids)
        await stores.problem.reload()
        await stores.learning.reload()
    }
    return {
        deleteProblem, deleteProblems
    }
}
export default function LibraryScreen() {
    const [backupDialogOpen, setBackupDialogOpen] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false)
    const toggleSelectionMode = () => { setSelectionMode(!selectionMode)}

    const stores = useStoreContext()    
    //const { problemRecords, removeMany, toggleStar } = useProblemRecordsContext()
    const { sort: { sortState, setSortKey, setSortOrder } } = useSortFilterStateContext()
    //const { learningRecords } = useLearningRecordsContext()
    const libraryList = buildLibraryList(stores.problem.problems, sortState, stores.learning.records)
    //const fsm = useFsmContext()
    const { isChecked, checkedIds,
        toggleChecked, clearChecked, selectAllChecked
    } = useLibraryChecked(stores.problem.problems.map((p) => p.id))
    const navigate = useNavigate()
    const targetProblems = stores.problem.problems.filter(e => checkedIds.has(e.id))

    const handleSelectProblem = (problem: Problem) => {
        if (selectionMode){                       
            } else {
            navigate(`/view/${problem.id}`)
        }
    }

    // 削除
    const { deleteProblems } = useDeleteProblem()
    const handleDelete = async (problems: Problem[]) => {        
        const ids = problems.map((p) => p.id)
        deleteProblems(ids)
        //stores.problem.removeMany(problems.map((p) => p.id))
    }
    // 長押し
    // 長押しで edit mode / view mode 切り替え
    const LONG_PRESS_MS = 500;
    const timerRef = useRef<number | null>(null);
    const longPressedRef = useRef(false);

    const onPressStart = (entryId: string) => {
        longPressedRef.current = false;

        timerRef.current = window.setTimeout(() => {
            longPressedRef.current = true;
            toggleChecked(entryId)
            toggleSelectionMode()
            //toggleEditMode()
        }, LONG_PRESS_MS);
    }

    const onPressEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
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
                <LibrarySelectionControl
                    isAllChecked={checkedIds.size == Object.keys(stores.problem.problems).length}
                    onSelectAll={selectAllChecked}
                    onClearAll={clearChecked}
                />
                <LibraryDeleteControl
                    targetProblems={targetProblems}
                    onDelete={handleDelete}
                />
                <Box sx={{ flexGrow: 1 }} />
                <LibrarySortControl sort={sortState} setSortKey={setSortKey} setSortOrder={setSortOrder} />
            </Stack>

            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                <List>
                    {libraryList.map((p) => (
                        <ListItem disablePadding 
                            key={p.id}
                            onMouseDown={() => onPressStart(p.id)}
                            onMouseUp={onPressEnd}
                            onMouseLeave={onPressEnd}
                            onTouchStart={() => onPressStart(p.id)}
                            onTouchEnd={onPressEnd}                                                                                   
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                            }}>
                            <ListItemButton onClick={() => {
                                if (longPressedRef.current) return
                                handleSelectProblem(p)
                            }
                            }>
                                <ListItemIcon sx={{ minWidth: 16 }} onClick={(e) => e.stopPropagation()}>
                                    {selectionMode &&
                                        <Checkbox                                        
                                        size="small"
                                        edge="start"

                                        checked={isChecked(p.id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleChecked(p.id)
                                        }}
                                    />
}
                                </ListItemIcon>

                                <ListItemText>
                                    <LibraryItem 
                                        problem={p} learningEntry={stores.learning.records[p.id]}
                                        onToggleStar={stores.problem.toggleStar}
                                    />
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            { <BackupRestoreDialog open={backupDialogOpen} 
                    onClose={()=>setBackupDialogOpen(false)}/>}
        </AppLayout>
    )
}