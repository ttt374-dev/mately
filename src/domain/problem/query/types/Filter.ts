export type ProblemFilter = {
  text?: string; 
  unansweredOnly: boolean;
  includeNotDue: boolean,
  starredOnly: boolean,
  //mate3: boolean,
  //mate5: boolean,
  //mate7: boolean,
};

export const DefaultFilter = {
  text: undefined,
  unansweredOnly: false,
  includeNotDue: false,
  starredOnly: false,
}