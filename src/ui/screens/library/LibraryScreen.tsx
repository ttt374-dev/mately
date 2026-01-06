import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
    Box, Stack, Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout/AppLayout"
import type { Problem} from '@/domain/problem/types/Problem';
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

export default function LibraryScreen() {    
    const { records, addProblem, removeMany } = useProblemRecordsContext()
    const { sort: { sortState, setSortKey, setSortOrder }} = useSortFilterStateContext()
    const { learningRecords } = useLearningRecordsContext()
    const libraryList = buildLibraryList(records, sortState, learningRecords)
    const fsm = useFsmContext()
    const { isChecked, checkedIds,
        toggleChecked, clearChecked, selectAllChecked
     } = useLibraryChecked(Object.keys(records))
    const navigate = useNavigate()
    const targetProblems = Object.values(records).filter(e => checkedIds.has(e.id))

    // handlers
    const handleSelectFiles = async (files: File[]) => {
        for (const file of files) {
            try {
                const buf = await file.arrayBuffer();
                const text = new TextDecoder("shift_jis").decode(buf);

                const newProblem = buildProblem(text, file.name)
                console.log("new problem", newProblem)
                newProblem && addProblem(newProblem)
            } catch (e) {
                console.error(`Failed to import file ${file.name}:`, e);
            }
        }
    }

    const handleSelectProblem = (problem: Problem) => {
        const queue: QueueItem[] = [{ problemId: problem.id }]
        //startSession(queue)
        console.log("library player start", queue)
        fsm.start(queue)
        navigate("/player")
    }

    // 削除
    const handleDelete = async (problems: Problem[]) => {
        removeMany(problems)
    }

    //////////////////////////////////////////////////
    return (
        <AppLayout
            header={"Library"}
            footer={
                <LibraryFooterActions 
                        onFileSelected={handleSelectFiles}
                        onBackToDeck={() => navigate("/deck")}
                />
            }
        >
            <Stack direction="row">
                <LibrarySelectionControl
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
            
            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto"  }}>
                <List>
                    {libraryList.map((p) => (
                        <ListItem disablePadding key={p.id}>
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
                                    {p.title}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </AppLayout>
    )
}