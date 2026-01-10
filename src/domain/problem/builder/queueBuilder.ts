import type { QueueItem } from "@/domain/fsm/types"
import type { Problem } from '@/domain/problem/types/Problem'


export const buildQueue = (problems: Problem[]): QueueItem[] => {       
    return problems.map((p) => ({problemId: p.id}))
    
}