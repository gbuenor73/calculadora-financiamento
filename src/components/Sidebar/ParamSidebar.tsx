import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { formatCurrency, formatRate, parseCurrency, parseRate } from '@/utils/formatters';
import { AmortizationSystem } from '@/types';

interface ParamSidebarProps {
    propertyValue: number;
    downPayment: number;
    loanAmount: number;
    amortizationSystem: AmortizationSystem;
    termInMonths: number;
    annualInterestRate: number;
    installmentDisplay: number;
    mRate: number;
    lastEdited: 'rate' | 'installment';
    isInvalidDownPayment: boolean;
    onCurrencyChange: (name: string, value: number) => void;
    onRateChange: (value: number) => void;
    onSystemChange: (system: AmortizationSystem) => void;
    onTermChange: (term: number) => void;
}

export const ParamSidebar: React.FC<ParamSidebarProps> = ({
    propertyValue, downPayment, loanAmount, amortizationSystem,
    termInMonths, annualInterestRate, installmentDisplay, mRate,
    lastEdited, isInvalidDownPayment,
    onCurrencyChange, onRateChange, onSystemChange, onTermChange
}) => {
    return (
        <div className="flex flex-col gap-8">
            <Card
                title="Parâmetros Base"
                subtitle="Configurações do imóvel"
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>}
            >
                <div className="space-y-5">
                    <Input
                        label="Valor do Imóvel"
                        icon="R$"
                        value={formatCurrency(propertyValue)}
                        onChange={(e) => onCurrencyChange('propertyValue', parseCurrency(e.target.value))}
                        error={isInvalidDownPayment}
                    />

                    <div className="space-y-1">
                        <Input
                            label="Entrada (Down Payment)"
                            icon="R$"
                            value={formatCurrency(downPayment)}
                            onChange={(e) => onCurrencyChange('downPayment', parseCurrency(e.target.value))}
                            error={isInvalidDownPayment}
                        />
                        {isInvalidDownPayment && <p className="text-[10px] font-bold text-red-600 mt-1 uppercase animate-pulse">A entrada não pode superar o valor do imóvel</p>}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl">
                        <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 dark:text-blue-500">Saldo a Financiar</label>
                        <p className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">R$ {formatCurrency(Math.max(0, loanAmount))}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Sistema de Amortização</label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            {['SAC', 'PRICE'].map(sys => (
                                <button
                                    key={sys}
                                    onClick={() => onSystemChange(sys as AmortizationSystem)}
                                    className={`py-2 text-[11px] font-black rounded-lg transition-all ${amortizationSystem === sys ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                >
                                    {sys === 'SAC' ? 'SAC (Crescente)' : 'PRICE (Fixa)'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            <Card
                title="Condições do Crédito"
                subtitle="Taxas e prazos contratados"
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6Z" /></svg>}
            >
                <div className="space-y-5">
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prazo</label>
                            <span className="text-sm font-black text-blue-600">{termInMonths} meses</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="480"
                            value={termInMonths}
                            onChange={(e) => onTermChange(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Juros a.a. (%)"
                            value={formatRate(annualInterestRate)}
                            onChange={(e) => onRateChange(parseRate(e.target.value))}
                            className={`text-center ${lastEdited === 'rate' ? 'border-blue-500 ring-2 ring-blue-500/10' : ''}`}
                        />
                        <Input
                            label={amortizationSystem === 'SAC' ? '1ª Parc. (SAC)' : 'Parc. Fixa'}
                            value={formatCurrency(installmentDisplay)}
                            onChange={(e) => onCurrencyChange('monthlyInstallment', parseCurrency(e.target.value))}
                            className={`text-center font-bold ${lastEdited === 'installment' ? 'border-teal-500 ring-2 ring-teal-500/10' : ''}`}
                        />
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" /></svg>
                        <span className="text-[10px] font-bold uppercase tracking-tight leading-none">C.E.T Mensal: {(mRate * 100).toFixed(2)}%</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};
