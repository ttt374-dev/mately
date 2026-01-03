import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProblemCollectionProvider } from './providers/ProblemCollectionProvider';
import LibraryScreen from '@/ui/library/LibraryScreen';
import DeckScreen from '@/ui/deck/DeckScreen';
import { DeckPlaySessionProvider } from './providers/DeckPlaySessionProvider';

export default function App() {
  return (


    <ProblemCollectionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/deck" element={
            <DeckPlaySessionProvider>
              <DeckScreen />
            </DeckPlaySessionProvider>} />
        </Routes>
      </BrowserRouter>
    </ProblemCollectionProvider>

  );
}
