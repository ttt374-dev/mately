
import { Stack, Box, IconButton, Tooltip, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
	deleteIds: string[],
	//checkedIds: Set<string>
	//problems: Problem[]
	onDelete: (problemIds: string[]) => Promise<void>
	onAfterDelete?: () => void
}

export default function LibraryDeleteControl({
	deleteIds: deleteIds,
	onDelete,
	//onAfterDelete,
}: Props) {
	const length = deleteIds.length

	const handleDelete = async () => {

		if (length === 0) return

		const ok = window.confirm(
			`選択された ${length} 件を削除しますか？`
		)
		if (!ok) return
		//const targets = entries.filter(e => checkedIds.has(e.id))
		if (length === 0) {
			//onAfterDelete?.()
			return
		}

		await onDelete(deleteIds)
		//onAfterDelete?.()
	}

	return (
		<IconButton
			onClick={handleDelete}
			disabled={length === 0}
			color="error"
		>
			<DeleteIcon />
		</IconButton>
	)
}
