import { useState } from 'react';
import { ListItemButton, ListItemText, IconButton, MenuItem, Menu} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useToast } from '@/app/providers/ToastProvider';
import ImportFilesButton from '@/ui/common/ImportFilesButton';


export function ListMenu( { onClearAllLearnings, onBackupDialogOpen}: {
    onClearAllLearnings: () => void,
    onBackupDialogOpen: () => void,
}
) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const toast = useToast()
    const handleClearLearnings = () => {
        if (!window.confirm("すべての学習データをクリアをクリアしますか？")) {
            return
        }
        //stores.learning.clearAll()
        onClearAllLearnings()
        toast({ message: "学習データをクリアしました" })
    }

    return (
        <>
            <IconButton
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <ImportFilesButton buttonType="listItem" />
                <ListItemButton onClick={() => {
                    onBackupDialogOpen()
                    //setBackupDialogOpen(true);     // ② Dialog を開く
                }}>
                    <ListItemText primary="バックアップ/レストア" />
                </ListItemButton>
                <MenuItem onClick={handleClearLearnings}>学習データをクリア</MenuItem>
            </Menu>
        </>
    );
}