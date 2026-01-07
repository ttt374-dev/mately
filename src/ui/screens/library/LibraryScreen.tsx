import {
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Box, Stack, Checkbox} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import type { QueueItem } from '@/domain/fsm/types';
import { buildLibraryList } from '@/usecase/listBuilder/libraryListBuilder';
import LibrarySortControl from './components/LibrarySortControl';
import { useLibraryChecked } from './hooks/useLibraryChecked';
import LibraryDeleteControl from './components/LibraryDeleteControl';
import LibrarySelectionControl from './components/LibrarySelectionControl';
import { buildProblem } from '@/domain/problem/factory/';
import LibraryFooterActions from './components/LibraryFooterActions';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { useSortFilterStateContext } from '@/app/providers/SortFilterStateProvider';
import { useFsmContext } from '@/app/providers/FsmProvider';
import LibraryItem from './components/LibraryItem';


export default function LibraryScreen() {
    const { problemRecords, removeMany, toggleStar } = useProblemRecordsContext()
    const { sort: { sortState, setSortKey, setSortOrder } } = useSortFilterStateContext()
    const { learningRecords } = useLearningRecordsContext()
    const libraryList = buildLibraryList(problemRecords, sortState, learningRecords)
    //const fsm = useFsmContext()
    const { isChecked, checkedIds,
        toggleChecked, clearChecked, selectAllChecked
    } = useLibraryChecked(Object.keys(problemRecords))
    const navigate = useNavigate()
    const targetProblems = Object.values(problemRecords).filter(e => checkedIds.has(e.id))

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
        removeMany(problems)
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
                    isAllChecked={checkedIds.size == Object.keys(problemRecords).length}
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
                                        problem={p} learningEntry={learningRecords[p.id]}
                                        onToggleStar={toggleStar}
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