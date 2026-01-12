import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LibraryItemText from "./LibraryItemText";
import type { Problem } from "@/domain/problem/Problem";
import type { LearningEntry } from "@/domain/learning/types";
import { useLongPress } from "../hooks/useLongPress";
import type { Exercise } from "@/domain/Exercise/Exercise";

type Props = {
    //problem: Problem,
    exercise: Exercise,
    //learningEntry?: LearningEntry,

    selectionMode: boolean
    isChecked: boolean
    onToggleChecked: (id: string) => void
    onSelect: () => void
    onEnterSelectionMode: () => void
    onToggleStar: (id: string) => void
}
export default function LibraryListItem({
    //problem,
    exercise,
    selectionMode,
    isChecked,
    onToggleChecked,
    onSelect,
    onEnterSelectionMode,
    //learningEntry,
    onToggleStar,
}: Props) {

    const { bind, isLongPressedRef } = useLongPress({
        onLongPress: () => {
            onToggleChecked(exercise.problem.id)
            onEnterSelectionMode()
        },
        
    })

    console.log("list item", exercise)

    return (
        <ListItem
            disablePadding
            {...bind}
            sx={{ borderBottom: 1, borderColor: "divider" }}
        >
            <ListItemButton
                onClick={() => {
                    if (isLongPressedRef.current) return
                    onSelect()
                }}
            >
                <ListItemIcon sx={{ minWidth: 16 }} onClick={(e) => e.stopPropagation()}>
                    {selectionMode && (
                        <Checkbox
                            size="small"
                            edge="start"
                            checked={isChecked}
                            onChange={(e) => {
                                e.stopPropagation()
                                onToggleChecked(exercise.problem.id)
                            }}
                        />
                    )}
                </ListItemIcon>

                <ListItemText>
                    <LibraryItemText
                        exercise={exercise}
                        //problem={exproblem}
                        //learningEntry={learningEntry}
                        onToggleStar={onToggleStar}
                    />
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}