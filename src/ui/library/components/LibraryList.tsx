import { List, ListItem, Button, ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { Problem } from '@/domain/problem/types/Problem';
import type { QueueItem } from '@/domain/session/types';

type Props = {
    libraryList: Problem[]
    startSession: (queue: QueueItem[], startIndex?: number) => void
}
export default function LibraryList({ libraryList, startSession }: Props) {
    const navigate = useNavigate()

    const handleSelectProblem = (problem: Problem) => {
        const queue: QueueItem[] = [{ problemId: problem.id }]
        startSession(queue)
        navigate("/player", { state: { mode: "review" } })
    }
    
    const checkedApi = {
        isChecked: (poblemId: string) => false,
        toggleChecked: (problemId: string) => {}
    }

    return (
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

                                checked={checkedApi.isChecked(p.id)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    checkedApi.toggleChecked(p.id)
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
    )
}