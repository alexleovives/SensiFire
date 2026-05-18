import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Smartphone, Zap, Target, Loader2, ChevronRight, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AIAdvisorView() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [formData, setFormData] = useState({
    phoneModel: '',
    fps: '60',
    gameStyle: 'Rush'
  });

  const handleRecommend = async () => {
    if (!formData.phoneModel) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setRecommendation(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4 space-y-8">
      <div>
        <h2 className="text-2xl font-black italic gaming-gradient-text tracking-tight flex items-center gap-2">
          IA Advisor <Sparkles className="w-5 h-5 text-brand-orange" />
        </h2>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Sincronización neuronal de precisión</p>
      </div>

      {!recommendation ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-white/40 tracking-widest px-1">Modelo de Dispositivo</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Ej: Galaxy S24 Ultra"
                  value={formData.phoneModel}
                  onChange={(e) => setFormData(p => ({ ...p, phoneModel: e.target.value }))}
                  className="w-full bg-rich-black border border-white/5 rounded-xl py-4 pl-12 pr-4 focus:border-brand-orange outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-white/40 tracking-widest px-1">FPS Objetivos</label>
                <select 
                  value={formData.fps}
                  onChange={(e) => setFormData(p => ({ ...p, fps: e.target.value }))}
                  className="w-full bg-rich-black border border-white/5 rounded-xl py-4 px-4 focus:border-brand-orange outline-none appearance-none"
                >
                  <option value="30">30 FPS</option>
                  <option value="60">60 FPS</option>
                  <option value="90">90 FPS</option>
                  <option value="120">120 FPS</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-white/40 tracking-widest px-1">Estilo de Juego</label>
                <select 
                  value={formData.gameStyle}
                  onChange={(e) => setFormData(p => ({ ...p, gameStyle: e.target.value }))}
                  className="w-full bg-rich-black border border-white/5 rounded-xl py-4 px-4 focus:border-brand-orange outline-none appearance-none"
                >
                  <option value="Rush">Rush</option>
                  <option value="Precision">Precisión</option>
                  <option value="One Tap">One Tap</option>
                  <option value="Sniper">Sniper</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            disabled={loading || !formData.phoneModel}
            onClick={handleRecommend}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Generar Configuración <BrainCircuit className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 border-brand-orange/30">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-xl font-black italic">Análisis Completado</h3>
                  <p className="text-[10px] font-bold text-white/40 uppercase">{formData.phoneModel} • {formData.fps} FPS</p>
               </div>
               <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'General', val: recommendation.general },
                  { label: 'Red Dot', val: recommendation.redDot },
                  { label: 'Mira 2X', val: recommendation.scope2x },
                  { label: 'Mira 4X', val: recommendation.scope4x },
                  { label: 'AWM', val: recommendation.awm },
                  { label: 'DPI Recomendado', val: recommendation.dpi, accent: true }
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">{item.label}</span>
                      <span className={cn("text-lg font-black italic", item.accent ? "text-brand-blue" : "text-brand-orange")}>{item.val}</span>
                    </div>
                    <div className="hud-progress-bg">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.val / (item.label === 'DPI Recomendado' ? 1200 : 200)) * 100}%` }}
                        className={cn("hud-progress-fill", item.accent && "bg-brand-blue shadow-[0_0_10px_#00E0FF]")}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="glass-card p-6 border-white/10">
             <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-3">Consejo del Algoritmo</h4>
             <p className="text-sm font-medium leading-relaxed italic text-white/80">"{recommendation.advice}"</p>
          </div>

          <button 
            onClick={() => setRecommendation(null)}
            className="w-full btn-secondary"
          >
            Nueva Consulta
          </button>
        </motion.div>
      )}

      {/* Info Boxes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 space-y-2">
          <Zap className="w-5 h-5 text-brand-orange" />
          <h4 className="text-[8px] font-black uppercase tracking-widest">Velocidad</h4>
          <p className="text-[10px] text-white/40 font-medium">Optimizado para reacción instantánea.</p>
        </div>
        <div className="glass-card p-4 space-y-2">
          <Target className="w-5 h-5 text-brand-blue" />
          <h4 className="text-[8px] font-black uppercase tracking-widest">Precisión</h4>
          <p className="text-[10px] text-white/40 font-medium">Auto-centrado de mira calculado.</p>
        </div>
      </div>
    </div>
  );
}
