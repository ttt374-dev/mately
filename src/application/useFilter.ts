import { useState } from "react"

import { DefaultFilterState, type FilterState, type SortState } from "@/domain/problem/query/types"

export type FilterApi = {
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;

    update: <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => void;
};

export type UseFilterResult = {
    filter: FilterState,
    api: FilterApi,
}

export function useFilter(): UseFilterResult {
    const [filter, setFilter] = useState<FilterState>(DefaultFilterState)

    const update = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilter(f => ({
            ...f,
            [key]: value,
        }));
    };

    return {
        filter, api: { setFilter, update }
    }
}