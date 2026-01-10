import { Divider } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button } from "@mui/material"

import type { Problem } from "@/domain/problem/types/Problem";
import type { LearningEntry } from "@/domain/learning/types";
import { LearningStats } from "./LearningStats";
import { EditableTitle } from "./EditableTitle";
import { createLearningStatRow } from "./createLearningStatRows";

type Props = {
    open: boolean
    problem: Problem,
    learningEntry?: LearningEntry,
    onUpdateTitle: (title: string) => void;
    onConfirm: (problemId: string) => void;
    onClose: () => void
    onDelete: () => void
    onResetLearning: () => void
}

export default function ProblemDetailDialog({
    open,
    problem,
    learningEntry,
    onUpdateTitle,
    onConfirm: onPlayProblem,
    onClose,
    onDelete,
    onResetLearning,
}: Props) {
    // handlers
    const handleDelete = () => {
        if (!window.confirm("本当に削除しますか？")) return
        onDelete()
        onClose()
    }
    const handlePlay = () => {
        onClose()
        onPlayProblem(problem.id);
    }
    const handleCancel = () => {      
        onClose()
    }
    const handleResetAccuracy = () => {
        if (!window.confirm("本当に正答データをリセットしますか？")) return
        onResetLearning()             
    }    
    ///////////////////////////////////////////////////////
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl">
            <DialogTitle>
                棋譜エントリの詳細
            </DialogTitle>
            <DialogContent>
                {/* タイトル編集 */}                
                <Box display="flex" alignItems="center" gap={2} mt={1}>                    
                    <EditableTitle initialTitle={problem.title} onUpdateTitle={onUpdateTitle}/>
                </Box>
                <Divider/>
                <LearningStats rows={createLearningStatRow(problem, learningEntry)}/>

                { /* 正答誤答*/}

                {/*  { record && `正答：${record.solvedCount}, 誤答：${record.failedCount}` }*/}
                <Button onClick={handleResetAccuracy}>
                    学習データをリセット
                </Button>
            </DialogContent>
            
            <DialogActions>
                <Button color="error" onClick={handleDelete}>
                    削除
                </Button>
                <Button onClick={handlePlay}>棋譜を表示</Button>
                <Button onClick={handleCancel}>キャンセル</Button>
            </DialogActions>
        </Dialog>
    )

}
