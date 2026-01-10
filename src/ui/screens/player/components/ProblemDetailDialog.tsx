import { useState, useEffect, useRef, useMemo } from "react"
import { TextField, IconButton, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button} from "@mui/material"
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from "react-router-dom"
import type { Problem } from "@/domain/problem/types/Problem";
import { useStoreContext } from "@/app/providers/StoreProvider";

type Props = {
    open: boolean
    problemId: string | null,
    onUpdateTitle: (title: string) => void;
    onConfirm: (problem: Problem) => void;
    onClose: () => void
    onDelete: () => void
    onAfterDelete?: () => void
}

export default function ProblemDetailDialog({
    open,
    problemId,
    onUpdateTitle,
    onConfirm,
    onClose,
    onDelete,
    onAfterDelete,
}: Props) {
    const [title, setTitle] = useState("")
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(title);

    const stores = useStoreContext()
    const problems = stores.problem.problems
    const problem = useMemo(
        () => problems.find(e => e.id === problemId),
        [problems, problemId]
    );

    // initialize
    // entry 切り替え時に title を同期
    useEffect(() => {
        setTitle(problem?.title ?? "untitled")
    }, [problem])

    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus()
            //inputRef.current?.select() // ついでに全選択（おすすめ）
        }
    }, [editing])

    // handlers
    const handleDelete = () => {
        if (problem && window.confirm("本当に削除しますか？")) {
            //deleteProblem(problem)      
            onDelete()
            onAfterDelete?.()
            onClose()
        }

    }
    const navigate = useNavigate()
    const handleConfirm = () => {
        onClose()
        setEditing(false);
        problem && onConfirm(problem);
        navigate("/player")
    }
    const handleCancel = () => {
        setEditing(false);
        onClose()
    }
    const handleResetAccuracy = () => {
        if (problem && window.confirm("本当に正答データをリセットしますか？")) {
            //kifLearning.reset(problem.id)
        }
    }
    const handleSetTitle = () => {
        problem && onUpdateTitle(title.trim())
    }
    const handleEdit = () => {
        //setDraft(title); // 現在のタイトルで初期化
        setEditing(true);
    };
    const handleEditFinish = () => {
        setEditing(false)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl">
            <DialogTitle>
                棋譜エントリの詳細
            </DialogTitle>
            <DialogContent>

                {/* タイトル編集 */}
                <Box display="flex" alignItems="center" gap={2} mt={1}>
                    {editing ?
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
                        </>)
                    }

                </Box>
                <Box>
                    登録日：{(problem != null) ? new Date(problem.createdAt).toLocaleString("ja-JP") : "-"}
                </Box>
                <Box>
                    UUID: {problemId}
                </Box>

                { /* 正答誤答*/}
                <div>
                    {/*  { record && `正答：${record.solvedCount}, 誤答：${record.failedCount}` }*/}

                    <Button onClick={handleResetAccuracy}>
                        リセット
                    </Button>
                </div>

            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleDelete}>
                    削除
                </Button>
                <Button onClick={handleConfirm}>棋譜を表示</Button>
                <Button onClick={handleCancel}>キャンセル</Button>

            </DialogActions>
        </Dialog>
    )

}
