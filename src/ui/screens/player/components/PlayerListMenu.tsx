import { ListItemButton, ListItemText, IconButton, MenuItem, Menu } from '@mui/material';
import { useToast } from '@/app/providers/ToastProvider';
import ImportFilesButton from '@/ui/common/ImportFilesButton';
import { GenericListMenu } from '@/ui/sharedComponents/GenericListMenu';

type Props = {
    onDeleteProblem: () => void
    onDetailDialogOpen: () => void
}
export default function PlayerListMenu({
    onDeleteProblem, onDetailDialogOpen
}: Props
) {
    const toast = useToast()

    return (
        <GenericListMenu
            menuItems={[
                <>

                    <MenuItem onClick={onDetailDialogOpen}>
                        詳細
                    </MenuItem>
                </>
            ]}
        />

    )

}