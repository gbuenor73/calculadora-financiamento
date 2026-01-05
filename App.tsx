
import React, { useState, useMemo } from 'react';
import { CalculationInputs, CalculationResults } from './types';
import { calculateMonthlyRate, calculateInstallment } from './utils/calculations';
import { analyzeFinancing } from './services/geminiService';
import { Card } from './components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    propertyValue: 500000,
    downPayment: 100000,
    monthlyInstallment: 4500,
    annualInterestRate: 10.5,
    termInYears: 30,
    lastEdited: 'rate'
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Helper para formatar moeda brasileira
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Helper para formatar taxa (sem separador de milhar para evitar confusão com moeda)
  const formatRate = (value: number) => {
    return value.toFixed(2).replace('.', ',');
  };

  const results = useMemo((): CalculationResults => {
    const loan = inputs.propertyValue - inputs.downPayment;
    const months = inputs.termInYears * 12;
    
    if (loan <= 0 || months <= 0) {
      return { 
        loanAmount: loan, 
        monthlyInterestRate: 0, 
        annualInterestRate: 0, 
        totalPaid: 0, 
        totalInterest: 0, 
        isValid: false 
      };
    }

    let mRate = 0;
    let installment = inputs.monthlyInstallment;

    if (inputs.lastEdited === 'rate') {
      mRate = Math.pow(1 + (inputs.annualInterestRate / 100), 1 / 12) - 1;
      installment = calculateInstallment(loan, mRate, months);
    } else {
      mRate = calculateMonthlyRate(loan, inputs.monthlyInstallment, months);
    }

    const aRate = Math.pow(1 + mRate, 12) - 1;
    const totalPayments = (inputs.lastEdited === 'rate' ? installment : inputs.monthlyInstallment) * months;
    const totalInterest = totalPayments - loan;

    return {
      loanAmount: loan,
      monthlyInterestRate: mRate,
      annualInterestRate: aRate,
      totalPaid: totalPayments + inputs.downPayment,
      totalInterest: totalInterest,
      isValid: mRate >= 0 && (inputs.lastEdited === 'rate' ? installment : inputs.monthlyInstallment) > 0
    };
  }, [inputs]);

  const currentInstallment = inputs.lastEdited === 'rate' 
    ? calculateInstallment(inputs.propertyValue - inputs.downPayment, Math.pow(1 + (inputs.annualInterestRate / 100), 1 / 12) - 1, inputs.termInYears * 12)
    : inputs.monthlyInstallment;

  const currentAnnualRate = inputs.lastEdited === 'installment'
    ? (Math.pow(1 + calculateMonthlyRate(inputs.propertyValue - inputs.downPayment, inputs.monthlyInstallment, inputs.termInYears * 12), 12) - 1) * 100
    : inputs.annualInterestRate;

  const chartData = useMemo(() => {
    return [
      { name: 'Financiado', value: results.loanAmount, color: '#3b82f6' },
      { name: 'Juros Totais', value: results.totalInterest, color: '#ef4444' },
      { name: 'Entrada', value: inputs.downPayment, color: '#10b981' },
    ];
  }, [results, inputs]);

  // Handler para campos com lógica de "deslocamento para a esquerda"
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const digits = value.replace(/\D/g, '');
    const numValue = parseInt(digits || '0', 10) / 100;
    
    setInputs(prev => {
      const next = { ...prev, [name]: numValue };
      if (name === 'monthlyInstallment') next.lastEdited = 'installment';
      return next;
    });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Lógica de shift-left para a taxa
    const digits = value.replace(/\D/g, '');
    const numValue = parseInt(digits || '0', 10) / 100;
    
    setInputs(prev => ({
      ...prev,
      annualInterestRate: numValue,
      lastEdited: 'rate'
    }));
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1;
    setInputs(prev => ({ ...prev, termInYears: value }));
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
              <p className="text-xs text-slate-500 font-medium">Análise de Financiamento Imobiliário</p>
            </div>
          </div>
          <button 
            onClick={getAiInsight}
            disabled={loadingAi || !results.isValid}
            className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loadingAi ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            )}
            Análise com IA
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card title="Dados do Financiamento">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 block">Valor do Imóvel</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">R$</span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    name="propertyValue"
                    value={formatCurrency(inputs.propertyValue)}
                    onChange={handleCurrencyChange}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-900 font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 block">Valor da Entrada</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">R$</span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    name="downPayment"
                    value={formatCurrency(inputs.downPayment)}
                    onChange={handleCurrencyChange}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-900 font-medium" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-600 block">Parcela Mensal</label>
                    {inputs.lastEdited === 'rate' && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Calculado</span>}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">R$</span>
                    <input 
                      type="text" 
                      inputMode="numeric"
                      name="monthlyInstallment"
                      value={formatCurrency(currentInstallment)}
                      onChange={handleCurrencyChange}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all border text-slate-900 font-medium ${inputs.lastEdited === 'installment' ? 'bg-white border-blue-200' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-600 block">Taxa de Juros Anual (%)</label>
                    {inputs.lastEdited === 'installment' && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Calculado</span>}
                  </div>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    name="annualInterestRate"
                    value={formatRate(currentAnnualRate)}
                    onChange={handleRateChange}
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all border text-slate-900 font-medium ${inputs.lastEdited === 'rate' ? 'bg-white border-blue-200' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-slate-600 block">Prazo (Anos): {inputs.termInYears}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  value={inputs.termInYears}
                  onChange={handleTermChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-2 border-blue-600 shadow-blue-100 shadow-xl">
            <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Total Financiado</p>
            <h2 className="text-3xl font-bold text-slate-900">
              R$ {results.loanAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </Card>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center py-8">
              <span className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Juros Mensais Reais</span>
              <div className="text-4xl font-bold text-slate-900">
                {(results.monthlyInterestRate * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">Taxa mensal equivalente</p>
            </Card>
            <Card className="flex flex-col items-center justify-center py-8">
              <span className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Juros Anuais Reais</span>
              <div className="text-4xl font-bold text-slate-900">
                {(results.annualInterestRate * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">Equivalente anual composto</p>
            </Card>
          </div>

          <Card title="Composição do Custo Total">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fontWeight: 500, fill: '#64748b' }} />
                  <Tooltip 
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center border-t border-slate-50 pt-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Total Pago</p>
                <p className="text-sm font-bold text-slate-700">R$ {results.totalPaid.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Juros Totais</p>
                <p className="text-sm font-bold text-red-600">R$ {results.totalInterest.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Parcelas</p>
                <p className="text-sm font-bold text-slate-700">{inputs.termInYears * 12}x</p>
              </div>
            </div>
          </Card>

          {(aiAnalysis || loadingAi) && (
            <Card title="Insights da Inteligência Artificial" className="relative">
              {loadingAi ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 animate-pulse font-medium">Analisando condições do mercado...</p>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm">
                   {aiAnalysis?.split('\n').map((line, i) => (
                     <p key={i} className="mb-2">
                       {line.startsWith('#') ? (
                         <span className="text-slate-900 font-bold block text-base mt-4 mb-2">
                           {line.replace(/^#+\s/, '')}
                         </span>
                       ) : line.startsWith('-') ? (
                         <span className="block ml-4 relative before:content-['•'] before:absolute before:-left-4 before:text-blue-400">
                           {line.substring(1).trim()}
                         </span>
                       ) : line.trim() === "" ? null : line}
                     </p>
                   ))}
                </div>
              )}
            </Card>
          )}

          {!aiAnalysis && !loadingAi && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                 </svg>
              </div>
              <h4 className="text-slate-800 font-semibold mb-1">Análise de Mercado Inteligente</h4>
              <p className="text-slate-500 text-sm mb-6 max-w-md">Descubra se as taxas informadas estão competitivas e receba dicas de como economizar milhares de reais com amortização.</p>
              <button 
                onClick={getAiInsight}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Gerar Análise agora
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="max-w-6xl mx-auto px-4 mt-8 text-center text-slate-400 text-xs">
        <p>© 2024 ImobiJuros. Esta é uma ferramenta de simulação e não constitui aconselhamento financeiro oficial.</p>
      </footer>
    </div>
  );
};

export default App;
