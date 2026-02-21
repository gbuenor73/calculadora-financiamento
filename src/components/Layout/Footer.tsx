import React from 'react';
import { formatCurrency } from '@/utils/formatters';

interface FooterProps {
    optimizedTotalPaid: number;
    annualInterestRate: number;
    optimizedTotalInterest: number;
}

export const Footer: React.FC<FooterProps> = ({ optimizedTotalPaid, annualInterestRate, optimizedTotalInterest }) => {
    return (
        <footer className="bg-white border-t border-slate-200/60 mt-20 py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 w-full opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                    <div className="text-center group">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Custo Projetado do Imóvel</p>
                        <p className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 transition-colors">R$ {formatCurrency(optimizedTotalPaid)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Custo Efetivo Total (CET)</p>
                        <p className="text-[10px] font-black text-slate-500">{(annualInterestRate * 100).toFixed(2)}% a.a.</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total de Juros Pagos</p>
                        <p className="text-[10px] font-black text-slate-500">R$ {formatCurrency(optimizedTotalInterest)}</p>
                    </div>
                </div>
                <div className="pt-6 border-t border-slate-100 w-full text-center">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-none">ImobiJuros © 2026 • Ferramenta de Planejamento Financeiro</p>
                </div>
            </div>
        </footer>
    );
};
