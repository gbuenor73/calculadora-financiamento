import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: string;
    error?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = "", ...props }) => {
    const id = useId();
    return (
        <div className="space-y-1.5 w-full">
            <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</label>
            <div className="relative group">
                {icon && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm group-focus-within:text-blue-500 transition-colors pointer-events-none">
                        {icon}
                    </span>
                )}
                <input
                    {...props}
                    id={id}
                    className={`input-field ${icon ? 'pl-10' : 'px-4'} ${error ? 'border-red-500 bg-red-50' : ''} ${className}`}
                />
            </div>
        </div>
    );
};
