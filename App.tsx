
import React, { useState, useMemo } from 'react';
import { CalculationInputs, CalculationResults, ExtraAmortization, AmortizationFrequency, AmortizationSystem, AmortizationEntry } from './types';
import { calculateMonthlyRate, calculateInstallment, simulateFinancing, calculateSACRate } from './utils/calculations';
import { analyzeFinancing } from './services/geminiService';
import { Card } from './components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface YearlyEvolution {
  year: number;
  totalInterest: number;
  totalPrincipal: number;
  totalExtra: number;
  endBalance: number;
  avgInstallment: number;
  months: AmortizationEntry[];
}

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    propertyValue: 500000,
    downPayment: 100000,
    monthlyInstallment: 4500,
    annualInterestRate: 10.5,
    termInMonths: 360,
    amortizationSystem: 'SAC',
    extraAmortizations: [],
    lastEdited: 'rate'
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  const toggleYear = (year: number) => {
    const next = new Set(expandedYears);
    if (next.has(year)) next.delete(year);
    else next.add(year);
    setExpandedYears(next);
  };

  const toggleAllYears = (years: number[], expand: boolean) => {
    if (expand) setExpandedYears(new Set(years));
    else setExpandedYears(new Set());
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatRate = (value: number) => {
    return value.toFixed(2).replace('.', ',');
  };

  const isInvalidDownPayment = inputs.downPayment >= inputs.propertyValue && inputs.propertyValue > 0;

  const simulationData = useMemo(() => {
    const loan = inputs.propertyValue - inputs.downPayment;
    const originalMonths = inputs.termInMonths;

    if (loan <= 0 || originalMonths <= 0) return null;

    let mRate = 0;
    let installment = inputs.monthlyInstallment;

    if (inputs.lastEdited === 'rate') {
      mRate = Math.pow(1 + (inputs.annualInterestRate / 100), 1 / 12) - 1;
      if (inputs.amortizationSystem === 'PRICE') {
        installment = calculateInstallment(loan, mRate, originalMonths);
      } else {
        installment = (loan / originalMonths) + (loan * mRate);
      }
    } else {
      if (inputs.amortizationSystem === 'PRICE') {
        mRate = calculateMonthlyRate(loan, inputs.monthlyInstallment, originalMonths);
      } else {
        mRate = calculateSACRate(loan, inputs.monthlyInstallment, originalMonths);
      }
    }

    const original = simulateFinancing(loan, mRate, installment, originalMonths, inputs.amortizationSystem, []);
    const optimized = simulateFinancing(loan, mRate, installment, originalMonths, inputs.amortizationSystem, inputs.extraAmortizations);

    return { original, optimized, mRate };
  }, [inputs]);

  const results = useMemo((): CalculationResults => {
    if (!simulationData) {
      return {
        loanAmount: 0, monthlyInterestRate: 0, annualInterestRate: 0,
        totalPaid: 0, totalInterest: 0, isValid: false,
        optimizedMonths: 0, optimizedTotalInterest: 0, optimizedTotalPaid: 0, interestSavings: 0, monthsSaved: 0,
        firstInstallment: 0, lastInstallment: 0
      };
    }

    const { original, optimized, mRate } = simulationData;
    const aRate = Math.pow(1 + mRate, 12) - 1;

    return {
      loanAmount: inputs.propertyValue - inputs.downPayment,
      monthlyInterestRate: mRate,
      annualInterestRate: aRate,
      totalPaid: original.totalPaid + inputs.downPayment,
      totalInterest: original.totalInterest,
      isValid: mRate >= 0 && (inputs.amortizationSystem === 'SAC' || (inputs.monthlyInstallment * inputs.termInMonths > (inputs.propertyValue - inputs.downPayment))),
      optimizedMonths: optimized.monthsCount,
      optimizedTotalInterest: optimized.totalInterest,
      optimizedTotalPaid: optimized.totalPaid + inputs.downPayment,
      interestSavings: Math.max(0, original.totalInterest - optimized.totalInterest),
      monthsSaved: Math.max(0, original.monthsCount - optimized.monthsCount),
      firstInstallment: original.firstInstallment,
      lastInstallment: original.lastInstallment
    };
  }, [inputs, simulationData]);

  const yearlyEvolution = useMemo((): YearlyEvolution[] => {
    if (!simulationData) return [];
    const history = simulationData.optimized.history;
    const evolution: YearlyEvolution[] = [];

    for (let i = 0; i < history.length; i += 12) {
      const chunk = history.slice(i, i + 12);
      const yearTotalInterest = chunk.reduce((sum, m) => sum + m.interest, 0);
      const yearTotalPrincipal = chunk.reduce((sum, m) => sum + m.principal, 0);
      const yearTotalExtra = chunk.reduce((sum, m) => sum + m.extra, 0);
      const yearAvgInstallment = chunk.reduce((sum, m) => sum + (m.interest + m.principal), 0) / chunk.length;

      evolution.push({
        year: Math.floor(i / 12) + 1,
        totalInterest: yearTotalInterest,
        totalPrincipal: yearTotalPrincipal,
        totalExtra: yearTotalExtra,
        endBalance: chunk[chunk.length - 1].balance,
        avgInstallment: yearAvgInstallment,
        months: chunk
      });
    }
    return evolution;
  }, [simulationData]);

  const currentInstallmentDisplay = useMemo(() => {
    if (inputs.lastEdited === 'installment') return inputs.monthlyInstallment;

    const loan = inputs.propertyValue - inputs.downPayment;
    const mRate = Math.pow(1 + (inputs.annualInterestRate / 100), 1 / 12) - 1;

    if (inputs.amortizationSystem === 'PRICE') {
      return calculateInstallment(loan, mRate, inputs.termInMonths);
    }
    return (loan / inputs.termInMonths) + (loan * mRate);
  }, [inputs]);

  const currentAnnualRate = useMemo(() => {
    if (inputs.lastEdited === 'rate') return inputs.annualInterestRate;

    const loan = inputs.propertyValue - inputs.downPayment;
    let mRate = 0;
    if (inputs.amortizationSystem === 'PRICE') {
      mRate = calculateMonthlyRate(loan, inputs.monthlyInstallment, inputs.termInMonths);
    } else {
      mRate = calculateSACRate(loan, inputs.monthlyInstallment, inputs.termInMonths);
    }
    return (Math.pow(1 + mRate, 12) - 1) * 100;
  }, [inputs]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let digits = value.replace(/\D/g, '');
    let numValue = parseInt(digits || '0', 10) / 100;
    setInputs(prev => {
      const next = { ...prev, [name]: numValue };
      if (name === 'monthlyInstallment') next.lastEdited = 'installment';
      return next;
    });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 5);
    setInputs(prev => ({ ...prev, annualInterestRate: parseInt(digits || '0', 10) / 100, lastEdited: 'rate' }));
  };

  const updateAmortization = (id: string, updates: Partial<ExtraAmortization>) => {
    setInputs(prev => {
      const loanBalance = Math.max(0, prev.propertyValue - prev.downPayment);
      return {
        ...prev,
        extraAmortizations: prev.extraAmortizations.map(a => {
          if (a.id === id) {
            let updated = { ...a, ...updates };
            if (updated.amount > loanBalance) updated.amount = loanBalance;
            if (updated.frequency === 'yearly' && updated.startMonth > 12) updated.startMonth = 12;
            else if (updated.frequency === 'once' && updated.startMonth > prev.termInMonths) updated.startMonth = prev.termInMonths;
            return updated;
          }
          return a;
        })
      };
    });
  };

  const addAmortization = () => {
    setInputs(prev => {
      const loanBalance = Math.max(0, prev.propertyValue - prev.downPayment);
      const defaultAmount = Math.min(500, loanBalance);
      return {
        ...prev,
        extraAmortizations: [...prev.extraAmortizations, { id: Math.random().toString(36).substr(2, 9), amount: defaultAmount, frequency: 'monthly', startMonth: 1 }]
      };
    });
  };

  const getAiInsight = async () => {
    if (!results.isValid) return;
    setLoadingAi(true);
    setAiAnalysis(null);
    try {
      const insight = await analyzeFinancing(inputs, results);
      setAiAnalysis(insight || null);
    } catch (err) {
      setAiAnalysis("Erro ao processar análise.");
    } finally {
      setLoadingAi(false);
    }
  };

  const hasExtra = inputs.extraAmortizations.length > 0;
  const chartData = hasExtra
    ? [
      { name: 'Custo Original', valor: results.totalInterest, fill: '#cbd5e1' },
      { name: 'Com Amortização', valor: results.optimizedTotalInterest, fill: '#ef4444' },
    ]
    : [
      { name: 'Juros Totais', valor: results.totalInterest, fill: '#64748b' }
    ];

  const yearsToExpand = yearlyEvolution.map(y => y.year);
  const allExpanded = expandedYears.size === yearlyEvolution.length && yearlyEvolution.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v14.25A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25V6.75A2.25 2.25 0 0 0 18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75V17.25" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none gradient-text">ImobiJuros</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Intelligent Amortization</p>
            </div>
          </div>
          <button
            onClick={getAiInsight}
            disabled={loadingAi || !results.isValid}
            className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95 disabled:opacity-30"
          >
            {loadingAi ? <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" /> : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
                  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-6.39a.75.75 0 0 0-1.5 0v2.43l-.31-.31a7 7 0 0 0-11.712 3.138.75.75 0 0 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311h-2.433a.75.75 0 0 0 0 1.5H16.01a.75.75 0 0 0 .75-.75V3.75l.001-.002V5.034Z" clipRule="evenodd" />
                </svg>
                Análise com IA
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <Card
            title="Parâmetros Base"
            subtitle="Configurações do imóvel"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>}
          >
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="label-text">Valor do Imóvel</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm group-focus-within:text-blue-500 transition-colors">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="propertyValue"
                    value={formatCurrency(inputs.propertyValue)}
                    onChange={handleCurrencyChange}
                    className={`input-field pl-10 ${isInvalidDownPayment ? 'border-red-500 bg-red-50' : ''}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="label-text">Entrada (Down Payment)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm group-focus-within:text-blue-500 transition-colors">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="downPayment"
                    value={formatCurrency(inputs.downPayment)}
                    onChange={handleCurrencyChange}
                    className={`input-field pl-10 ${isInvalidDownPayment ? 'border-red-500 bg-red-50' : ''}`}
                  />
                </div>
                {isInvalidDownPayment && <p className="text-[10px] font-bold text-red-600 mt-1 uppercase animate-pulse">A entrada não pode superar o valor do imóvel</p>}
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-400">Saldo a Financiar</label>
                <p className="text-sm font-black text-slate-900 tracking-tight">R$ {formatCurrency(Math.max(0, results.loanAmount))}</p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="label-text">Sistema de Amortização</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  {['SAC', 'PRICE'].map(sys => (
                    <button
                      key={sys}
                      onClick={() => setInputs(prev => ({ ...prev, amortizationSystem: sys as AmortizationSystem }))}
                      className={`py-2 text-[11px] font-black rounded-lg transition-all ${inputs.amortizationSystem === sys ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
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
                  <label className="label-text">Prazo</label>
                  <span className="text-sm font-black text-blue-600">{inputs.termInMonths} meses</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="480"
                  value={inputs.termInMonths}
                  onChange={(e) => setInputs(p => ({ ...p, termInMonths: parseInt(e.target.value, 10) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="label-text">Juros a.a. (%)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="annualInterestRate"
                    value={formatRate(currentAnnualRate)}
                    onChange={handleRateChange}
                    className={`input-field text-center ${inputs.lastEdited === 'rate' ? 'border-blue-500 ring-2 ring-blue-500/10' : ''}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="label-text">{inputs.amortizationSystem === 'SAC' ? '1ª Parcela (SAC)' : 'Parcela Fixa (PRICE)'}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="monthlyInstallment"
                    value={formatCurrency(currentInstallmentDisplay)}
                    onChange={handleCurrencyChange}
                    className={`input-field text-center font-bold ${inputs.lastEdited === 'installment' ? 'border-teal-500 ring-2 ring-teal-500/10' : ''}`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" /></svg>
                <span className="text-[10px] font-bold uppercase tracking-tight leading-none">C.E.T Mensal: {(results.monthlyInterestRate * 100).toFixed(2)}%</span>
              </div>
            </div>
          </Card>

          <Card
            title="Aportes Extras"
            subtitle="Plano de aceleração"
            className="border-emerald-100"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-600"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" /></svg>}
            headerAction={
              <button onClick={addAmortization} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
              </button>
            }
          >
            <div className="space-y-4">
              {inputs.extraAmortizations.length === 0 ? (
                <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-xs text-slate-400 font-medium px-4">Adicione aportes extras para ver o quanto você pode economizar de juros e tempo.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inputs.extraAmortizations.map((amort) => (
                    <div key={amort.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3 relative group transition-all hover:bg-white hover:shadow-sm">
                      <button onClick={() => setInputs(p => ({ ...p, extraAmortizations: p.extraAmortizations.filter(a => a.id !== amort.id) }))} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clipRule="evenodd" /></svg>
                      </button>
                      <div className="space-y-1">
                        <label className="label-text">Valor do Aporte</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">R$</span>
                          <input
                            type="text"
                            value={formatCurrency(amort.amount)}
                            onChange={(e) => updateAmortization(amort.id, { amount: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) / 100 })}
                            className={`w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all ${amort.amount >= results.loanAmount && results.loanAmount > 0 ? 'border-amber-400' : ''}`}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className={`${amort.frequency === 'monthly' ? 'col-span-2' : 'col-span-1'} space-y-1`}>
                          <label className="label-text">Frequência</label>
                          <select
                            value={amort.frequency}
                            onChange={(e) => updateAmortization(amort.id, { frequency: e.target.value as AmortizationFrequency })}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                          >
                            <option value="monthly">Mensal</option>
                            <option value="yearly">Anual</option>
                            <option value="once">Único</option>
                          </select>
                        </div>
                        {amort.frequency !== 'monthly' && (
                          <div className="space-y-1">
                            <label className="label-text">{amort.frequency === 'yearly' ? 'Mês' : 'Mês nº'}</label>
                            <input
                              type="number"
                              min="1"
                              max={amort.frequency === 'yearly' ? 12 : inputs.termInMonths}
                              value={amort.startMonth}
                              onChange={(e) => updateAmortization(amort.id, { startMonth: parseInt(e.target.value, 10) || 1 })}
                              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </aside>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className={`grid grid-cols-1 ${hasExtra ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 animate-in fade-in slide-in-from-top-4 duration-700`}>
            {hasExtra && !isInvalidDownPayment ? (
              <>
                <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-200 flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest">Tempo de Financiamento Salvo</p>
                    <p className="text-2xl font-black">{Math.floor(results.monthsSaved / 12)}a <span className="text-base font-bold opacity-80">{results.monthsSaved % 12}m</span></p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white shadow-xl shadow-emerald-200 flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-emerald-50 text-[10px] font-black uppercase tracking-widest">Economia Direta em Juros</p>
                    <p className="text-2xl font-black">R$ {formatCurrency(results.interestSavings)}</p>
                  </div>
                </div>
              </>
            ) : !isInvalidDownPayment && (
              <div className="p-8 bg-white border border-slate-100 rounded-3xl text-slate-600 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Pronto para economizar?</p>
                    <p className="text-slate-400 text-xs mt-0.5">Adicione amortizações ao lado para ver o tempo e juros salvos.</p>
                  </div>
                </div>
                <button onClick={addAmortization} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                  Simular Amortização
                </button>
              </div>
            )}
          </div>

          <Card
            title="Projeção de Evolução"
            subtitle="Amortização do saldo devedor"
            headerAction={
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setShowYearly(false)} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${!showYearly ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Gráfico</button>
                <button onClick={() => setShowYearly(true)} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${showYearly ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Tabela</button>
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
                    <thead className="sticky top-0 z-10">
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
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
                          <tr
                            onClick={() => toggleYear(y.year)}
                            className={`group cursor-pointer transition-all ${expandedYears.has(y.year) ? 'bg-blue-50/40' : 'hover:bg-slate-50'}`}
                          >
                            <td className="py-4 px-2 font-black text-slate-800 flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${expandedYears.has(y.year) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                                <svg className={`w-3 h-3 transition-transform ${expandedYears.has(y.year) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                              </div>
                              {y.year}º Ano
                            </td>
                            <td className="py-4 px-2 text-slate-600 font-medium whitespace-nowrap">R$ {formatCurrency(y.avgInstallment)}</td>
                            <td className="py-4 px-2 text-red-500/80 font-bold whitespace-nowrap">R$ {formatCurrency(y.totalInterest)}</td>
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold whitespace-nowrap">R$ {formatCurrency(y.totalPrincipal + y.totalExtra)}</span>
                                {y.totalExtra > 0 && <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded-full">+{formatCurrency(y.totalExtra)}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-2 text-right text-slate-900 font-black whitespace-nowrap">R$ {formatCurrency(y.endBalance)}</td>
                          </tr>
                          {expandedYears.has(y.year) && y.months.map((m) => (
                            <tr key={`m-${m.month}`} className="bg-white border-b border-slate-50/60 transition-colors hover:bg-slate-50 animate-in fade-in duration-300">
                              <td className="py-2.5 px-2 pl-10 text-[10px] font-bold text-slate-400 uppercase flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                Mês {m.month}
                              </td>
                              <td className="py-2.5 px-2 text-xs text-slate-500">R$ {formatCurrency(m.interest + m.principal)}</td>
                              <td className="py-2.5 px-2 text-xs text-red-400">R$ {formatCurrency(m.interest)}</td>
                              <td className="py-2.5 px-2 text-xs text-emerald-500 font-medium">
                                R$ {formatCurrency(m.principal + m.extra)}
                                {m.extra > 0 && <span className="ml-1 text-[8px] font-black uppercase text-emerald-700 bg-emerald-50 px-1 rounded-sm">Extra</span>}
                              </td>
                              <td className="py-2.5 px-2 text-right text-xs text-slate-400 italic">R$ {formatCurrency(m.balance)}</td>
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="label-text text-slate-400 mb-1">1ª Parcela</p>
                    <p className="text-lg font-black text-slate-900">R$ {formatCurrency(results.firstInstallment)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="label-text text-slate-400 mb-1">Última Parcela</p>
                    <p className="text-lg font-black text-slate-900">R$ {formatCurrency(results.lastInstallment)}</p>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <p className="label-text text-emerald-600/60 mb-1">Queda Real</p>
                    <p className="text-lg font-black text-emerald-600">-{(((results.firstInstallment - results.lastInstallment) / results.firstInstallment) * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {hasExtra && (
                  <div className="h-72 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                        <YAxis hide />
                        <Tooltip
                          cursor={{ fill: '#f8fafc' }}
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
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded-sm" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custo Sem Aportes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-sm" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Novo Custo de Juros</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          {(aiAnalysis || loadingAi) && (
            <Card
              title="Intelligence Report"
              subtitle="Análise estratégica do seu cenário"
              className="bg-slate-900 border-slate-800 text-white"
              icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-400"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-6.39a.75.75 0 0 0-1.5 0v2.43l-.31-.31a7 7 0 0 0-11.712 3.138.75.75 0 0 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311h-2.433a.75.75 0 0 0 0 1.5H16.01a.75.75 0 0 0 .75-.75V3.75l.001-.002V5.034Z" clipRule="evenodd" /></svg>}
            >
              {loadingAi ? (
                <div className="flex flex-col items-center py-12 gap-5">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full" />
                    <div className="absolute top-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-black text-white animate-pulse">Consultando Mercados</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processando milhares de variáveis...</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed font-medium">
                  {aiAnalysis?.split('\n').map((line, i) => (
                    <p key={i} className="mb-4">
                      {line.startsWith('#') ? (
                        <span className="font-black text-white block mt-6 mb-2 text-xs uppercase tracking-widest bg-white/5 py-1 px-3 rounded-lg w-fit border border-white/10">
                          {line.replace(/^#+\s/, '')}
                        </span>
                      ) : line}
                    </p>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200/60 mt-20 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 w-full opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="text-center group">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Custo Projetado do Imóvel</p>
              <p className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 transition-colors">R$ {formatCurrency(results.optimizedTotalPaid)}</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Custo Efetivo Total (CET)</p>
              <p className="text-[10px] font-black text-slate-500">{(results.annualInterestRate * 100).toFixed(2)}% a.a.</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total de Juros Pagos</p>
              <p className="text-[10px] font-black text-slate-500">R$ {formatCurrency(results.optimizedTotalInterest)}</p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 w-full text-center">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-none">ImobiJuros © 2026 • Ferramenta de Planejamento Financeiro</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
