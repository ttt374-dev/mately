import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProblemCollectionProvider } from './providers/ProblemCollectionProvider';
import LibraryScreen from '@/ui/library/LibraryScreen';

export default function App() {
  return (
    
    <ProblemCollectionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/library" element={<LibraryScreen />} />
        </Routes>
      </BrowserRouter>
    </ProblemCollectionProvider>   
    
  );
}
