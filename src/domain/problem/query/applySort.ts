// domain/problemRecord/sortProblemRecords.ts
import type { Exercise } from "@/domain/Exercise/Exercise"
import type { LearningEntry, LearningRecord } from "../../learning/types"
import type { Problem } from "../Problem"
import type { SortState, SortKey, SortOrder } from "./types/Sort"

export function applySort(
  exercises: Exercise[],
  sort: SortState,  
): Exercise[] {    
    const sorted = [...exercises]
    //const sorted = Object.values(records)
    //console.log("sort problems", sort)
    sorted.sort((a, b) => {
      let vA: any
      let vB: any

      let pA = a.problem
      let pB = b.problem
      let rA = a.learning
      let rB = b.learning

      switch (sort.key) {
        case "title":
          vA = pA.title ?? ""
          vB = pB.title ?? ""
          break

        case "createdAt":
          vA = pA.createdAt
          vB = pB.createdAt
          break

        case "random":
          vA = Math.random();
          vB = Math.random();
          break;

        case "accuracy":            
          const aAcc = rA?.accuracy ?? 0
          const bAcc = rB?.accuracy ?? 0
          return sort.order === "asc" ? aAcc - bAcc : bAcc - aAcc
          break
        case "easeFactor":
          vA = rA?.easeFactor
          vB = rB?.easeFactor
          break

        case "nextReviewedAt":
          vA = rA?.nextReviewedAt
          vB = rB?.nextReviewedAt
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

    return exercises
}


export function applySortOrig(
  problems: Problem[],
  sort: SortState,
  learningRecords?: LearningRecord
): Problem[] {    
    const sorted = [...problems]
    //const sorted = Object.values(records)
    //console.log("sort problems", sort)
    sorted.sort((a, b) => {
      let vA: any
      let vB: any

      let rA = learningRecords?.[a.id]
      let rB = learningRecords?.[b.id]

      switch (sort.key) {
        case "title":
          vA = a.title ?? ""
          vB = b.title ?? ""
          break

        case "createdAt":
          vA = a.createdAt
          vB = b.createdAt
          break

        case "random":
          vA = Math.random();
          vB = Math.random();
          break;

        case "accuracy":
          if (!learningRecords) return 0                    
          const aAcc = rA?.accuracy ?? 0
          const bAcc = rB?.accuracy ?? 0
          return sort.order === "asc" ? aAcc - bAcc : bAcc - aAcc
          break
        case "easeFactor":
          if (!learningRecords) return 0
          vA = rA?.easeFactor
          vB = rB?.easeFactor
          break

        case "nextReviewedAt":
          if (!learningRecords) return 0
          vA = rA?.nextReviewedAt
          vB = rB?.nextReviewedAt
          break;


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
