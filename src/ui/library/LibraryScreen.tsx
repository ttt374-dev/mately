
import { useState, useEffect } from 'react';
import { v4 } from 'uuid'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
    Box, Stack, Button, Checkbox } from '@mui/material';


import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, ProblemRecord } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemRecords } from '../hooks/useProblemRecords';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { useNavigate } from 'react-router-dom';
import type { QueueItem } from '@/domain/session/types';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import { createDefaultFilter, createDefaultSort } from '@/domain/problemCatalog/factory';
import { buildLibraryList } from '@/application/library/libraryListBuilder';
import LibraryList from './components/LibraryList';
import LibrarySortControl from './components/LibrarySortControl';
import { useKifLibrarySort } from './hooks/useLibrarySort';
import MultipleFilesButton from '@/shared/components/MultipleFilesButton';
import { useLibraryChecked } from './hooks/useLibraryChecked';
import LibraryDeleteControl from './components/LibraryDeleteControl';
import LibrarySelectionControl from './components/LibrarySelectionControl';


export default function LibraryScreen() {
    const navigate = useNavigate()
    const { records, addProblem, removeAll, removeMany } = useProblemRecordsContext()
    const { startSession } = usePlaySessionContext()
    const { sortState, setSortKey, setSortOrder } = useKifLibrarySort()
    //const sort = createDefaultSort()
    const filter = createDefaultFilter()
    const libraryList = buildLibraryList(records, sortState, filter)

    const handleAddProblem = () => {
        const random = Math.floor(Math.random() * 100) + 1;
        const newProblem = { id: v4(), title: random.toString(), createdAt: Date.now() }
        addProblem(newProblem)
        console.log("handle add problem", records)
    }
    const handleDeleteAll = () => {
        removeAll()
    }
    const handleSelectFiles = async (files: File[]) => {
        files.forEach((file: File) => {
            const newProblem = {
                id: v4(),
                title: file.name, createdAt: Date.now()
            }
            addProblem(newProblem)
        })
    }

    const handleSelectProblem = (problem: Problem) => {
        const queue: QueueItem[] = [{ problemId: problem.id }]
        startSession(queue)
        navigate("/player", { state: { mode: "review" } })
    }

    // 選択
    const { isChecked, checkedIds,
        setCheckedIds, toggleChecked, clearChecked, selectAllChecked
     } = useLibraryChecked(Object.keys(records))
    //const isChecked = (poblemId: string) => false
    //const toggleChecked = (problemId: string) => { }
    const targetProblems = Object.values(records).filter(e => checkedIds.has(e.id))

    // 削除
    const handleDelete = async (problems: Problem[]) => {
        removeMany(problems)
    }

    return (
        <AppLayout
            header={"library"}
            footer={
                <Stack direction="row">
                    <MultipleFilesButton
                        onFileSelected={handleSelectFiles}
                        label="インポート"
                        useIconButton={false}
                    />

                    <Button onClick={handleAddProblem}>
                        追加
                    </Button>
                    <Button onClick={handleDeleteAll}>
                        全削除
                    </Button>
                    <Button onClick={() => navigate("/deck")}>
                        デッキに戻る
                    </Button>
                </Stack>
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
            <Box sx={{ maxHeight: "100%", overflowY: "auto" }}>
                <List>
                    {libraryList.map((p, i) => (
                        <ListItem disablePadding
                            key={i}
                            onClick={() => handleSelectProblem(p)}>
                            <ListItemButton>
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
                                    {p.id}: {p.title}
                                </ListItemText>
                            </ListItemButton>

                        </ListItem>
                    ))}
                </List>
            </Box>
        </AppLayout>
    )
}