
import { Stack, Box, IconButton, Tooltip, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import type { Problem } from '@/domain/problem/types/Problem';

type Props = {
  targetProblems: Problem[],
  //checkedIds: Set<string>
  //problems: Problem[]
  onDelete: (problems: Problem[]) => Promise<void>
  onAfterDelete?: () => void
}

export default function LibraryDeleteControl({
  targetProblems,
  //checkedIds,
  //problems: entries,
  onDelete,
  onAfterDelete,
}: Props) {

  const handleDelete = async () => {
    if (targetProblems.length === 0) return

    const ok = window.confirm(
      `選択された ${targetProblems.length} 件を削除しますか？`
    )
    if (!ok) return

    //const targets = entries.filter(e => checkedIds.has(e.id))
    if (targetProblems.length === 0) {
      onAfterDelete?.()
      return
    }

    await onDelete(targetProblems)
    onAfterDelete?.()
  }

  return (
    <IconButton
      onClick={handleDelete}
      disabled={targetProblems.length === 0}
      color="error"
    >
      <DeleteIcon />
    </IconButton>
  )
}
