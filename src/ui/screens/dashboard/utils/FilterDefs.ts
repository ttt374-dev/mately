import type { FilterState } from "@/domain/Exercise/query/types/Filter";

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