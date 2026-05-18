import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, Filter, X, Smartphone, Target, Zap, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { sensitivityService } from '../services/sensiService';

export default function SearchView() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    brand: 'Cualquiera',
    dpi: 'Cualquiera',
    gameStyle: 'Cualquiera',
    userLevel: 'Cualquiera'
  });

  const BRANDS = ['Cualquiera', 'Samsung', 'iPhone', 'Xiaomi', 'Motorola', 'Realme', 'Infinix'];
  const DPI_RANGES = ['Cualquiera', '440-500', '500-600', '600-800', '800+'];
  const STYLES = ['Cualquiera', 'Rush', 'Sniper', 'One Tap', 'Competitivo', 'Precisión'];

  const handleSearch = async () => {
    setLoading(true);
    // Simulating search logic
    const all = await sensitivityService.getFeed() as any[];
    setResults(all.filter(p => !query || (p.phoneModel && p.phoneModel.toLowerCase().includes(query.toLowerCase())) || (p.authorName && p.authorName.toLowerCase().includes(query.toLowerCase()))));
    setLoading(false);
  };

  return (
    <div className="px-6 py-4 space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-black italic gaming-gradient-text tracking-tight uppercase">Radar Táctico</h2>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Busca el equipamiento perfecto</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
           <SearchIcon className="w-5 h-5 text-white/20" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar Soldado o Dispositivo..."
          className="w-full bg-surface-dark border border-white/5 rounded-2xl py-5 pl-12 pr-12 focus:border-brand-orange outline-none transition-all font-medium text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
            showFilters ? "bg-brand-orange text-rich-black" : "text-white/20 hover:text-white"
          )}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-6 grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase text-white/30 tracking-widest px-1">Marca</label>
                  <select 
                    value={filters.brand}
                    onChange={(e) => setFilters(f => ({ ...f, brand: e.target.value }))}
                    className="w-full bg-rich-black border border-white/5 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-brand-orange"
                  >
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase text-white/30 tracking-widest px-1">DPI Range</label>
                  <select 
                    value={filters.dpi}
                    onChange={(e) => setFilters(f => ({ ...f, dpi: e.target.value }))}
                    className="w-full bg-rich-black border border-white/5 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-brand-orange"
                  >
                    {DPI_RANGES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase text-white/30 tracking-widest px-1">Modo de Juego</label>
                  <select 
                    value={filters.gameStyle}
                    onChange={(e) => setFilters(f => ({ ...f, gameStyle: e.target.value }))}
                    className="w-full bg-rich-black border border-white/5 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-brand-orange"
                  >
                    {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
               <div className="col-span-2 flex justify-end">
                  <button 
                    onClick={() => { setFilters({ brand: 'Cualquiera', dpi: 'Cualquiera', gameStyle: 'Cualquiera', userLevel: 'Cualquiera' }); setShowFilters(false); }}
                    className="text-[8px] font-black uppercase text-brand-orange mt-2 px-2"
                  >
                    Resetear Filtros
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {loading ? (
             <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-50">
               <TrendingUp className="w-8 h-8 text-brand-orange animate-pulse" />
               <span className="text-[8px] font-black uppercase tracking-widest">Escaneando Perímetro...</span>
             </div>
        ) : results.length > 0 ? (
          results.map((res) => (
            <div key={res.id} className="glass-card p-4 flex gap-4 items-center group cursor-pointer hover:border-brand-orange/40">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-white/30 group-hover:text-brand-orange transition-colors" />
               </div>
               <div className="flex-1">
                  <h4 className="text-[11px] font-bold tracking-tight">{res.phoneModel}</h4>
                  <p className="text-[9px] text-white/40 font-medium uppercase">{res.authorName} • {res.gameStyle}</p>
               </div>
               <div className="text-right">
                  <span className="block text-xs font-black text-neon-green">{res.headshotRate}%</span>
                  <span className="block text-[7px] font-black text-white/20 uppercase">HS RATE</span>
               </div>
            </div>
          ))
        ) : query && (
          <div className="text-center py-20 bg-surface-dark/40 rounded-2xl border border-white/5 border-dashed">
            <X className="w-10 h-10 text-white/10 mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Sin señales en el radar</p>
          </div>
        )}
      </div>

      {/* Trending Search Tags */}
      <div>
         <h3 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-4">Tendencias de Búsqueda</h3>
         <div className="flex flex-wrap gap-2">
            {['Samsung A54', 'DPI 600', 'iPhone 15 Pro', 'One Tap Sensi', 'Xiaomi 13T'].map(tag => (
              <button key={tag} onClick={() => { setQuery(tag); handleSearch(); }} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-white/60 hover:border-white/20 transition-all italic">
                #{tag}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
