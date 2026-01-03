
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Collection } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../application/problem/problemRepository';


export default function LibraryScreen(){
    const [collection, setCollection] = useState<Collection>({})
    const repository = createProblemRepository()

    useEffect(() => {
        repository.load().then(setCollection).catch(() => setCollection({}))
    }, []);

    const handleAddProblem = () => {
        const newProblem = { id: v4(), title: "asdf"}
        setCollection(prev => ({...prev, [newProblem.id]: newProblem}))
        repository.save(collection)
    }
    return (
        <AppLayout
            header={"library"}
            footer={
                <>
                    <Button onClick={handleAddProblem}>
                        追加
                    </Button>
                </>
            }
        >
            <List>
                {
                    Object.values(collection).map(p => (
                        <ListItem>{p.id}</ListItem>
                    ))
                }

            </List>
        </AppLayout>
    )
}