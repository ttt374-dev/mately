import { List, ListItem, Button,  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { Problem } from '@/domain/problem/types/Problem';
import type { QueueItem } from '@/domain/session/types';

type Props = {
    libraryList: Problem[]
    startSession: (queue: QueueItem[], startIndex?: number) => void
}
export default function LibraryList({ libraryList, startSession}: Props) {
    const navigate = useNavigate()

    const handleSelectProblem = (problem: Problem) => {
            const queue: QueueItem[] = [{problemId: problem.id}]
            startSession(queue)
            navigate("/player", {state: { mode: "review"}})
        }

    return (
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
    )
}