import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LibraryScreen from '../ui/library/LibraryScreen';

export default function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/library" element={<LibraryScreen />}/>              
        </Routes>
      </BrowserRouter>
    
    
  );
}
