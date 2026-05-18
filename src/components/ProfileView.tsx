import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Settings, LogOut, Award, Flame, Star, Bookmark, Sparkles, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function ProfileView() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');

  if (!user) return null;

  const currentLevel = Math.floor((user.xp || 0) / 100) + 1;
  const progressToNext = (user.xp || 0) % 100;

  return (
    <div className="px-6 py-6 space-y-8 pb-32">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-brand-orange/30 p-1 bg-gradient-to-br from-brand-orange to-brand-purple">
            <img src={user.photoURL} alt={user.username} className="w-full h-full object-cover rounded-full border-4 border-rich-black" />
          </div>
          {user.isVerified && (
            <div className="absolute bottom-1 right-1 bg-brand-blue rounded-full p-1 border-2 border-rich-black">
              <ShieldCheck className="w-4 h-4 text-rich-black fill-current" />
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tight">{user.username}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
             <span className="px-2 py-0.5 bg-brand-orange text-rich-black text-[10px] font-black uppercase rounded italic shadow-[0_0_10px_rgba(255,87,26,0.5)]">
               {user.rank || 'Novato'}
             </span>
             <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">• LVL {currentLevel}</span>
          </div>
        </div>

        <p className="text-sm text-white/40 max-w-[250px] font-medium leading-relaxed italic">
          "{user.bio || 'Recluta de SensiFire listo para la acción.'}"
        </p>
      </div>

      {/* Level Progress */}
      <div className="glass-card p-5 space-y-3">
        <div className="flex justify-between items-baseline">
           <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Nivel de Soldado</span>
           <span className="text-[10px] font-black italic text-brand-orange">{progressToNext}/100 XP</span>
        </div>
        <div className="hud-progress-bg h-2">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${progressToNext}%` }}
             className="hud-progress-fill" 
           />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Followers', val: user.followersCount || 0 },
          { label: 'Following', val: user.followingCount || 0 },
          { label: 'Sensis', val: user.sensitivitiesCount || 0 },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-4 text-center group hover:border-brand-orange/30 transition-all">
            <span className="block text-xl font-black italic text-white/90 group-hover:text-brand-orange transition-colors">{stat.val}</span>
            <span className="block text-[8px] font-black uppercase text-white/20 tracking-widest mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Action Tabs */}
      <div className="flex border-b border-white/5">
        {[
          { id: 'posts', label: 'Posts', icon: Flame },
          { id: 'favs', label: 'Favs', icon: Bookmark },
          { id: 'settings', label: 'Gear', icon: Settings },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative flex flex-col items-center gap-1",
              activeTab === tab.id ? "text-brand-orange" : "text-white/20"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange shadow-[0_0_8px_#FF571A]" />
            )}
          </button>
        ))}
      </div>

      {/* Inner Content Area */}
      <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-8 bg-surface-dark/40 rounded-2xl border border-dashed border-white/5">
          <Award className="w-8 h-8 text-white/10 mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Protocolo {activeTab} aún no desplegado</p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button 
          onClick={() => navigate('/credits')}
          className="w-full py-4 bg-gradient-to-r from-brand-purple/20 to-brand-orange/20 text-white rounded-xl font-black uppercase text-[10px] tracking-widest border border-white/10 hover:border-brand-orange/40 transition-all flex items-center justify-center gap-2 group"
        >
          <Heart className="w-4 h-4 text-brand-orange group-hover:scale-125 transition-transform" />
          Protocolos de Origen (Créditos)
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('sensifire_tour_completed');
            window.location.reload();
          }}
          className="w-full py-4 bg-white/5 text-brand-orange rounded-xl font-black uppercase text-[10px] tracking-widest border border-white/5 hover:bg-brand-orange/5 transition-colors flex items-center justify-center gap-2"
        >
          Reiniciar Guía Táctica <Sparkles className="w-4 h-4" />
        </button>
        <button 
          onClick={logout}
          className="w-full py-4 bg-white/5 text-red-500 rounded-xl font-black uppercase text-[10px] tracking-widest border border-white/5 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
        >
          Cerrar Sesión <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
