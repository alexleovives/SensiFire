import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, ShieldCheck, Flame, Star, Award, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { sensitivityService } from '../services/sensiService';

export default function RankingsView() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRankings() {
      const data = await sensitivityService.getRankings();
      setUsers(data);
      setLoading(false);
    }
    loadRankings();
  }, []);

  const getRankColor = (rank: string) => {
    switch(rank) {
      case 'Headshot King': return 'text-brand-orange drop-shadow-[0_0_8px_#FF571A]';
      case 'Maestro': return 'text-brand-purple drop-shadow-[0_0_8px_#9000FF]';
      case 'Pro': return 'text-brand-blue drop-shadow-[0_0_8px_#00E0FF]';
      default: return 'text-white/40';
    }
  };

  return (
    <div className="px-6 py-4 space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black italic gaming-gradient-text tracking-tight uppercase">Hall of Fame</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Los soldados más letales del campo</p>
        </div>
        <Trophy className="w-10 h-10 text-brand-orange opacity-20" />
      </div>

      <div className="space-y-4">
        {loading ? (
          Array(5).fill(0).map((_, idx) => (
            <div key={idx} className="h-20 glass-card animate-pulse" />
          ))
        ) : (
          users.map((user, idx) => (
            <motion.div
              key={user.uid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "glass-card p-4 flex items-center gap-4 relative overflow-hidden",
                idx === 0 && "border-brand-orange/30 bg-brand-orange/5"
              )}
            >
              {/* Rank Number */}
              <div className="flex flex-col items-center justify-center min-w-[32px]">
                <span className={cn(
                  "text-lg font-black italic",
                  idx < 3 ? "text-brand-orange" : "text-white/20"
                )}>#{idx + 1}</span>
                {idx === 0 && <Flame className="w-3 h-3 text-brand-orange animate-bounce" />}
              </div>

              {/* User Info */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-white/5 overflow-hidden">
                  <img src={user.photoURL} alt={user.username} className="w-full h-full object-cover" />
                </div>
                {user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-brand-blue rounded-full p-0.5 border-2 border-rich-black">
                    <ShieldCheck className="w-2.5 h-2.5 text-rich-black fill-current" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-tight">{user.username}</span>
                  <Award className={cn("w-3.5 h-3.5", getRankColor(user.rank || 'Novato'))} />
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                   <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-brand-orange fill-current" />
                      <span className="text-[10px] font-black text-brand-orange">{user.xp || 0} XP</span>
                   </div>
                   <span className="text-[10px] font-bold text-white/20">LVL {Math.floor((user.xp || 0) / 100) + 1}</span>
                </div>
              </div>

              {/* Stats Badge */}
              <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-right">
                <span className="block text-[8px] font-black text-white/30 uppercase leading-none">Despliegues</span>
                <span className="text-xs font-black italic text-white/80">{user.sensitivitiesCount || 0}</span>
              </div>

              {/* Decorative elements for top ranks */}
              {idx < 3 && (
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-orange/10 blur-[30px] rounded-full" />
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Rewards Info */}
      <div className="glass-card p-6 bg-gradient-to-r from-brand-orange/10 to-transparent border-brand-orange/20">
         <div className="flex gap-4">
            <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center shrink-0">
               <ChevronUp className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-1">Ascenso de Rango</h4>
               <p className="text-[10px] text-white/40 leading-relaxed">Publica configuraciones, comenta y gana likes para acumular XP. ¡Alcanza el rango de Headshot King y obtén el sello de verificado!</p>
            </div>
         </div>
      </div>
    </div>
  );
}
