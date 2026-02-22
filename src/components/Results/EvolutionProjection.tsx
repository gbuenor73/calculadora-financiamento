import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/utils/formatters';
import { CalculationResults } from '@/types';

interface EvolutionProjectionProps {
    showYearly: boolean;
    setShowYearly: (show: boolean) => void;
    yearlyEvolution: any[];
    expandedYears: Set<number>;
    toggleYear: (year: number) => void;
    toggleAllYears: (years: number[], expand: boolean) => void;
    results: CalculationResults;
    hasExtra: boolean;
}

export const EvolutionProjection: React.FC<EvolutionProjectionProps> = ({
    showYearly, setShowYearly, yearlyEvolution, expandedYears,
    toggleYear, toggleAllYears, results, hasExtra
}) => {
    const yearsToExpand = yearlyEvolution.map(y => y.year);
    const allExpanded = expandedYears.size === yearlyEvolution.length && yearlyEvolution.length > 0;

    const chartData = hasExtra
        ? [
            { name: 'Custo Original', valor: results.totalInterest, fill: '#cbd5e1' },
            { name: 'Com Amortização', valor: results.optimizedTotalInterest, fill: '#ef4444' },
        ]
        : [
            { name: 'Juros Totais', valor: results.totalInterest, fill: '#64748b' }
        ];

    const isDarkMode = document.documentElement.classList.contains('dark');

    return (
        <Card
            title="Projeção de Evolução"
            subtitle="Amortização do saldo devedor"
            headerAction={
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button onClick={() => setShowYearly(false)} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${!showYearly ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>Gráfico</button>
                    <button onClick={() => setShowYearly(true)} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${showYearly ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>Tabela</button>
                </div>
            }
        >
            {showYearly ? (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleAllYears(yearsToExpand, !allExpanded)}
                            className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 underline underline-offset-4"
                        >
                            {allExpanded ? "Recolher Tudo" : "Expandir Tudo"}
                        </button>
                    </div>
                    <div className="overflow-x-auto -mx-6 px-6 scrollbar-hide">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <th className="py-4 px-2">Ano / Mês</th>
                                    <th className="py-4 px-2">Parcela Média</th>
                                    <th className="py-4 px-2">Juros</th>
                                    <th className="py-4 px-2">Amortização</th>
                                    <th className="py-4 px-2 text-right">Saldo Restante</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {yearlyEvolution.map((y) => (
                                    <React.Fragment key={y.year}>
                                        <tr onClick={() => toggleYear(y.year)} className={`group cursor-pointer transition-all ${expandedYears.has(y.year) ? 'bg-blue-50/40 dark:bg-blue-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}>
                                            <td className="py-4 px-2 font-black text-slate-800 dark:text-slate-200 flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${expandedYears.has(y.year) ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                                    <svg className={`w-3 h-3 transition-transform ${expandedYears.has(y.year) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                {y.year}º Ano
                                            </td>
                                            <td className="py-4 px-2 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">R$ {formatCurrency(y.avgInstallment)}</td>
                                            <td className="py-4 px-2 text-red-500/80 dark:text-red-400 font-bold whitespace-nowrap">R$ {formatCurrency(y.totalInterest)}</td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-emerald-600 dark:text-emerald-500 font-bold whitespace-nowrap">R$ {formatCurrency(y.totalPrincipal + y.totalExtra)}</span>
                                                    {y.totalExtra > 0 && <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-black px-1.5 py-0.5 rounded-full">+{formatCurrency(y.totalExtra)}</span>}
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-right text-slate-900 dark:text-slate-100 font-black whitespace-nowrap">R$ {formatCurrency(y.endBalance)}</td>
                                        </tr>
                                        {expandedYears.has(y.year) && y.months.map((m: any) => (
                                            <tr key={`m-${m.month}`} className="bg-white dark:bg-slate-900/50 border-b border-slate-50/60 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 animate-in fade-in duration-300">
                                                <td className="py-2.5 px-2 pl-10 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                                    Mês {m.month}
                                                </td>
                                                <td className="py-2.5 px-2 text-xs text-slate-500 dark:text-slate-400">R$ {formatCurrency(m.interest + m.principal)}</td>
                                                <td className="py-2.5 px-2 text-xs text-red-400">R$ {formatCurrency(m.interest)}</td>
                                                <td className="py-2.5 px-2 text-xs text-emerald-500 font-medium whitespace-nowrap">
                                                    R$ {formatCurrency(m.principal + m.extra)}
                                                    {m.extra > 0 && <span className="ml-1 text-[8px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded-sm">Extra</span>}
                                                </td>
                                                <td className="py-2.5 px-2 text-right text-xs text-slate-400 dark:text-slate-600 italic">R$ {formatCurrency(m.balance)}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">1ª Parcela</p>
                            <p className="text-lg font-black text-slate-900 dark:text-slate-100">R$ {formatCurrency(results.firstInstallment)}</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Última Parcela</p>
                            <p className="text-lg font-black text-slate-900 dark:text-slate-100">R$ {formatCurrency(results.lastInstallment)}</p>
                        </div>
                        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 dark:text-emerald-500/50 mb-1">Queda Real</p>
                            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">-{(((results.firstInstallment - results.lastInstallment) / results.firstInstallment) * 100).toFixed(1)}%</p>
                        </div>
                    </div>

                    {hasExtra && (
                        <div className="h-72 w-full pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: isDarkMode ? '#0f172a' : '#f8fafc' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700/50">
                                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{payload[0].payload.name}</p>
                                                        <p className="text-sm font-black text-white">R$ {formatCurrency(payload[0].value as number)}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="valor" radius={[10, 10, 0, 0]} barSize={50}>
                                        {chartData.map((entry, index) => <Cell key={index} fill={entry.fill} fillOpacity={0.9} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm" />
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Custo Sem Aportes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-sm" />
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Novo Custo de Juros</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};
