
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = "",
  icon,
  headerAction
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden transition-all hover:shadow-md ${className}`}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight leading-none">{title}</h3>}
              {subtitle && <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

