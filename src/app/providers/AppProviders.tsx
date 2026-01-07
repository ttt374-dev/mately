import { FsmProvider } from "./FsmProvider";
import { LearningRecordsProvider } from "./LearningRecordsProvider";
import { ProblemRecordProvider } from "./ProblemCollectionProvider";
import { SortFilterStateProvider } from "./SortFilterStateProvider";
import { ToastProvider } from "./ToastProvider";


export const AppProvsiders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    <ProblemRecordProvider>
      <LearningRecordsProvider>
        <FsmProvider>
          <SortFilterStateProvider>
            {children}
          </SortFilterStateProvider>
        </FsmProvider>
      </LearningRecordsProvider>
    </ProblemRecordProvider>
  </ToastProvider>
);

