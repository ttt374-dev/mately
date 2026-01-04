import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProblemRecordProvider } from './providers/ProblemCollectionProvider';
import LibraryScreen from '@/ui/library/LibraryScreen';
import DeckScreen from '@/ui/deck/DeckScreen';
import PlayerScreen from '@/ui/player/PlayerScreen';
import { PlaySessionProvider } from './providers/PlaySessionProvider';
import SummaryScreen from '@/ui/summary/SummaryScreen';

export default function App() {
  return (


    <ProblemRecordProvider>
      <BrowserRouter>
        <PlaySessionProvider>
          <Routes>
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/summary" element={<SummaryScreen />} />
            <Route path="/deck" element={<DeckScreen />} />
            <Route path="/player" element={<PlayerScreen />} />
          </Routes>
        </PlaySessionProvider>
      </BrowserRouter>
    </ProblemRecordProvider>

  );
}
