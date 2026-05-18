import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Bookmark, Expand } from 'lucide-react';

const WALLPAPERS = [
  { id: 1, title: 'Neon Soldier', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', category: 'FF Skins' },
  { id: 2, title: 'Urban Sniper', url: 'https://images.unsplash.com/photo-1614027164847-1b2809eb7b9b?q=80&w=1964&auto=format&fit=crop', category: 'Action' },
  { id: 3, title: 'Futuristic Battle', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop', category: 'Concept' },
  { id: 4, title: 'Night Ops', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop', category: 'Minimal' },
];

export default function WallpapersView() {
  const categories = ['Todo', 'FF Skins', 'Action', 'Concept', 'Minimal'];
  const [activeCat, setActiveCat] = useState('Todo');

  return (
    <div className="px-6 py-4 space-y-8 pb-20">
      <div>
        <h2 className="text-2xl font-black italic gaming-gradient-text tracking-tight">Arsenal Visual</h2>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Wallpapers gaming ultra HD 4K</p>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCat === cat ? 'bg-white text-rich-black' : 'bg-white/5 text-white/30 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {WALLPAPERS.filter(w => activeCat === 'Todo' || w.category === activeCat).map((wp, idx) => (
          <motion.div 
            key={wp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-card"
          >
            <img 
              src={wp.url} 
              alt={wp.title} 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
               <h4 className="text-xs font-black italic uppercase text-white/90 mb-1">{wp.title}</h4>
               <p className="text-[8px] font-bold text-white/40 uppercase mb-3">{wp.category}</p>
               
               <div className="flex gap-2">
                 <button className="flex-1 bg-white/10 backdrop-blur-md p-2 rounded-lg flex items-center justify-center hover:bg-brand-orange hover:text-rich-black transition-colors">
                    <Download className="w-4 h-4" />
                 </button>
                 <button className="flex-1 bg-white/10 backdrop-blur-md p-2 rounded-lg flex items-center justify-center hover:bg-white hover:text-rich-black transition-colors">
                    <Bookmark className="w-4 h-4" />
                 </button>
               </div>
            </div>
            
            <button className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
               <Expand className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
