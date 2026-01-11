import { useToast } from '@/app/providers/ToastProvider';
import { GenericListMenu } from '@/ui/sharedComponents/GenericListMenu';
import React from 'react';
import type { MultipleFilesButtonHandle } from '@/ui/sharedComponents/MultipleFilesButton';
import MultipleFilesButton from '@/ui/sharedComponents/MultipleFilesButton';

export function LibraryListMenu({ onClearAllLearnings, onBackupDialogOpen, onImportFiles }: {
    onImportFiles: (files: File[]) => void,
    onClearAllLearnings: () => void,
    onBackupDialogOpen: () => void,
}
) {
    const importRef = React.useRef<MultipleFilesButtonHandle>(null);
    const toast = useToast()
    

    return (
        <>
            <GenericListMenu
                menuItems={[
                    {
                        key: "import",
                        label: "ファイルをインポート",
                        onClick: () => {
                            importRef.current?.open();
                        },
                    },
                    {
                        key: "backup",
                        label: "バックアップ / レストア",
                        onClick: onBackupDialogOpen,
                    },
                    {
                        key: "clear",
                        label: "学習データをクリア",
                        onClick: () => {
                            if (window.confirm("すべての学習データをクリアしますか？")) {
                                onClearAllLearnings();
                                toast({ message: "学習データをクリアしました" });
                            }
                        },
                    },
                ]}
            />

            <MultipleFilesButton
                ref={importRef}
                onFileSelected={onImportFiles}
            />
        </>
    );


}

/*


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
*/