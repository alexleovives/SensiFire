import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Smartphone, Sliders, ChevronRight, Check, Loader2, Target, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { sensitivityService } from '../services/sensiService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UploadView() {
  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    general: 90,
    redDot: 85,
    scope2x: 80,
    scope4x: 75,
    awm: 50,
    phoneModel: '',
    dpi: 440,
    gameStyle: 'Rush',
    headshotRate: 85,
    isOneTap: false
  });

  const styles = ['Rush', 'Sniper', 'One Tap', 'Competitivo', 'Precisión'];

  const handleUpdate = (key: string, val: any) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handlePublish = async () => {
    if (!user) return;
    setIsPublishing(true);
    try {
      await sensitivityService.publish({
        ...formData,
        authorId: user.uid,
        authorName: user.username,
        authorPhoto: user.photoURL,
        isOneTap: formData.gameStyle === 'One Tap' || formData.isOneTap
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to publish', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="px-6 py-4 space-y-8 pb-32">
        <div>
          <h2 className="text-2xl font-black italic gaming-gradient-text tracking-tight uppercase">Desplegar Arsenal</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Configuración de combate optimizada</p>
        </div>

        {/* Multi-step indicator */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div 
                animate={{ width: step >= s ? '100%' : '0%' }}
                className="h-full bg-brand-orange shadow-[0_0_10px_#FF571A]"
              />
            </div>
          ))}
        </div>

        <div className="min-h-[400px]">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                 {[
                   { id: 'general', label: 'Sensibilidad General', icon: Sliders },
                   { id: 'redDot', label: 'Mira Punto Rojo', icon: Target },
                   { id: 'scope2x', label: 'Mira 2X', icon: Zap },
                   { id: 'scope4x', label: 'Mira 4X', icon: Zap },
                   { id: 'awm', label: 'Mira AWM', icon: Target },
                 ].map((item) => (
                   <div key={item.id} className="space-y-3">
                     <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase text-white/40 tracking-widest flex items-center gap-2">
                          <item.icon className="w-3 h-3 text-brand-orange" />
                          {item.label}
                        </label>
                        <span className="text-sm font-black italic text-brand-orange">{(formData as any)[item.id]}</span>
                     </div>
                     <input 
                       type="range" 
                       min="0" max="100" 
                       value={(formData as any)[item.id]}
                       onChange={(e) => handleUpdate(item.id, parseInt(e.target.value))}
                       className="w-full accent-brand-orange h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
                     />
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-white/40 tracking-widest px-1">Estilo de Juego</label>
                 <div className="grid grid-cols-2 gap-3">
                   {styles.map(style => (
                     <button
                       key={style}
                       onClick={() => handleUpdate('gameStyle', style)}
                       className={cn(
                         "p-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                         formData.gameStyle === style 
                          ? "bg-brand-orange/20 border-brand-orange text-white shadow-[0_0_15px_rgba(255,87,26,0.2)]" 
                          : "bg-surface-dark border-white/5 text-white/30"
                       )}
                     >
                       {style}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="space-y-4">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">Headshot Rate Estimado</label>
                    <span className="text-sm font-black italic text-brand-orange">{formData.headshotRate}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" max="100" 
                   value={formData.headshotRate}
                   onChange={(e) => handleUpdate('headshotRate', parseInt(e.target.value))}
                   className="w-full accent-brand-orange h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
                 />
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-white/40 tracking-widest px-1">Dispositivo Hardware</label>
                 <div className="grid grid-cols-1 gap-4">
                   <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        value={formData.phoneModel}
                        onChange={(e) => handleUpdate('phoneModel', e.target.value)}
                        placeholder="Modelo del Celular"
                        className="w-full bg-rich-black border border-white/5 rounded-xl py-4 pl-12 pr-4 focus:border-brand-orange outline-none transition-all"
                      />
                   </div>
                   <div className="relative">
                      <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="number" 
                        value={formData.dpi}
                        onChange={(e) => handleUpdate('dpi', parseInt(e.target.value))}
                        placeholder="DPI Configurado"
                        className="w-full bg-rich-black border border-white/5 rounded-xl py-4 pl-12 pr-4 focus:border-brand-orange outline-none transition-all"
                      />
                   </div>
                 </div>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass-card aspect-video flex flex-col items-center justify-center border-dashed border-2 border-white/10 group cursor-pointer hover:border-brand-orange/40 transition-all p-8">
               <div className="p-6 bg-brand-orange/10 rounded-full group-hover:scale-110 transition-transform mb-4">
                 <Camera className="w-10 h-10 text-brand-orange" />
               </div>
               <span className="text-[10px] font-black uppercase text-white/30 tracking-widest text-center px-4">Subir HUD o Captura de Resultados</span>
               <p className="text-[8px] font-bold text-white/10 uppercase mt-4">JPG, PNG • Máx 5MB</p>
             </div>
             
             <div className="glass-card p-6 border-brand-blue/30 space-y-4">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-brand-blue" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Protocolo Verificado</h4>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">Al publicar, tu configuración será analizada por el sistema de tendencias. Los reclutas podrán calificar tu headshot rate.</p>
             </div>
            </motion.div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              disabled={isPublishing}
              onClick={() => setStep(s => s - 1)}
              className="btn-secondary flex-1"
            >
              Atrás
            </button>
          )}
          <button 
            disabled={isPublishing || (step === 2 && !formData.phoneModel)}
            onClick={() => step < 3 ? setStep(s => s + 1) : handlePublish()}
            className="btn-primary flex-[2] flex items-center justify-center gap-2 group"
          >
            {isPublishing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {step < 3 ? 'Siguiente Protocolo' : 'Desplegar Arsenal'}
                <ChevronRight className={cn("w-4 h-4 group-hover:translate-x-1 transition-transform", step === 3 && "hidden")} />
                {step === 3 && <Check className="w-4 h-4" />}
              </>
            )}
          </button>
        </div>
    </div>
  );
}
