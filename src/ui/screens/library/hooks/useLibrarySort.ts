// features/kif/hooks/useLibrarySort.ts
import { useState, useCallback } from "react"

import type { ProblemSort, SortKey, SortOrder } from "@/domain/problem/query/types/Sort";

const DefaultSort: ProblemSort = {
  key: "title",
  order: "asc",

}

export interface ProblemSortApi {
  setSortKey: (key: SortKey) => void
  setSortOrder: (order: SortOrder) => void
}


export function useLibrarySort(): {
  sortState: ProblemSort,
  api: ProblemSortApi
} {
  const [sortState, setSortState] = useState<ProblemSort>(DefaultSort)

  const setSortKey = useCallback((key: SortKey) => {
    //alert("setsortkey")
    console.log("sort key", key)
    setSortState(prev => {
      // 同じキーを押したら order を反転
      if (prev.key === key) {
        return {
          ...prev,
          order: prev.order === "asc" ? "desc" : "asc",
        }
      }
      // キー変更時は order をリセット
      return {
        key,
        order: "asc",
      }
    })
  }, [])

  const setSortOrder = useCallback((order: SortOrder) => {
    console.log("sort order", order)
    setSortState(prev => ({ ...prev, order }))
  }, [])

  return {
    sortState,          // { key, order }

    api: {
      setSortKey,    // UI用
      setSortOrder,  // UI用（必要なら）
    }
  }
}
