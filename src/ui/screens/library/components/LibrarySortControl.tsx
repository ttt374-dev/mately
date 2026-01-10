import { Box, IconButton, Tooltip, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import type { SortState, SortKey, SortOrder } from "@/domain/problem/query/types/Sort";

export default function LibrarySortControl({ sort, setSort }: {
    sort: SortState,
    setSort: (partial: Partial<SortState>) => void,
    //setSortKey: (order: SortKey) => void
    //setSortOrder: (order: SortOrder) => void,
}) {
    const handleChangeKey = (e: any) => {
        //console.log("set sort key", e.target.value)
        setSort({key: e.target.value})
    }
    return (
        <Box>
            <select value={sort.key} onChange={handleChangeKey}>
                <option key="createdAt" value="createdAt">追加順</option>
                <option key="title" value="title">名前順</option>
                <option key="accuracy" value="accuracy">正答率</option>
                <option key="easeFactor" value="easeFactor">習熟度</option>
                <option key="nextReviewedAt" value="nextReviewedAt">次レビュー日</option>
            </select>

            <IconButton onClick={() => {
                setSort({order: sort.order === "asc" ? "desc" : "asc"})             
            }
            }>
                {sort.order === 'asc'
                    ? <ArrowUpwardIcon />
                    : <ArrowDownwardIcon />
                }
            </IconButton>
        </Box>
    )
}

