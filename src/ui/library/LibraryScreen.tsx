
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

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


export default function LibraryScreen(){    
    const navigate = useNavigate()
    const { records, addProblem, removeAll } = useProblemRecordsContext()
    const { startSession } = usePlaySessionContext()
    const { sortState, setSortKey, setSortOrder } = useKifLibrarySort()
    //const sort = createDefaultSort()
    const filter = createDefaultFilter()
    const libraryList = buildLibraryList(records, sortState, filter)

    const handleAddProblem = () => {
        const random = Math.floor(Math.random() * 100) + 1;
        const newProblem = { id: v4(), title: random.toString(), createdAt: Date.now()  }
        addProblem(newProblem)
        console.log("handle add problem", records)
    }
    const handleDeleteAll = () => {
        removeAll()
    }
    

    return (
        <AppLayout
            header={"library"}
            footer={
                <>
                    <Button onClick={handleAddProblem}>
                        追加
                    </Button>
                    <Button onClick={handleDeleteAll}>
                        全削除
                    </Button>
                    <Button onClick={() => navigate("/deck")}>
                        デッキに戻る
                    </Button>
                </>
            }
        >
            <LibrarySortControl sort={sortState} setSortKey={setSortKey} setSortOrder={setSortOrder}/>
            <LibraryList libraryList={libraryList} startSession={startSession}/>
        </AppLayout>
    )
}