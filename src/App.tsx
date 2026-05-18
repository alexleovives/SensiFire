import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const ContentFeed = lazy(() => import('./components/ContentFeed'));
const ProfileView = lazy(() => import('./components/ProfileView'));
const UploadView = lazy(() => import('./components/UploadView'));
const SearchView = lazy(() => import('./components/SearchView'));
const RankingsView = lazy(() => import('./components/RankingsView'));
const AIAdvisorView = lazy(() => import('./components/AIAdvisorView'));
const WallpapersView = lazy(() => import('./components/WallpapersView'));
const CreditsView = lazy(() => import('./components/CreditsView'));
const AppLayout = lazy(() => import('./components/AppLayout'));
const AuthView = lazy(() => import('./components/AuthView'));

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rich-black gap-4">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Inicializando Protocolos...</span>
      </div>
    );
  }

  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh] bg-rich-black">
          <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthView />} />
          
          <Route element={user ? <AppLayout /> : <Navigate to="/auth" />}>
            <Route path="/" element={<ContentFeed />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/upload" element={<UploadView />} />
            <Route path="/rankings" element={<RankingsView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/ai" element={<AIAdvisorView />} />
            <Route path="/wallpapers" element={<WallpapersView />} />
            <Route path="/credits" element={<CreditsView />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}


