
import React, { useState, useMemo } from 'react';
import { CalculationInputs, CalculationResults, ExtraAmortization, AmortizationFrequency } from './types';
import { calculateMonthlyRate, calculateInstallment, simulateFinancing } from './utils/calculations';
import { analyzeFinancing } from './services/geminiService';
import { Card } from './components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    propertyValue: 500000,
    downPayment: 100000,
    monthlyInstallment: 4500,
    annualInterestRate: 10.5,
    termInMonths: 360, // 30 anos padrão
    extraAmortizations: [],
    lastEdited: 'rate'
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

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

  const results = useMemo((): CalculationResults => {
    const loan = inputs.propertyValue - inputs.downPayment;
    const originalMonths = inputs.termInMonths;
    
    if (loan <= 0 || originalMonths <= 0) {
      return { 
        loanAmount: loan, monthlyInterestRate: 0, annualInterestRate: 0, 
        totalPaid: 0, totalInterest: 0, isValid: false,
        optimizedMonths: 0, optimizedTotalInterest: 0, optimizedTotalPaid: 0, interestSavings: 0, monthsSaved: 0
      };
    }

    let mRate = 0;
    let installment = inputs.monthlyInstallment;

    if (inputs.lastEdited === 'rate') {
      mRate = Math.pow(1 + (inputs.annualInterestRate / 100), 1 / 12) - 1;
      installment = calculateInstallment(loan, mRate, originalMonths);
    } else {
      mRate = calculateMonthlyRate(loan, inputs.monthlyInstallment, originalMonths);
    }

    const original = simulateFinancing(loan, mRate, installment, originalMonths, []);
    const optimized = simulateFinancing(loan, mRate, installment, originalMonths, inputs.extraAmortizations);

    const aRate = Math.pow(1 + mRate, 12) - 1;

    return {
      loanAmount: loan,
      monthlyInterestRate: mRate,
      annualInterestRate: aRate,
      totalPaid: original.totalPaid + inputs.downPayment,
      totalInterest: original.totalInterest,
      isValid: mRate >= 0 && installment > 0,
      optimizedMonths: optimized.monthsCount,
      optimizedTotalInterest: optimized.totalInterest,
      optimizedTotalPaid: optimized.totalPaid + inputs.downPayment,
      interestSavings: Math.max(0, original.totalInterest - optimized.totalInterest),
      monthsSaved: Math.max(0, original.monthsCount - optimized.monthsCount)
    };
  }, [inputs]);

  const currentInstallment = inputs.lastEdited === 'rate' 
    ? calculateInstallment(inputs.propertyValue - inputs.downPayment, Math.pow(1 + (inputs.annualInterestRate / 100), 1 / 12) - 1, inputs.termInMonths)
    : inputs.monthlyInstallment;

  const currentAnnualRate = inputs.lastEdited === 'installment'
    ? (Math.pow(1 + calculateMonthlyRate(inputs.propertyValue - inputs.downPayment, inputs.monthlyInstallment, inputs.termInMonths), 12) - 1) * 100
    : inputs.annualInterestRate;

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

  const addAmortization = () => {
    const newAmort: ExtraAmortization = {
      id: Math.random().toString(36).substr(2, 9),
      amount: 500,
      frequency: 'monthly',
      startMonth: 1
    };
    setInputs(prev => ({
      ...prev,
      extraAmortizations: [...prev.extraAmortizations, newAmort]
    }));
  };

  const removeAmortization = (id: string) => {
    setInputs(prev => ({
      ...prev,
      extraAmortizations: prev.extraAmortizations.filter(a => a.id !== id)
    }));
  };

  const updateAmortization = (id: string, updates: Partial<ExtraAmortization>) => {
    setInputs(prev => {
      const maxPossibleMonths = prev.termInMonths;
      return {
        ...prev,
        extraAmortizations: prev.extraAmortizations.map(a => {
          if (a.id === id) {
            let updated = { ...a, ...updates };
            
            // Trava para frequência anual (sempre 1-12)
            if (updated.frequency === 'yearly' && updated.startMonth > 12) {
              updated.startMonth = 12;
            } 
            // Trava para frequência única (Máximo é o prazo selecionado)
            else if (updated.frequency === 'once' && updated.startMonth > maxPossibleMonths) {
              updated.startMonth = maxPossibleMonths;
            }
            
            return updated;
          }
          return a;
        })
      };
    });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const digits = value.replace(/\D/g, '').slice(0, 5);
    const numValue = parseInt(digits || '0', 10) / 100;
    setInputs(prev => ({ ...prev, annualInterestRate: numValue, lastEdited: 'rate' }));
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonths = parseInt(e.target.value, 10) || 1;
    
    setInputs(prev => ({ 
      ...prev, 
      termInMonths: newMonths,
      // Sincronização: Ajusta amortizações únicas que ficaram fora do novo prazo máximo
      extraAmortizations: prev.extraAmortizations.map(a => {
        if (a.frequency === 'once' && a.startMonth > newMonths) {
          return { ...a, startMonth: newMonths };
        }
        return a;
      })
    }));
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

  const monthsList = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen pb-12">
      <header className="bg-white border-b border-slate-200 py-6 px-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v14.25A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25V6.75A2.25 2.25 0 0 0 18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75V17.25" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">ImobiJuros</h1>
              <p className="text-xs text-slate-500 font-medium">Simulador de Amortização Inteligente</p>
            </div>
          </div>
          <button 
            onClick={getAiInsight}
            disabled={loadingAi || !results.isValid}
            className="md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loadingAi ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : 'Análise com IA'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card title="Financiamento Base">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Valor do Imóvel</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">R$</span>
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    name="propertyValue" 
                    value={formatCurrency(inputs.propertyValue)} 
                    onChange={handleCurrencyChange} 
                    className={`w-full pl-9 pr-4 py-2 border rounded-lg font-medium text-slate-900 outline-none transition-colors ${isInvalidDownPayment ? 'border-red-500 bg-red-50' : 'bg-slate-50 border-slate-200'}`} 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Entrada</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">R$</span>
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    name="downPayment" 
                    value={formatCurrency(inputs.downPayment)} 
                    onChange={handleCurrencyChange} 
                    className={`w-full pl-9 pr-4 py-2 border rounded-lg font-medium text-slate-900 outline-none transition-colors ${isInvalidDownPayment ? 'border-red-500 bg-red-50' : 'bg-slate-50 border-slate-200'}`} 
                  />
                </div>
                {isInvalidDownPayment && (
                  <p className="text-[10px] font-bold text-red-600 mt-1 uppercase animate-pulse">
                    O valor do imóvel deve ser maior que o valor da entrada
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Parcela</label>
                  <input type="text" inputMode="numeric" name="monthlyInstallment" value={formatCurrency(currentInstallment)} onChange={handleCurrencyChange} className={`w-full px-3 py-2 border rounded-lg text-sm font-bold text-slate-900 ${inputs.lastEdited === 'installment' ? 'border-blue-500 bg-white' : 'border-slate-200 bg-slate-50'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Juros (%)</label>
                  <input type="text" inputMode="numeric" name="annualInterestRate" value={formatRate(currentAnnualRate)} onChange={handleRateChange} className={`w-full px-3 py-2 border rounded-lg text-sm font-bold text-slate-900 ${inputs.lastEdited === 'rate' ? 'border-blue-500 bg-white' : 'border-slate-200 bg-slate-50'}`} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block">Prazo: {inputs.termInMonths} meses</label>
                <input 
                  type="range" 
                  min="1" 
                  max="480" 
                  value={inputs.termInMonths} 
                  onChange={handleTermChange} 
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
                />
              </div>
            </div>
          </Card>

          <Card title="Plano de Amortização" className="border-emerald-100">
            <div className="space-y-4">
              {inputs.extraAmortizations.map((amort) => (
                <div key={amort.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative group">
                  <button 
                    onClick={() => removeAmortization(amort.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Valor do Aporte</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-slate-400 text-xs">R$</span>
                      <input 
                        type="text" 
                        value={formatCurrency(amort.amount)}
                        onChange={(e) => {
                          const val = parseInt(e.target.value.replace(/\D/g, '') || '0', 10) / 100;
                          updateAmortization(amort.id, { amount: val });
                        }}
                        className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className={`${amort.frequency === 'monthly' ? 'col-span-2' : 'col-span-1'} space-y-1`}>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Frequência</label>
                      <select 
                        value={amort.frequency}
                        onChange={(e) => updateAmortization(amort.id, { frequency: e.target.value as AmortizationFrequency })}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none"
                      >
                        <option value="monthly">Todo Mês</option>
                        <option value="yearly">Todo Ano</option>
                        <option value="once">Uma única vez</option>
                      </select>
                    </div>
                    {amort.frequency !== 'monthly' && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          {amort.frequency === 'yearly' ? 'Mês do Ano' : 'Mês Específico'}
                        </label>
                        {amort.frequency === 'yearly' ? (
                          <select
                            value={amort.startMonth}
                            onChange={(e) => updateAmortization(amort.id, { startMonth: parseInt(e.target.value, 10) || 1 })}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none"
                          >
                            {monthsList.map(m => (
                              <option key={m} value={m}>{m}º Mês</option>
                            ))}
                          </select>
                        ) : (
                          <input 
                            type="number"
                            min="1"
                            max={inputs.termInMonths}
                            value={amort.startMonth}
                            onChange={(e) => {
                              const val = Math.min(parseInt(e.target.value, 10) || 1, inputs.termInMonths);
                              updateAmortization(amort.id, { startMonth: val });
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none"
                          />
                        )}
                        {amort.frequency === 'once' && (
                          <span className="text-[9px] text-slate-400">Limite: {inputs.termInMonths}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button 
                onClick={addAmortization}
                className="w-full py-3 border-2 border-dashed border-emerald-200 rounded-xl text-emerald-600 font-bold text-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                Novo Aporte Extra
              </button>
            </div>
          </Card>

          <Card className="bg-white text-slate-900 border-2 border-slate-200 shadow-sm">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Saldo a Financiar</p>
            <h2 className="text-2xl font-bold">R$ {formatCurrency(Math.max(0, results.loanAmount))}</h2>
          </Card>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          {hasExtra && !isInvalidDownPayment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <Card className="bg-blue-50 text-slate-900 border-blue-200 border flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-700 text-xs font-bold uppercase">Antecipação Total</p>
                  <p className="text-2xl font-black text-slate-900">
                    {Math.floor(results.monthsSaved / 12)} anos e {results.monthsSaved % 12} meses
                  </p>
                </div>
              </Card>
              <Card className="bg-emerald-50 text-slate-900 border-emerald-200 border flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-emerald-700 text-xs font-bold uppercase">Juros não pagos</p>
                  <p className="text-2xl font-black text-slate-900">R$ {formatCurrency(results.interestSavings)}</p>
                </div>
              </Card>
            </div>
          )}

          <Card title={hasExtra ? "Impacto da Estratégia no Custo" : "Projeção de Juros Totais"}>
            {isInvalidDownPayment ? (
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Corrija os valores para ver a projeção</p>
              </div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      formatter={(val: number) => `R$ ${formatCurrency(val)}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="valor" radius={[8, 8, 0, 0]} barSize={hasExtra ? 60 : 120}>
                      {chartData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="mt-4 flex justify-between items-end border-t border-slate-50 pt-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  {hasExtra ? "Custo Original (Sem Amortização)" : "Total Pago ao Final"}
                </p>
                <p className={`font-bold text-slate-900 ${hasExtra ? 'text-lg text-slate-400 line-through' : 'text-2xl text-slate-900'}`}>
                  R$ {formatCurrency(results.totalPaid)}
                </p>
              </div>
              {hasExtra && !isInvalidDownPayment && (
                <div className="text-right">
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">Novo Custo Total</p>
                  <p className="text-2xl font-black text-emerald-700">R$ {formatCurrency(results.optimizedTotalPaid)}</p>
                </div>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="flex flex-col items-center justify-center py-6">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">C.E.T Mensal</span>
                <div className="text-3xl font-black text-slate-800">{(results.monthlyInterestRate * 100).toFixed(2)}%</div>
             </Card>
             <Card className="flex flex-col items-center justify-center py-6">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">C.E.T Anual</span>
                <div className="text-3xl font-black text-slate-800">{(results.annualInterestRate * 100).toFixed(2)}%</div>
             </Card>
          </div>

          {(aiAnalysis || loadingAi) && !isInvalidDownPayment && (
            <Card title="Análise Estratégica da IA" className="bg-slate-50 border-slate-200">
               {loadingAi ? (
                <div className="flex flex-col items-center py-10 gap-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-500 font-medium animate-pulse">Cruzando dados com o mercado...</p>
                </div>
               ) : (
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed">
                  {aiAnalysis?.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">
                      {line.startsWith('#') ? <span className="font-bold text-slate-900 block mt-4">{line.replace(/^#+\s/, '')}</span> : line}
                    </p>
                  ))}
                </div>
               )}
            </Card>
          )}
        </div>
      </main>
      
      <footer className="max-w-6xl mx-auto px-4 mt-8 pb-10 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
        <p>Desenvolvido para fins educacionais de planejamento financeiro.</p>
      </footer>
    </div>
  );
};

export default App;
