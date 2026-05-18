import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, Sparkles, Smartphone, Trophy, Target, Zap, Layout } from 'lucide-react';
import { cn } from '../lib/utils';

interface Step {
  title: string;
  description: string;
  icon: any;
  highlight?: string;
}

const TOUR_STEPS: Step[] = [
  {
    title: 'Bienvenido Soldado',
    description: 'Estás en SensiFire, la central de inteligencia más avanzada para Free Fire. Aquí la precisión es ley.',
    icon: Layout
  },
  {
    title: 'Feed de Tendencias',
    description: 'Explora configuraciones en tiempo real. Filtra por estilo de juego: Rush, Sniper o el legendario One Tap.',
    icon: Zap,
    highlight: 'Feed'
  },
  {
    title: 'IA Advisor',
    description: 'Nuestra red neuronal analiza tu dispositivo y estilo para generar la sensibilidad perfecta automáticamente.',
    icon: Sparkles,
    highlight: 'AI Sensi'
  },
  {
    title: 'Despliegue de Arsenal',
    description: '¿Tienes una configuración letal? Publícala, sube tu HUD y ayuda a otros reclutas a subir de rango.',
    icon: Target,
    highlight: 'Post'
  },
  {
    title: 'Hall de la Fama',
    description: 'Compite en el ranking global. Gana XP, sube de nivel y conviértete en un Headshot King verificado.',
    icon: Trophy,
    highlight: 'Rankings'
  }
];

export default function GuidedTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  const step = TOUR_STEPS[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-rich-black/90 backdrop-blur-md"
            onClick={handleComplete}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm glass-card p-8 border-brand-orange/30 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-brand-orange/20 blur-[50px] rounded-full" />
            
            <button 
              onClick={handleComplete}
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-brand-orange/10 rounded-2xl border border-brand-orange/20">
                  <step.icon className="w-10 h-10 text-brand-orange animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-black italic gaming-gradient-text uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-bold">{step.description}</p>
              </div>

              {step.highlight && (
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_8px_#FF571A]" />
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Pestaña: {step.highlight}</span>
                </div>
              )}

              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={nextStep}
                  className="btn-primary w-full flex items-center justify-center gap-2 group"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? '¡Entendido!' : 'Continuar'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex justify-center gap-1.5">
                  {TOUR_STEPS.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === currentStep ? "w-6 bg-brand-orange shadow-[0_0_8px_#FF571A]" : "w-1.5 bg-white/10"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
