import type { QueueItem } from "@/domain/fsm/types"
import type { SortState } from "@/domain/problem/query/types/Sort"
import type { FilterState } from "@/domain/problem/query/types/Filter"
import { applySort } from "@/domain/problem/query/applySort"
import { applyFilter } from "@/domain/problem/query/applyFilter"
import type { LearningRecord } from "@/domain/learning/types"
import type { Problem } from '@/domain/problem/types/Problem'
import { applyQuery } from "../query/applyQuery"

export const buildQueue = (problems: Problem[]): QueueItem[] => {       
    return problems.map((p) => ({problemId: p.id}))
    
}