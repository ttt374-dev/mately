import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProblemRecordProvider } from './providers/ProblemCollectionProvider';
import LibraryScreen from '@/ui/app/library/LibraryScreen';
import DeckScreen from '@/ui/app/deck/DeckScreen';
import PlayerScreen from '@/ui/app/player/PlayerScreen';
import { PlaySessionProvider } from './providers/PlaySessionProvider';
import SummaryScreen from '@/ui/app/summary/SummaryScreen';
import { LearningRecordsProvider } from './providers/LearningRecordsProvider';
import { SortFilterStateProvider } from './providers/SortFilterStateProvider';

export default function App() {
  return (


    <ProblemRecordProvider>
      <LearningRecordsProvider>
        <PlaySessionProvider>
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
        </PlaySessionProvider>
      </LearningRecordsProvider>
    </ProblemRecordProvider>

  );
}
