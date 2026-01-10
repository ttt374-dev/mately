import { matchMateLength } from "../mateFilter";

export type FilterState = {
  text?: string; 
  unansweredOnly: boolean;
  isMissionTarget: boolean,
  starredOnly: boolean,
  
  mateLength?: MateLengthFilter
  mateBuckets?: MateBucket[]
};

export const DefaultFilterState = {
  text: undefined,
  unansweredOnly: false,
  isMissionTarget: false,
  starredOnly: false,

  mateLength: undefined,
}
///////////////////////////////////////////

export type MateLengthFilter = {
    length: 3 | 5 | 7 | 9
    mode: "eq" | "lte" | "gte" 
}


export type MateBucket =
  | "lte3"
  | "eq5"
  | "eq7"
  | "gte9"
