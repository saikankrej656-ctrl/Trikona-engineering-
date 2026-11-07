import React, { useState } from 'react';
import { Lock, Unlock, X, ShieldAlert, KeyRound } from 'lucide-react';
import { TrikonaLogo } from './TrikonaLogo';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const ADMIN_PIN = '9970'; // Owner PIN matching phone number start

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === ADMIN_PIN || pin.trim() === '9970113207') {
      onAuthenticated();
      setPin('');
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left">
        <button
          type="button"
          onClick={() => {
            setPin('');
            setError(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
          <TrikonaLogo size="sm" showWordmark={false} accentColor="cyan" />
          <div>
            <h3 className="text-base font-bold text-white font-display">Owner Access Verification</h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase">TRIKONA Engineering</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Review management controls are strictly restricted to the TRIKONA founder. Please enter your secret admin PIN.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="password"
              maxLength={10}
              value={pin}
              autoFocus
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter Owner PIN (e.g. 9970)"
              className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 font-mono tracking-widest ${
                error
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
            />
            {error && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-mono">
                <ShieldAlert className="w-3 h-3" />
                <span>Incorrect owner verification PIN</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
            >
              Verify &amp; Unlock
            </button>
            <button
              type="button"
              onClick={() => {
                setPin('');
                setError(false);
                onClose();
              }}
              className="py-2.5 px-3 text-xs font-medium text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
