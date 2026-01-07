import { List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Box, Stack, Checkbox} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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


export default function LibraryScreen() {
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
        const queue: QueueItem[] = [{ problemId: problem.id }]
        //startSession(queue)
        //console.log("library player start", queue)
        //fsm.start(queue)
        //navigate("/player")
        navigate(`/view/${problem.id}`)
    }

    // 削除
    const handleDelete = async (problems: Problem[]) => {        
        stores.problem.removeMany(problems.map((p) => p.id))
    }
    
    //////////////////////////////////////////////////
    return (
        <AppLayout
            header={"Library"}
            /*
            footer={ 
                <LibraryFooterActions
                    onFileSelected={handleSelectFiles}
                    onBackToDeck={() => navigate("/deck")}
                />}
                */
            
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
                        <ListItem disablePadding key={p.id} sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                        }}>
                            <ListItemButton onClick={() => handleSelectProblem(p)}>
                                <ListItemIcon sx={{ minWidth: 16 }} onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        size="small"
                                        edge="start"

                                        checked={isChecked(p.id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleChecked(p.id)
                                        }}
                                    />
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
        </AppLayout>
    )
}