import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export default function AuthView() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, loginPending } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-rich-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 blur-[120px] rounded-full" />

      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 text-center"
      >
        <div className="w-20 h-20 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(255,87,26,0.4)]">
           <Zap className="w-10 h-10 text-white fill-current" />
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-brand-orange">SensiFire</h1>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Domina el campo de batalla</p>
      </motion.div>

      {/* Auth Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm glass-card p-8 space-y-6"
      >
        <div className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-4 w-5 h-5 text-white/30" />
              <input 
                type="text" 
                placeholder="Nombre de Soldado" 
                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all placeholder:text-white/20" 
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-white/30" />
            <input 
              type="email" 
              placeholder="Email del Soldado" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all placeholder:text-white/20" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-white/30" />
            <input 
              type="password" 
              placeholder="Código de Acceso" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all placeholder:text-white/20" 
            />
          </div>
        </div>

        <button 
          onClick={login}
          disabled={loginPending}
          className="w-full py-4 bg-brand-orange text-rich-black font-black uppercase text-xs tracking-widest rounded-xl shadow-[0_0_30px_rgba(255,87,26,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loginPending ? (
            <div className="w-5 h-5 border-2 border-rich-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {isLogin ? 'Entrar al Campo' : 'Reclutar Soldado'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center pt-4">
           <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-white/40 hover:text-brand-orange transition-colors uppercase tracking-widest"
           >
             {isLogin ? '¿No tienes cuenta? Registrate' : '¿Ya tienes cuenta? Entrar'}
           </button>
        </div>
      </motion.div>

      <div className="mt-12 flex gap-8">
         <div className="flex flex-col items-center opacity-30">
            <Shield className="w-6 h-6 mb-2" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Seguro</span>
         </div>
         <div className="flex flex-col items-center opacity-30">
            <Zap className="w-6 h-6 mb-2" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Rápido</span>
         </div>
      </div>
    </div>
  );
}
