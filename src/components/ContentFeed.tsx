import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, Smartphone, ShieldCheck, Zap, Trophy, TrendingUp, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { sensitivityService } from '../services/sensiService';

export default function ContentFeed() {
  const [activeTab, setActiveTab] = useState('trends');
  const [posts, setPosts] = useState<any[]>([]);
  const [dailySensi, setDailySensi] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'trends', label: 'Tendencias', icon: TrendingUp },
    { id: 'one-tap', label: 'One Tap', icon: Zap },
    { id: 'Rush', label: 'Rush', icon: Target },
    { id: 'Sniper', label: 'Sniper', icon: Target },
    { id: 'Competitivo', label: 'Competitivo', icon: Trophy },
  ];

  useEffect(() => {
    async function loadInitialData() {
      const daily = await sensitivityService.getDailySensi();
      setDailySensi(daily);
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadFeed() {
      setLoading(true);
      const data = await sensitivityService.getFeed(activeTab);
      setPosts(data);
      setLoading(false);
    }
    loadFeed();
  }, [activeTab]);

  return (
    <div className="space-y-6 pb-20">
      {/* Search & Categories */}
      <div className="px-6 space-y-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-brand-orange text-rich-black shadow-[0_0_15px_rgba(255,87,26,0.4)]" 
                  : "bg-surface-dark border border-white/5 text-white/40"
              )}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured: Sensitivity of the Day */}
      {dailySensi && activeTab === 'trends' && (
        <div className="px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden group rounded-3xl border border-brand-orange/30 bg-gradient-to-br from-brand-orange/20 to-brand-purple/20 p-6"
          >
            <div className="absolute top-0 right-0 p-4">
               <Zap className="w-12 h-12 text-brand-orange opacity-20 rotate-12" />
            </div>
            <div className="relative z-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-brand-orange text-rich-black text-[10px] font-black uppercase italic rounded-lg">SENSI DEL DÍA</span>
              <h3 className="text-2xl font-black italic">{dailySensi.authorName}</h3>
              <p className="text-white/60 text-xs font-medium max-w-[200px]">La configuración más letal de las últimas 24 horas.</p>
              <div className="flex gap-4 pt-2">
                  <div className="text-center">
                    <span className="block text-lg font-black text-brand-orange">{dailySensi.headshotRate}%</span>
                    <span className="block text-[8px] font-black text-white/30 uppercase">HS RATE</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-black text-brand-blue">{dailySensi.general}</span>
                    <span className="block text-[8px] font-black text-white/30 uppercase">GRAL</span>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Feed List */}
      <div className="px-6 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Cargando Arsenal...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-surface-dark/40 rounded-2xl border border-white/5 mx-auto max-w-xs">
             <Target className="w-12 h-12 text-white/10 mx-auto mb-4" />
             <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">No se encontraron despliegues</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card group"
              >
                {/* Post Header */}
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full border border-brand-orange/30 overflow-hidden shrink-0">
                        <img src={post.authorPhoto} alt={post.authorName} className="w-full h-full object-cover" />
                      </div>
                      {post.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-brand-blue rounded-full p-0.5 border-2 border-rich-black">
                         <ShieldCheck className="w-3 h-3 text-rich-black fill-current" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm tracking-tight hover:text-brand-orange transition-colors cursor-pointer">{post.authorName}</span>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                          post.xp > 1000 ? "bg-brand-orange/10 text-brand-orange" : "bg-white/5 text-white/40"
                        )}>
                          {post.rank || 'Novato'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase mt-0.5">
                        <span className="flex items-center gap-1">
                          <Smartphone className="w-3 h-3" />
                          {post.phoneModel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="text-right">
                        <span className="block text-xs font-black text-neon-green">{post.headshotRate}%</span>
                        <span className="block text-[7px] font-black text-white/20 uppercase">HS RATE</span>
                     </div>
                     <button className="text-white/20 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                  </div>
                </div>

                {/* Main Sensi Display */}
                <div className="px-5 pb-5 grid grid-cols-5 gap-3">
                  {[
                    { key: 'general', label: 'GRAL' },
                    { key: 'redDot', label: 'RED' },
                    { key: 'scope2x', label: '2X' },
                    { key: 'scope4x', label: '4X' },
                    { key: 'awm', label: 'AWM' }
                  ].map((s) => (
                    <div key={s.key} className="space-y-1.5">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[7px] font-black text-white/30 uppercase">{s.label}</span>
                        <span className="text-[9px] font-black text-brand-orange">{post[s.key]}</span>
                      </div>
                      <div className="hud-progress-bg">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${post[s.key]}%` }}
                          className="hud-progress-fill"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interaction Footer */}
                <div className="px-5 py-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 group/btn">
                      <Heart className="w-5 h-5 text-white/20 group-hover/btn:text-brand-orange transition-colors" />
                      <span className="text-[10px] font-black text-white/40">{post.likesCount || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 group/btn">
                      <MessageCircle className="w-5 h-5 text-white/20 group-hover/btn:text-brand-blue transition-colors" />
                      <span className="text-[10px] font-black text-white/40">{post.commentsCount || 0}</span>
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 group/btn px-3 py-1 bg-white/5 rounded-lg border border-white/5 hover:border-neon-green/30 transition-all">
                      <Target className="w-4 h-4 text-white/20 group-hover/btn:text-neon-green transition-colors" />
                      <span className="text-[10px] font-black text-white/40">Votar Precisión</span>
                    </button>
                    <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-black text-white/30 uppercase tracking-widest">{post.gameStyle}</span>
                    <button className="text-white/20 hover:text-brand-orange transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

