import { motion } from 'motion/react';
import { Instagram, Code, Heart, ChevronLeft, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreditsView() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 space-y-12 pb-32 min-h-screen">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white/5 rounded-xl text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black italic gaming-gradient-text tracking-tight uppercase">Protocolos de Origen</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Sistemas desarrollados por comando elite</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 py-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-orange to-brand-purple p-1 shadow-[0_0_30px_rgba(255,87,26,0.2)]">
            <div className="w-full h-full bg-rich-black rounded-2xl flex items-center justify-center">
              <Code className="w-12 h-12 text-brand-orange" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-[0_0_15px_#FF571A]">
            <Heart className="w-5 h-5 text-rich-black fill-current" />
          </div>
        </motion.div>

        <div className="text-center space-y-2">
          <p className="text-[10px] font-black uppercase text-brand-orange tracking-[0.4em] mb-1">Desarrollado por</p>
          <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            Viveros Alex
          </h3>
          <p className="text-white/20 font-black uppercase tracking-[0.2em] text-[8px]">Unidad de Inteligencia Táctica</p>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <motion.a 
            href="https://instagram.com/alexleovives" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 p-5 glass-card border-brand-purple/30 group hover:border-brand-purple transition-all"
          >
            <div className="p-3 bg-brand-purple/10 rounded-xl group-hover:bg-brand-purple/20 transition-colors">
              <Instagram className="w-6 h-6 text-brand-purple" />
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-black uppercase text-white/30 tracking-widest">Transmitir en</span>
              <span className="block font-bold text-sm">@alexleovives</span>
            </div>
            <Zap className="w-4 h-4 ml-auto text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-5 glass-card border-white/5 bg-white/[0.02]"
          >
            <div className="p-3 bg-white/5 rounded-xl">
              <Globe className="w-6 h-6 text-white/40" />
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-black uppercase text-white/30 tracking-widest">Base de Operaciones</span>
              <span className="block font-bold text-sm">Digital World</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="glass-card p-6 border-brand-orange/20 bg-brand-orange/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[40px] -mr-16 -mt-16" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-3 flex items-center gap-2">
          <Zap className="w-3 h-3" /> Estado de Misión
        </h4>
        <p className="text-xs text-white/50 leading-relaxed font-medium italic">
          "SensiFire ha sido forjado con la pasión de un gamer y la precisión de un ingeniero. Cada línea de código es un headshot directo a la mediocridad. Gracias por ser parte de este escuadrón."
        </p>
      </div>

      <div className="text-center">
        <p className="text-[8px] font-black uppercase text-white/10 tracking-[0.5em]">SensiFire v2.4.0 • 2026 Protocol</p>
      </div>
    </div>
  );
}
