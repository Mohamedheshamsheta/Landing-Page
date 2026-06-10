import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onRegister: (name: string, email: string, pass: string, role: string) => Promise<boolean>;
  error: string | null;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister, error }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Traveller'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await onLogin(formData.email, formData.password);
    } else {
      await onRegister(formData.fullName, formData.email, formData.password, formData.role);
    }
  };

  return (
    <div className="min-h-screen flex bg-paper font-sans selection:bg-ink selection:text-paper">
      {/* Left Side - Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink text-paper p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-tighter italic font-serif">The ARD</h2>
        </div>
        
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[8rem] font-bold leading-[0.85] tracking-tighter mb-12 font-serif italic"
          >
            THE<br />FUTURE<br />OF HERITAGE
          </motion.h1>
          <p className="text-paper/40 max-w-sm text-lg font-light leading-relaxed">
            Connecting the world's most discerning travellers with local cultural masters.
          </p>
        </div>

        <div className="relative z-10 flex gap-6">
          <div className="px-6 py-3 border border-paper/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">Curation</div>
          <div className="px-6 py-3 border border-paper/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">Preservation</div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-paper/5 rounded-full blur-[120px]" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
        <div className="absolute inset-0 bg-paper/50 backdrop-blur-3xl z-0" />
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-4">Identity Verification</p>
            <h2 className="text-6xl font-light tracking-tighter text-ink font-serif italic mb-4">
              {isLogin ? 'Access Portal' : 'Join the Guild'}
            </h2>
            <p className="text-ink/40 font-medium">
              {isLogin 
                ? 'Relics of a future identity await your return.' 
                : 'Begin your journey into the heart of legacy.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {error && (
              <div className="p-6 bg-red-400/5 border border-red-400/20 text-red-500 rounded-3xl text-xs font-bold uppercase tracking-widest leading-relaxed">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Full Legal Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/20 group-focus-within:text-accent transition-colors" />
                  <input 
                    type="text"
                    required
                    className="luxury-input w-full pl-16 py-5"
                    placeholder="E.g. Alexander Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Encrypted Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/20 group-focus-within:text-accent transition-colors" />
                <input 
                  type="email"
                  required
                  className="luxury-input w-full pl-16 py-5"
                  placeholder="name@legacy.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/20 group-focus-within:text-accent transition-colors" />
                <input 
                  type="password"
                  required
                  className="luxury-input w-full pl-16 py-5"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="luxury-button w-full py-6 text-lg tracking-tight group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLogin ? 'Initiate Sync' : 'Register Signature'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:text-ink transition-colors"
            >
              {isLogin 
                ? "Request Access Authorization" 
                : "Already Authenticated?"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
