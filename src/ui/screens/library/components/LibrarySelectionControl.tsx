import { Box, IconButton, Tooltip, Button } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import type { LibraryCheckboxApi, useLibraryCheckbox } from "../hooks/useLibraryCheckbox";

type Props = {
    checkboxApi: LibraryCheckboxApi
};


export default function LibrarySelectionControl({checkboxApi}: Props) {
    const { isAllChecked, selectAll, clearAll } = checkboxApi
    return (
        <Box sx={{ display: "flex", flexShrink: 0  } } alignItems="center">
            
                {/* 全選択 */}
                { !isAllChecked ? 
                (
                <Tooltip title="全選択">
                    <IconButton
                        //onClick={() => setCheckedIds(new Set(library.map((e) => e.id)))}
                        onClick={selectAll}
                        color="primary"
                    >
                        <CheckBoxIcon />
                    </IconButton>
                </Tooltip>
                ) : 

                
                (<Tooltip title="全解除">
                    <IconButton
                        //onClick={() => setCheckedIds(new Set())}
                        onClick={clearAll}
                        color="primary"
                    >
                        <CheckBoxOutlineBlankIcon />
                    </IconButton>
                </Tooltip>)

                }
        </Box>
    )
}
