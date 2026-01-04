
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
import { createDefaultFilter, createDefaultSort } from '@/domain/problemRecord/factory';
import { buildLibraryList } from '@/application/library/libraryListBuilder';


export default function LibraryScreen(){    
    const navigate = useNavigate()
    //const repository = createProblemRepository()
    //const { collection, addProblem, removeAll } = useProblemCollection(repository)
    const { records, addProblem, removeAll } = useProblemRecordsContext()
    const { session, startSession } = usePlaySessionContext()

    //const [collection, setCollection] = useState<Collection>({})
    const sort = createDefaultSort()
    const filter = createDefaultFilter()
    const libraryList = buildLibraryList(records, sort, filter)
    //const libraryList = Object.values(records)

    const handleAddProblem = () => {
        const newProblem = { id: v4(), title: "asdf"}
        addProblem(newProblem)
        console.log("handle add problem", records)
    }
    const handleDeleteAll = () => {
        removeAll()
    }

    const handleSelectProblem = (problem: Problem) => {
        //const queue: QueueItem[] = Object.keys(records).map((i)=>({problemId: i}))

        const queue: QueueItem[] = [{problemId: problem.id}]
        startSession(queue)
        navigate("/player", {state: { mode: "review"}})
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
            <List>
                {
                    libraryList.map((p, i) => (
                        <ListItem 
                            key={i}
                            onClick={() => handleSelectProblem(p)}>
                            {p.id}: {p.title}
                        </ListItem>
                    ))
                }
            </List>
        </AppLayout>
    )
}