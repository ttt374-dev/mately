export type FilterState = {
  text?: string; 
  unansweredOnly: boolean;
  includeNotDue: boolean,
  starredOnly: boolean,
  
};

export const DefaultFilterState = {
  text: undefined,
  unansweredOnly: false,
  includeNotDue: false,
  starredOnly: false,
}