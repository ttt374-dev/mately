import { FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { FormControl, TextField, Checkbox } from "@mui/material";

import type { Filter } from "@/domain/problemCatalog/types/Filter";

type Props = {
    filter: Filter,
    setFilter:  React.Dispatch<React.SetStateAction<Filter>>
}

export default function DeckFilterControl({ filter, setFilter }: Props) {
    return (
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
                            checked={filter.includeNotDue}
                            onChange={e =>
                                setFilter(f => ({
                                    ...f,
                                    includeNotDue: e.target.checked,
                                }))
                            }
                        />
                    }
                    label="レビュー対象外も含む"
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
    )
}