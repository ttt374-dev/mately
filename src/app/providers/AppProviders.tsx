import { FsmProvider } from "./FsmProvider";
import { LearningRecordsProvider } from "./LearningRecordsProvider";
import { ProblemRecordProvider } from "./ProblemCollectionProvider";
import { SortFilterStateProvider } from "./SortFilterStateProvider";


export const AppProvsiders: React.FC<{children: React.ReactNode}> = ({children}) => (
  <ProblemRecordProvider>
    <LearningRecordsProvider>
      <FsmProvider>
          <SortFilterStateProvider>
            {children}
          </SortFilterStateProvider>
      </FsmProvider>
    </LearningRecordsProvider>
  </ProblemRecordProvider>
);

