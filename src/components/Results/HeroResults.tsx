import React from 'react';
import { formatCurrency } from '@/utils/formatters';

interface HeroResultsProps {
    hasExtra: boolean;
    isInvalidDownPayment: boolean;
    monthsSaved: number;
    interestSavings: number;
    onAddAmortization: () => void;
}

export const HeroResults: React.FC<HeroResultsProps> = ({
    hasExtra, isInvalidDownPayment, monthsSaved, interestSavings, onAddAmortization
}) => {
    return (
        <div className={`grid grid-cols-1 ${hasExtra ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 animate-in fade-in slide-in-from-top-4 duration-700`}>
            {hasExtra && !isInvalidDownPayment ? (
                <>
                    <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/20 flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        </div>
                        <div>
                            <p className="text-blue-100 dark:text-blue-200 text-[10px] font-black uppercase tracking-widest">Tempo de Financiamento Salvo</p>
                            <p className="text-2xl font-black">{Math.floor(monthsSaved / 12)}a <span className="text-base font-bold opacity-80">{monthsSaved % 12}m</span></p>
                        </div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white shadow-xl shadow-emerald-200 dark:shadow-emerald-900/20 flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        </div>
                        <div>
                            <p className="text-emerald-50 dark:text-emerald-100 text-[10px] font-black uppercase tracking-widest">Economia Direta em Juros</p>
                            <p className="text-2xl font-black">R$ {formatCurrency(interestSavings)}</p>
                        </div>
                    </div>
                </>
            ) : !isInvalidDownPayment && (
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-slate-600 dark:text-slate-400 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors transition-shadow">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">Pronto para economizar?</p>
                            <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">Adicione amortizações ao lado para ver o tempo e juros salvos.</p>
                        </div>
                    </div>
                    <button onClick={onAddAmortization} className="bg-slate-900 dark:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-600 transition-all">
                        Simular Amortização
                    </button>
                </div>
            )}
        </div>
    );
};
