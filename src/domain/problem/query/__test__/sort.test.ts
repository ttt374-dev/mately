import { describe, it, expect } from 'vitest'

import { InMemoryProblemRepository } from "@/infra/Repository/problem/InMemoryProblemRepository";
import { InMemoryLearningRepository } from "@/infra/Repository/learning/InMemoryLearningRepository";

import { createLearningEntry } from '@/domain/learning/factory/createLearningEntry';
import { createProblem } from '../../factory';
import { applySort } from '../applySort';
import type { SortState } from '../types';

describe("sort test", () => {
    it("title", async () => {
        const p1 = createProblem({id: "001", title: "bbb"})
        const p2 = createProblem({id: "002", title: "ccc"})
        const p3 = createProblem({id: "003", title: "aaa"})
        
        const problems = [p1, p2, p3]
        const sort: SortState = { key: "title", order: "asc"}



    })
})