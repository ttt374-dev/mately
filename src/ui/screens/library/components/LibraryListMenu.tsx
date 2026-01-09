import { ListItemButton, ListItemText, IconButton, MenuItem, Menu } from '@mui/material';
import { useToast } from '@/app/providers/ToastProvider';
import ImportFilesButton from '@/ui/common/ImportFilesButton';
import { GenericListMenu } from '@/ui/sharedComponents/GenericListMenu';

export function LibraryListMenu({ onClearAllLearnings, onBackupDialogOpen }: {
    onClearAllLearnings: () => void,
    onBackupDialogOpen: () => void,
}
) {
    const toast = useToast()

    return (
        <GenericListMenu
            menuItems={[
                <ImportFilesButton key="import" buttonType="listItem" />,
                <ListItemButton key="backup" onClick={onBackupDialogOpen}>
                    <ListItemText primary="バックアップ/レストア" />
                </ListItemButton>,
                <MenuItem key="clear" onClick={() => {
                    if (window.confirm("すべての学習データをクリアしますか？")) {
                        onClearAllLearnings();
                        toast({ message: "学習データをクリアしました" });
                    }
                }}>
                    学習データをクリア
                </MenuItem>,
            ]}
        />

    )

}