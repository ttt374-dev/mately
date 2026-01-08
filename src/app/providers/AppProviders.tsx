import { FsmProvider } from "./FsmProvider";
import { RepositoryProvider } from "./RepositoryProvider";
import { QueryProvider } from "./QueryProvider";
import { StoreProvider } from "./StoreProvider";
import { ToastProvider } from "./ToastProvider";


export const AppProvsiders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    <RepositoryProvider>
      <StoreProvider>        
          <FsmProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </FsmProvider>        
      </StoreProvider>
    </RepositoryProvider>
  </ToastProvider>
);

