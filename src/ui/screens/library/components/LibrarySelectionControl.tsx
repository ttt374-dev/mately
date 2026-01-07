import { Box, IconButton, Tooltip, Button } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

type Props = {
    isAllChecked: boolean,
    onSelectAll: () => void;
    onClearAll: () => void;
};


export default function LibrarySelectionControl({            
    isAllChecked,
    onSelectAll,
    onClearAll,    
}: Props) {
    return (
        <Box sx={{ display: "flex", flexShrink: 0  } } alignItems="center">
            
                {/* 全選択 */}
                { !isAllChecked ? 
                (
                <Tooltip title="全選択">
                    <IconButton
                        //onClick={() => setCheckedIds(new Set(library.map((e) => e.id)))}
                        onClick={onSelectAll}
                        color="primary"
                    >
                        <CheckBoxIcon />
                    </IconButton>
                </Tooltip>
                ) : 

                
                (<Tooltip title="全解除">
                    <IconButton
                        //onClick={() => setCheckedIds(new Set())}
                        onClick={onClearAll}
                        color="primary"
                    >
                        <CheckBoxOutlineBlankIcon />
                    </IconButton>
                </Tooltip>)

                }
        </Box>
    )
}
