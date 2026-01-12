import { describe, it, expect, vi, beforeEach } from "vitest";
import { createImportProblemsUsecase } from "@/usecase/importProblems/importProblemsUsecase";
import { Problem } from "@/domain/problem/Problem";

// buildProblem を mock
vi.mock("@/domain/problem/factory", () => ({
    buildProblem: vi.fn(),
}));

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
        const problem = Problem.create({
            id: "p1",
            title: "test",
        });

        //(Problem.createFromText as any).mockReturnValue(problem);
        vi.spyOn(Problem, 'createFromText').mockReturnValue(problem);

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


describe('importProblemsUsecase - multiple success', () => {
  let spy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // beforeEachで毎回スパイをリセット
    vi.restoreAllMocks();
  });

  it('複数ファイルをまとめてインポートできる', async () => {
    // arrange
    const p1 = Problem.create({ id: '001', title: 'test' });
    const p2 = Problem.create({ id: '002', title: 'asdf' });

    // createFromText の呼び出し順に返す
    spy = vi.spyOn(Problem, 'createFromText')
      .mockReturnValueOnce(p1)
      .mockReturnValueOnce(p2);

    const repo = new InMemoryProblemRepository();
    const usecase = createImportProblemsUsecase(repo);

    const files = [
      createTestFile('a.kif', 'a'),
      createTestFile('b.kif', 'b'),
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

    // 個別のIDも確認
    expect(problems.map(p => p.id)).toEqual(['001', '002']);
  });
});