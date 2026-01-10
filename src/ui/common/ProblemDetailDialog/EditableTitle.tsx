import { useEffect, useRef, useState } from "react"
import { IconButton, TextField, Typography } from "@mui/material"
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit';
import type { Problem } from "@/domain/problem/types/Problem";



type Props = {
    initialTitle: string,
    onUpdateTitle: (title: string) => void
}

export function EditableTitle({initialTitle, onUpdateTitle }: Props) {
    const [title, setTitle] = useState("")
    const [editing, setEditing] = useState(false);

    const handleSetTitle = () => {
        onUpdateTitle(title.trim())
    }
    const handleEditFinish = () => {
        setEditing(false)
    }
    const inputRef = useRef<HTMLInputElement | null>(null)

        useEffect(() => {
            setTitle(initialTitle)
        }, [initialTitle])
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus()
            //inputRef.current?.select() // ついでに全選択（おすすめ）
        }
    }, [editing])
        const handleEdit = () => {
        //setDraft(title); // 現在のタイトルで初期化
        setEditing(true);
    };

    return (
        editing ?
            <>
                <TextField
                    label="タイトル"
                    fullWidth
                    value={title}
                    inputRef={inputRef}
                    onChange={(e: any) => setTitle(e.target.value)}
                />
                <IconButton onClick={handleSetTitle}>
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleEditFinish}>
                    <CloseIcon />
                </IconButton>

            </>
            : (<>
                <Typography flexGrow={1}>{title}</Typography>

                <IconButton onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
            </>
            )
        )
    }