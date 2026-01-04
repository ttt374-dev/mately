
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, ProgramRecord } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemRecords } from '../hooks/useProblemRecords';
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';


export default function LibraryScreen(){    
    //const repository = createProblemRepository()
    //const { collection, addProblem, removeAll } = useProblemCollection(repository)
    const { collection, addProblem, removeAll } = useProblemRecordsContext()

    //const [collection, setCollection] = useState<Collection>({})

    const handleAddProblem = () => {
        const newProblem = { id: v4(), title: "asdf"}
        addProblem(newProblem)
        console.log("handle add problem", collection)
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
                </>
            }
        >
            <List>
                {
                    Object.values(collection).map(p => (
                        <ListItem>{p.id}: {p.title}</ListItem>
                    ))
                }

            </List>
        </AppLayout>
    )
}