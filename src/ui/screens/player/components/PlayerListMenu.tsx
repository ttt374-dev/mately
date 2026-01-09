import { ListItemButton, ListItemText, IconButton, MenuItem, Menu } from '@mui/material';
import { useToast } from '@/app/providers/ToastProvider';
import ImportFilesButton from '@/ui/common/ImportFilesButton';
import { GenericListMenu } from '@/ui/sharedComponents/GenericListMenu';

type Props = {
    onDeleteProblem: () => void
}
export default function PlayerListMenu({ 
    onDeleteProblem
  }: Props
) {
    const toast = useToast()

    return (
        <GenericListMenu
            menuItems={[
                <MenuItem onClick={onDeleteProblem}>
                    この棋譜を削除
                </MenuItem>
    
            ]}
        />

    )

}