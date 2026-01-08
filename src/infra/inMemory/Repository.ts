import type { LearningRepository } from "@/domain/learning/LearningRepository"
import type { LearningRecord } from "@/domain/learning/types"
import type { ProblemRepository } from "@/domain/problem/problemRepository"
import type { Problem } from "@/domain/problem/types/Problem"

////////////////////////////////
function createInMemoryProblemRepository(initial: Problem[] = []): ProblemRepository {
  let store = [...initial]

  return {
    async load(): Promise<Problem[]> {
      return [...store]
    },
    async save(problems: Problem[]) {
      store = [...problems]
    },

    async add(problem: Problem) {
      store = [...store, problem]
    },
    async remove(id: string) {
      store = store.filter(p => p.id !== id)
    },

    async removeMany(ids: string[]) {
      const set = new Set(ids)
      store = store.filter(p => !set.has(p.id))
    }
  }
}

function createInMemoryLearningRepository(initial: LearningRecord = {}): LearningRepository {
  let store = { ...initial }

  return {
    async load(): Promise<LearningRecord> {
      return { ...store }
    },
    async save(record: LearningRecord) {
      store = { ...record }
    },
    async remove(problemId: string) {
      const { [problemId]: _, ...next } = store
      store = next
    },
    async removeMany(ids: string[]): Promise<void> {
      if (ids.length === 0) return

      const idSet = new Set(ids)

      const next: LearningRecord = {}
      for (const [problemId, entry] of Object.entries(store)) {
        if (!idSet.has(problemId)) {
          next[problemId] = entry
        }
      }

      store = next
    }
  }
}
