import type { Filter } from "./types/Filter"
import type { SortState  } from "./types/Sort"

export function createDefaultSort(): SortState {
  return {
    key: "title",
    order: "asc",
  };
}

export function createDefaultFilter(): Filter {
  return {
    unansweredOnly: false,
    dueOnly: false,
    starredOnly: false,
  };
}

