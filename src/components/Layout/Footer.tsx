import React from 'react';
import { formatCurrency } from '@/utils/formatters';

interface FooterProps {
    optimizedTotalPaid: number;
    annualInterestRate: number;
    optimizedTotalInterest: number;
}

export const Footer: React.FC<FooterProps> = ({ optimizedTotalPaid, annualInterestRate, optimizedTotalInterest }) => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 mt-20 py-8 px-4 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 w-full opacity-40 dark:opacity-20 grayscale hover:opacity-100 dark:hover:opacity-80 hover:grayscale-0 transition-all duration-500">
                    <div className="text-center group">
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Custo Projetado do Imóvel</p>
                        <p className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">R$ {formatCurrency(optimizedTotalPaid)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Custo Efetivo Total (CET)</p>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">{(annualInterestRate * 100).toFixed(2)}% a.a.</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Total de Juros Pagos</p>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">R$ {formatCurrency(optimizedTotalInterest)}</p>
                    </div>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 w-full flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Recomendações:</span>
                        <a href="#" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Melhores Taxas</a>
                        <a href="#" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Seguro Habitacional</a>
                        <a href="#" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Consórcios</a>
                    </div>
                    <p className="text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.3em] leading-none mt-2">Lucidus © 2026 • Ferramenta de Planejamento Financeiro</p>
                </div>
            </div>
        </footer>
    );
};
