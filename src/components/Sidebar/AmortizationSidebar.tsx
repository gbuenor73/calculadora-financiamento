import React from 'react';
import { Card } from '@/components/ui/Card';
import { ExtraAmortization, AmortizationFrequency } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface AmortizationSidebarProps {
    amortizations: ExtraAmortization[];
    loanAmount: number;
    termInMonths: number;
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, updates: Partial<ExtraAmortization>) => void;
}

export const AmortizationSidebar: React.FC<AmortizationSidebarProps> = ({
    amortizations, loanAmount, termInMonths, onAdd, onRemove, onUpdate
}) => {
    return (
        <Card
            title="Aportes Extras"
            subtitle="Plano de aceleração"
            className="border-emerald-100 dark:border-emerald-900/30"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-600 dark:text-emerald-500"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" /></svg>}
            headerAction={
                <button onClick={onAdd} className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
                </button>
            }
        >
            <div className="space-y-4">
                {amortizations.length === 0 ? (
                    <div className="py-8 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium px-4">Adicione aportes extras para ver o quanto você pode economizar de juros e tempo.</p>
                        <button onClick={onAdd} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
                            Adicionar Aporte
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {amortizations.map((amort) => (
                            <div key={amort.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 rounded-xl space-y-3 relative group transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm">
                                <button 
                                    onClick={() => onRemove(amort.id)} 
                                    aria-label="Remover aporte"
                                    className="absolute top-3 right-3 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clipRule="evenodd" /></svg>
                                </button>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Valor do Aporte</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs font-bold">R$</span>
                                        <input
                                            type="text"
                                            value={formatCurrency(amort.amount)}
                                            onChange={(e) => onUpdate(amort.id, { amount: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) / 100 })}
                                            className={`w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-black text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all ${amort.amount >= loanAmount && loanAmount > 0 ? 'border-amber-400 dark:border-amber-600' : ''}`}
                                        />
                                    </div>
                                </div>
                                <div className={`grid ${amort.frequency === 'once' ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                                    <div className={`${amort.frequency === 'monthly' ? 'col-span-2' : 'col-span-1'} space-y-1`}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Frequência</label>
                                        <select
                                            value={amort.frequency}
                                            onChange={(e) => onUpdate(amort.id, { frequency: e.target.value as AmortizationFrequency })}
                                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
                                        >
                                            <option value="monthly">Mensal</option>
                                            <option value="bimonthly">Bimestral</option>
                                            <option value="quarterly">Trimestral</option>
                                            <option value="fourmonthly">Quadrimestral</option>
                                            <option value="semiannually">Semestral</option>
                                            <option value="yearly">Anual</option>
                                            <option value="once">Único</option>
                                        </select>
                                    </div>
                                    {amort.frequency !== 'monthly' && amort.frequency !== 'once' && (
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Mês Inicial</label>
                                            <select
                                                value={amort.startMonth}
                                                onChange={(e) => onUpdate(amort.id, { startMonth: parseInt(e.target.value, 10) })}
                                                className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
                                            >
                                                {['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'].map((name, i) => (
                                                    <option key={i + 1} value={i + 1}>{name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {amort.frequency === 'once' && (
                                        <>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Ano</label>
                                                <select
                                                    value={Math.max(1, Math.ceil(amort.startMonth / 12))}
                                                    onChange={(e) => {
                                                        const year = parseInt(e.target.value, 10);
                                                        const currentMonthInYear = ((amort.startMonth - 1) % 12) + 1;
                                                        onUpdate(amort.id, { startMonth: (year - 1) * 12 + currentMonthInYear });
                                                    }}
                                                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
                                                >
                                                    {Array.from({ length: Math.ceil(termInMonths / 12) }, (_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}º Ano</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Mês</label>
                                                <select
                                                    value={((amort.startMonth - 1) % 12) + 1}
                                                    onChange={(e) => {
                                                        const monthInYear = parseInt(e.target.value, 10);
                                                        const currentYear = Math.max(1, Math.ceil(amort.startMonth / 12));
                                                        onUpdate(amort.id, { startMonth: (currentYear - 1) * 12 + monthInYear });
                                                    }}
                                                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
                                                >
                                                    {['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'].map((name, i) => (
                                                        <option key={i + 1} value={i + 1}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button onClick={onAdd} className="w-full py-2 border-2 border-dashed border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all inline-flex items-center justify-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
                            Adicionar outro aporte
                        </button>
                    </div>
                )}
            </div>
        </Card>
    );
};
