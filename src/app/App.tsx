import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LibraryScreen from '@/ui/screens/library/LibraryScreen';
import DeckScreen from '@/ui/screens/deck/DeckScreen';
import PlayerScreen from '@/ui/screens/player/PlayerScreen';
import SummaryScreen from '@/ui/screens/summary/SummaryScreen';
import { AppProvsiders } from './providers/AppProviders';
import ViewScreen from '@/ui/screens/view/ViewScreen';

export default function App() {
  return (
    <AppProvsiders>
      <BrowserRouter>
        <Routes>
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
          <Route path="/deck" element={<DeckScreen />} />
          <Route path="/view/:id" element={<ViewScreen />} />
          <Route path="/" element={<Navigate to="/deck" />} />
          <Route path="/player" element={<PlayerScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvsiders>
  );
}
