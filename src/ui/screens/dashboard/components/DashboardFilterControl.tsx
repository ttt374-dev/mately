import { Card, FormControlLabel, FormGroup, FormLabel, Paper } from "@mui/material";
import { FormControl, TextField, Checkbox } from "@mui/material";

import type { FilterState } from "@/domain/problem/query/types/Filter";

type Props = {
    filter: FilterState,
    setFilter:  React.Dispatch<React.SetStateAction<FilterState>>
}

export default function DashboardFilterControl({ filter, setFilter }: Props) {
    return (
        <Paper elevation={1}>
        <FormControl>
            <FormLabel>
                抽出条件
            </FormLabel>
            <FormGroup>
                <TextField size="small" fullWidth placeholder="タイトル"
                    onChange={e =>
                        setFilter(f => ({
                            ...f,
                            text: e.target.value
                        }))
                    }
                >
                </TextField>

                <FormControlLabel control={
                    <Checkbox
                        checked={filter.unansweredOnly}
                        onChange={e =>
                            setFilter(f => ({
                                ...f,
                                unansweredOnly: e.target.checked
                            }))
                        } />}
                    label="未回答のみ" />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filter.isMissionTarget}
                            onChange={e =>
                                setFilter(f => ({
                                    ...f,
                                    isMissionTarget: e.target.checked,
                                }))
                            }
                        />
                    }
                    label="ミッション対象のみ"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filter.starredOnly}
                            onChange={e =>
                                setFilter(f => ({
                                    ...f,
                                    starredOnly: e.target.checked,
                                }))
                            }
                        />
                    }
                    label="スター付きのみ"
                />
            </FormGroup>
        </FormControl>
    </Paper>
    )
}