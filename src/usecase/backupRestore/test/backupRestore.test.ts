import { describe, it, expect } from "vitest";
import { createBackupRestoreUsecase } from "@/usecase/backupRestore/backupRestoreUsecase";
import { createProblem } from "@/domain/problem/factory";
import { MockBackupWriter } from "./MockBackupWriter";
import { InMemoryProblemRepository } from "@/infra/Repository/problem/InMemoryProblemRepository";
import { InMemoryLearningRepository } from "@/infra/Repository/learning/InMemoryLearningRepository";

describe("backupRestoreUsecase - backup", () => {
  it("problem と learning をバックアップできる", async () => {
    // arrange
    const p1 = createProblem({ title: "foo" });
    const p2 = createProblem({ title: "bar" });

    const problemRepo = new InMemoryProblemRepository([p1, p2]);
    const learningRepo = new InMemoryLearningRepository({
      [p1.id]: { problemId: p1.id } as any,
    });

    const writer = new MockBackupWriter();

    const usecase = createBackupRestoreUsecase(
      problemRepo,
      learningRepo,
      writer
    );

    // act
    const result = await usecase.backup();

    // assert: writer
    expect(writer.writtenData).toBeDefined();
    expect(writer.writtenFilename).toMatch(/^kif-backup-\d+\.json$/);

    const parsed = JSON.parse(writer.writtenData!);

    expect(parsed.problem).toHaveLength(2);
    expect(parsed.learning[p1.id]).toBeDefined();

    // assert: result
    expect(result.count.problem).toBe(2);
    expect(result.count.learning).toBe(1);
    expect(result.filename).toBe(writer.writtenFilename);
  });
});
