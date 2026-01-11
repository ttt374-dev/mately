import { describe, it, expect, vi } from "vitest";
import { createImportProblemsUsecase } from "@/usecase/importProblems/importProblemsUsecase";
import type { Problem } from "@/domain/problem/Problem";

// buildProblem を mock
vi.mock("@/domain/problem/factory", () => ({
    buildProblem: vi.fn(),
}));

import { buildProblem } from "@/domain/problem/factory";
import { InMemoryProblemRepository } from "@/infra/Repository/problem/InMemoryProblemRepository";

function createTestFile(
    name: string,
    content: string
): File {
    return new File([content], name);
}
describe("importProblemsUsecase - single", () => {
    it("単一ファイルをインポートできる", async () => {
        // arrange
        const problem: Problem = {
            id: "p1",
            title: "test",
        } as any;

        (buildProblem as any).mockReturnValue(problem);

        const repo = new InMemoryProblemRepository();
        const usecase = createImportProblemsUsecase(repo);

        const file = createTestFile("test.kif", "dummy content");

        // act
        const result = await usecase.importFile(file);

        // assert
        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.count).toBe(1);
        }

        const problems = await repo.load();
        expect(problems).toHaveLength(1);
        expect(problems[0].id).toBe("p1");
    });
});

describe("importProblemsUsecase - multiple success", () => {
    it("複数ファイルをまとめてインポートできる", async () => {
        // arrange
        (buildProblem as any)
            .mockReturnValueOnce({ id: "p1" } as any)
            .mockReturnValueOnce({ id: "p2" } as any);

        const repo = new InMemoryProblemRepository();
        const usecase = createImportProblemsUsecase(repo);

        const files = [
            createTestFile("a.kif", "a"),
            createTestFile("b.kif", "b"),
        ];

        // act
        const result = await usecase.importFiles(files);

        // assert
        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.count).toBe(2);
        }

        const problems = await repo.load();
        expect(problems).toHaveLength(2);
    });
});
