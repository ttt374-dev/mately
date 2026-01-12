import type { Exercise } from "@/domain/Exercise/Exercise"
import type { QueueItem } from "@/domain/fsm/types"
import type { Problem } from '@/domain/problem/Problem'


export const buildQueue = (exercises: Exercise[]): QueueItem[] => {       
    return exercises.map((e) => ({problemId: e.problem.id}))
    
}