import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, PlusSquare, User as UserIcon, Bell, Sparkles, Image as ImageIcon, Search, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import GuidedTour from './GuidedTour';

export default function AppLayout() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('sensifire_tour_completed');
    if (!hasSeenTour) {
      setTimeout(() => setShowTour(true), 1000);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem('sensifire_tour_completed', 'true');
    setShowTour(false);
  };
  const navItems = [
    { icon: Home, path: '/', label: 'Feed' },
    { icon: Sparkles, path: '/ai', label: 'AI Sensi' },
    { icon: PlusSquare, path: '/upload', label: 'Post' },
    { icon: ImageIcon, path: '/wallpapers', label: 'Walls' },
    { icon: UserIcon, path: '/profile', label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-rich-black text-white selection:bg-brand-orange/30">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-rich-black/80 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-brand-purple flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,87,26,0.3)]">
            <div className="w-full h-full bg-white rounded-[2px]" />
          </div>
          <h1 className="text-xl font-black tracking-tighter gaming-gradient-text italic uppercase">SensiFire</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <NavLink to="/search" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Search className="w-5 h-5 text-white/50" />
          </NavLink>
          <NavLink to="/rankings" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Trophy className="w-5 h-5 text-white/50" />
          </NavLink>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              className={cn(
                "p-2 rounded-full transition-colors relative ml-1",
                showNotifs ? "bg-brand-orange/20 text-brand-orange" : "hover:bg-white/5 text-white/50"
              )}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-orange rounded-full border border-rich-black" />
            </button>

            <AnimatePresence>
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 glass-card p-4 z-50 border-brand-orange/20"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Notificaciones</h4>
                      <button className="text-[8px] font-bold text-brand-orange uppercase">Limpiar</button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: 'Nuevo Recluta', msg: 'Soldado_X te ha seguido', time: '2m' },
                        { title: 'Sensi en Tendencia', msg: 'Tu configuración está en el Top 10', time: '1h' },
                      ].map((n, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 flex gap-3">
                          <div className="w-2 h-2 bg-brand-orange rounded-full mt-1.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold">{n.title}</p>
                            <p className="text-[10px] text-white/40">{n.msg}</p>
                            <span className="text-[8px] text-white/20 mt-1 block uppercase">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-16 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-surface-dark/90 backdrop-blur-2xl border-t border-white/5 px-2 flex items-center justify-around pb-safe overflow-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 relative",
                isActive ? "text-brand-orange" : "text-white/20 hover:text-white/40"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon className={cn("w-6 h-6 transition-transform duration-300", isActive && "scale-110 -translate-y-0.5")} />
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg-glow"
                      className="absolute -inset-4 bg-brand-orange/10 blur-xl rounded-full -z-10"
                    />
                  )}
                </div>
                <span className={cn("text-[8px] font-black uppercase tracking-widest transition-all", isActive ? "opacity-100" : "opacity-0")}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute bottom-1 w-1 h-1 bg-brand-orange rounded-full shadow-[0_0_8px_#FF571A]"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {showTour && <GuidedTour onComplete={completeTour} />}
    </div>
  );
}

