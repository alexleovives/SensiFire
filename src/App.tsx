import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Search, PlusSquare, BarChart2, User as UserIcon } from 'lucide-react';
import ContentFeed from './components/ContentFeed';
import ProfileView from './components/ProfileView';
import UploadView from './components/UploadView';
import SearchView from './components/SearchView';
import RankingsView from './components/RankingsView';
import AIAdvisorView from './components/AIAdvisorView';
import WallpapersView from './components/WallpapersView';
import CreditsView from './components/CreditsView';
import AppLayout from './components/AppLayout';
import AuthView from './components/AuthView';
import { useAuth } from './hooks/useAuth';

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
    </Router>
  );
}


