import { DefaultFilterState, DefaultSortState, type FilterState, type SortState } from "@/domain/problem/query/types";
import { useReducer } from "react";

type State = {
  sortState: SortState;
  filterState: FilterState;
};

type Action =
  | { type: "SET_SORT"; payload: SortState }
  | { type: "SET_FILTER"; payload: FilterState }
  | { type: "RESET_FILTER" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SORT":
      return { ...state, sortState: action.payload };
    case "SET_FILTER":
      return { ...state, filterState: { ...state.filterState, ...action.payload } };
    case "RESET_FILTER":
      return { ...state, filterState: {...DefaultFilterState} };
    default:
      return state;
  }
}

export function useProblemQuery() {
  const [state, dispatch] = useReducer(reducer, {
    sortState: {...DefaultSortState},
    filterState: {...DefaultFilterState}
  });

    // ---------------- メソッド ----------------
    const setSort = (partial: Partial<SortState>) =>
        dispatch({ type: "SET_SORT", payload: { ...state.sortState, ...partial } });
    const setFilter = (partial: Partial<FilterState>) =>
        dispatch({ type: "SET_FILTER", payload: { ...state.filterState, ...partial } });
    const resetFilter = () => dispatch({ type: "RESET_FILTER" });

    return {
        state,
        dispatch,
        setSort,
        setFilter,
        resetFilter,
    };
}
