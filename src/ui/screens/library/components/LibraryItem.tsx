import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LibraryItemText from "./LibraryItemText";
import type { Problem } from "@/domain/problem/types/Problem";
import type { LearningEntry } from "@/domain/learning/types";
import { useLongPress } from "../hooks/useLongPress";

type Props = {
    problem: Problem,
    learningEntry: LearningEntry,

    selectionMode: boolean
    isChecked: boolean
    onToggleChecked: (id: string) => void
    onSelect: (problem: Problem) => void
    onEnterSelectionMode: () => void
    onToggleStar: (id: string) => void
}
export default function LibraryListItem({
    problem,
    selectionMode,
    isChecked,
    onToggleChecked,
    onSelect,
    onEnterSelectionMode,
    learningEntry,
    onToggleStar,
}: Props) {

    const { bind, isLongPressedRef } = useLongPress({
        onLongPress: () => {
            onToggleChecked(problem.id)
            onEnterSelectionMode()
        }
    })

    return (
        <ListItem
            disablePadding
            {...bind}
            sx={{ borderBottom: 1, borderColor: "divider" }}
        >
            <ListItemButton
                onClick={() => {
                    if (isLongPressedRef.current) return
                    onSelect(problem)
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
                                onToggleChecked(problem.id)
                            }}
                        />
                    )}
                </ListItemIcon>

                <ListItemText>
                    <LibraryItemText
                        problem={problem}
                        learningEntry={learningEntry}
                        onToggleStar={onToggleStar}
                    />
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}