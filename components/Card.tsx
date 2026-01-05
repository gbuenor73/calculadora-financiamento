
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
};
