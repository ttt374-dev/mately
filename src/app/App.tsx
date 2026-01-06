import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProblemRecordProvider } from './providers/ProblemCollectionProvider';
import LibraryScreen from '@/ui/screens/library/LibraryScreen';
import DeckScreen from '@/ui/screens/deck/DeckScreen';
import PlayerScreen from '@/ui/screens/player/PlayerScreen';
import SummaryScreen from '@/ui/screens/summary/SummaryScreen';
import { LearningRecordsProvider } from './providers/LearningRecordsProvider';
import { SortFilterStateProvider } from './providers/SortFilterStateProvider';
import { FsmProvider } from './providers/FsmProvider';

export default function App() {
  return (


    <ProblemRecordProvider>
      <LearningRecordsProvider>
          <FsmProvider>
          <SortFilterStateProvider>
            
            <BrowserRouter>
              <Routes>
                <Route path="/library" element={<LibraryScreen />} />
                <Route path="/summary" element={<SummaryScreen />} />
                <Route path="/deck" element={<DeckScreen />} />
                <Route path="/" element={<Navigate to="/deck" />} />
                <Route path="/player" element={<PlayerScreen />} />
              </Routes>
            </BrowserRouter>

          </SortFilterStateProvider>
          </FsmProvider>
      </LearningRecordsProvider>
    </ProblemRecordProvider>

  );
}
