
import { useState, useEffect } from 'react';
import { List, ListItem, Button,  } from '@mui/material';
import { v4 } from 'uuid'

import { AppLayout } from "../../shared/components/AppLayout/AppLayout"
import type { Problem, Collection } from '../../domain/problem/types/Problem';
import { createProblemRepository } from '../../domain/problem/problemRepository';
import { useProblemCollection } from './hooks/useProblemColleciton';


export default function LibraryScreen(){    
    const repository = createProblemRepository()
    //const { collection, addProblem } = useProblemCollection(repository)

    const [collection, setCollection] = useState<Collection>({})

    useEffect(() => {
        repository.load().
            then(setCollection).
            catch(() => setCollection({}))
    }, []);
    const addProblem = (newProblem: Problem) => {
        setCollection(prev => ({...prev, [newProblem.id]: newProblem}))
        repository.save(collection)
    }        

    const handleAddProblem = () => {
        const newProblem = { id: v4(), title: "asdf"}
        addProblem(newProblem)
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
                        <ListItem>{p.id}: {p.title}</ListItem>
                    ))
                }

            </List>
        </AppLayout>
    )
}