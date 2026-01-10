import { Card, FormControlLabel, FormGroup, FormLabel, Paper } from "@mui/material";
import { FormControl, TextField, Checkbox } from "@mui/material";

import type { FilterState } from "@/domain/problem/query/types/Filter";
import { useQueryContext } from "@/app/providers/QueryProvider";


const checkboxFilters: {
  key: keyof FilterState
  label: string
}[] = [
  { key: "unansweredOnly", label: "未回答のみ" },
  { key: "isMissionTarget", label: "ミッション対象のみ" },
  { key: "starredOnly", label: "スター付きのみ" },
]

type BaseFilterDef<K extends keyof FilterState> = {
  key: K
  label: string
}

type TextFilterDef<K extends keyof FilterState> =
  BaseFilterDef<K> & {
    type: "text"
    placeholder?: string
  }

type BooleanFilterDef<K extends keyof FilterState> =
  BaseFilterDef<K> & {
    type: "boolean"
  }

export type FilterDef =
  | TextFilterDef<keyof FilterState>
  | BooleanFilterDef<keyof FilterState>

  
export const filterDefs: FilterDef[] = [
  {
    key: "text",
    label: "タイトル",
    type: "text",
    placeholder: "タイトル"
  },
  {
    key: "unansweredOnly",
    label: "未回答のみ",
    type: "boolean"
  },
  {
    key: "isMissionTarget",
    label: "ミッション対象のみ",
    type: "boolean"
  },
  {
    key: "starredOnly",
    label: "スター付きのみ",
    type: "boolean"
  }
]
/////////////////////////////////////////////////////////////////////////////
type Props = {
    filter: FilterState,
    //onUpdateFilter: (partial: Partial<FilterState>),
    setFilter:  React.Dispatch<React.SetStateAction<FilterState>>
}

export default function DashboardFilterControl() {
  const { state, setFilter } = useQueryContext()
  const filter = state.filterState

  return (
    <Paper elevation={1}>
      <FormControl>
        <FormLabel>抽出条件</FormLabel>

        <FormGroup>
          {filterDefs.map(def => {
            switch (def.type) {
              case "text":
                return (
                  <TextField
                    key={def.key}
                    size="small"
                    fullWidth
                    placeholder={def.placeholder}
                    value={filter[def.key] ?? ""}
                    onChange={e =>
                      setFilter({ [def.key]: e.target.value })
                    }
                  />
                )

              case "boolean":
                return (
                  <FormControlLabel
                    key={def.key}
                    label={def.label}
                    control={
                      <Checkbox
                        checked={!!filter[def.key]}
                        onChange={e =>
                          setFilter({ [def.key]: e.target.checked })
                        }
                      />
                    }
                  />
                )
            }
          })}
        </FormGroup>
      </FormControl>
    </Paper>
  )
}
