import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LibraryScreen from '@/ui/screens/library/LibraryScreen';
import DashboardScreen from '@/ui/screens/dashboard/DashboardScreen';
import PlayerScreen from '@/ui/screens/player/PlayerScreen';
import SummaryScreen from '@/ui/screens/summary/SummaryScreen';
import { AppProvsiders } from './providers/AppProviders';
import { useEffect } from 'react';
import { fileBackupWriter } from '@/infra/backup/backupWriter';
import { createBackupRestoreUsecase } from '@/usecase/backupRestore/backupRestoreUsecase';
import { FileProblemRepository } from '@/infra/Repository/problem/FileProblemRepository';
import { FileLearningRepository } from '@/infra/Repository/learning/FileLearningRepository';

export default function App() {
    const problemRepo = new FileProblemRepository()
    const learningRepo = new FileLearningRepository()
    
    const usecase = createBackupRestoreUsecase(
        problemRepo, learningRepo, fileBackupWriter)
    
    useEffect(() => {
    const autobackup = async () => {
        usecase.backup()
        console.log("autobackup done")
    }
    //autobackup().catch(err => console.error("autobackup error", err))
        
    }, []);

    return (
        <AppProvsiders>
            <BrowserRouter>
                <Routes>
                    <Route path="/library" element={<LibraryScreen />} />
                    <Route path="/summary" element={<SummaryScreen />} />
                    <Route path="/dashboard" element={<DashboardScreen />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/player" element={<PlayerScreen />} />
                </Routes>
            </BrowserRouter>
        </AppProvsiders>
    );
}
