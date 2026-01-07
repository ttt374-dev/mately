import { FsmProvider } from "./FsmProvider";
import { RepositoryProvider } from "./RepositoryProvider";
import { SortFilterStateProvider } from "./SortFilterStateProvider";
import { StoreProvider } from "./StoreProvider";
import { ToastProvider } from "./ToastProvider";


export const AppProvsiders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    <RepositoryProvider>
      <StoreProvider>
        
          <FsmProvider>
            <SortFilterStateProvider>
              {children}
            </SortFilterStateProvider>
          </FsmProvider>
        
      </StoreProvider>
    </RepositoryProvider>
  </ToastProvider>
);

