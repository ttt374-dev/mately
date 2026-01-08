import { describe, it, expect } from "vitest"; // or jest
import { createDeleteProblemUsecase } from "@/usecase/deleteProblem/deleteProblemUsecase";
import { createProblem } from "@/domain/problem/factory";
import { InMemoryProblemRepository } from "@/infra/Repository/problem/InMemoryProblemRepository";
import { InMemoryLearningRepository } from "@/infra/Repository/learning/InMemoryLearningRepository";

describe("delete problem usecase", () => {
    it("delete: problem と learningEntry が削除される", async () => {
        // arrange
        const p1 = createProblem({ title: "foo" });
        const p2 = createProblem({ title: "bar" });

        const problemRepo = new InMemoryProblemRepository([p1, p2]);
        const learningRepo = new InMemoryLearningRepository({
            [p1.id]: {
                problemId: p1.id,
                solvedCount: 1,
                failedCount: 0,
                intervalDays: 1,
                nextReviewedAt: 123,
                easeFactor: 2.5,
            },
        });

        const usecase = createDeleteProblemUsecase(problemRepo, learningRepo);

        // act
        await usecase.execute(p1.id);

        // assert: problem
        const problems = await problemRepo.load();
        expect(problems).toHaveLength(1);
        expect(problems[0].id).toBe(p2.id);

        // assert: learning
        const learning = await learningRepo.load();
        expect(learning[p1.id]).toBeUndefined();
    });
});

describe("deleteMany problem usecase", () => {
    it("deleteMany: 複数 problem と learningEntry が削除される", async () => {
        // arrange
        const p1 = createProblem({ title: "foo" });
        const p2 = createProblem({ title: "bar" });
        const p3 = createProblem({ title: "baz" });

        const problemRepo = new InMemoryProblemRepository([p1, p2, p3]);
        const learningRepo = new InMemoryLearningRepository({
            [p1.id]: { problemId: p1.id } as any,
            [p2.id]: { problemId: p2.id } as any,
        });

        const usecase = createDeleteProblemUsecase(problemRepo, learningRepo);

        // act
        await usecase.executeMany([p1.id, p2.id]);

        // assert: problem
        const problems = await problemRepo.load();
        expect(problems).toHaveLength(1);
        expect(problems[0].id).toBe(p3.id);

        // assert: learning
        const learning = await learningRepo.load();
        expect(learning[p1.id]).toBeUndefined();
        expect(learning[p2.id]).toBeUndefined();
    });
});
