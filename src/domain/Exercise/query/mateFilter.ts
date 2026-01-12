import type { KifContent } from "@/domain/kif/types"
import type { Problem } from "../../problem/Problem"
import type { MateBucket, MateLengthFilter } from "./types"


export const matchMateLength = (kif: KifContent, mateFilter?: MateLengthFilter) => {
    if (!mateFilter || kif.mateLength == null) {
        return true
    }

    switch (mateFilter.mode) {
        case "eq":
            return kif.mateLength === mateFilter.length
        case "lte":
            return kif.mateLength <= mateFilter.length
        case "gte":
            return kif.mateLength >= mateFilter.length
    }
}

export function matchMateBuckets(
  kif: KifContent,
  buckets?: MateBucket[]
): boolean {
  if (!buckets || buckets.length === 0) return true
  const mateLength = kif.mateLength 
  if (mateLength === undefined) return false

  return buckets.some(bucket => {    
    switch (bucket) {
      case "lte3":
        return mateLength <= 3
      case "eq5":
        return mateLength === 5
      case "eq7":
        return mateLength === 7
      case "gte9":
        return mateLength >= 9
    }
  })
}
