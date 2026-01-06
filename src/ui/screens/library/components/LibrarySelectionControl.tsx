import { Box, IconButton, Tooltip, Button } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

type Props = {
    onSelectAll: () => void;
    onClearAll: () => void;
};


export default function LibrarySelectionControl({        
    onSelectAll,
    onClearAll,    
}: Props) {
    return (
        <Box sx={{ display: "flex", flexShrink: 0  } } alignItems="center">
            
                {/* 全選択 */}
                <Tooltip title="全選択">
                    <IconButton
                        //onClick={() => setCheckedIds(new Set(library.map((e) => e.id)))}
                        onClick={onSelectAll}
                        color="primary"
                    >
                        <CheckBoxIcon />
                    </IconButton>
                </Tooltip>

                {/* 全解除 */}
                <Tooltip title="全解除">
                    <IconButton
                        //onClick={() => setCheckedIds(new Set())}
                        onClick={onClearAll}
                        color="primary"
                    >
                        <CheckBoxOutlineBlankIcon />
                    </IconButton>
                </Tooltip>

            
        </Box>
    )
}
