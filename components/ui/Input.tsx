import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 text-sm font-medium text-slate-900 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/50 focus-visible:border-red-600/50 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50',
              icon ? 'pl-11 pr-4' : 'px-4',
              error && 'border-red-500 ring-red-500/20 focus-visible:ring-red-500/50 focus-visible:border-red-500',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-[10px] font-medium text-slate-400 ml-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
