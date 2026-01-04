// domain/problemRecord/sortProblemRecords.ts
import type { Problem } from "../problem/types/Problem"
import type { SortState, SortKey, SortOrder } from "./types/Sort"

export function sortProblems(
  problems: readonly Problem[],
  sort: SortState
): Problem[] {    
    const sorted = [...problems]
    //const sorted = Object.values(records)
    //console.log("sort problems", sort)
    sorted.sort((a, b) => {
      let vA: any
      let vB: any

      switch (sort.key) {
        case "title":
          vA = a.title ?? ""
          vB = b.title ?? ""
          break

        case "createdAt":
          vA = a.createdAt
          vB = b.createdAt
          break

        case "accuracy":
          //const aAcc = calcAccuracy(learningRecords[a.id]) ?? 0
          //const bAcc = calcAccuracy(learningRecords[b.id]) ?? 0
          //return sort.order === "asc" ? aAcc - bAcc : bAcc - aAcc
          break
        case "easeFactor":
          //vA = learningRecords[a.id]?.easeFactor
          //vB = learningRecords[b.id]?.easeFactor
          break

        case "nextReviewedAt":
          //vA = learningRecords[a.id]?.nextReviewedAt
          //vB = learningRecords[b.id]?.nextReviewedAt
          break;

        case "random":
          vA = Math.random();
          vB = Math.random();
          //console.log("random", vA, vB)
          break;

        default:
          return 0
      }
      //console.log("compare", sort.key, vA, vB)

      if (vA < vB) return sort.order === "asc" ? -1 : 1
      if (vA > vB) return sort.order === "asc" ? 1 : -1
      return 0
    })
    //alert("sorted")

    //console.log("sorted:", sorted)

    return sorted
}
