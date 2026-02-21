import React from 'react';
import { useFinancing } from '@/hooks/useFinancing';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ParamSidebar } from '@/components/Sidebar/ParamSidebar';
import { AmortizationSidebar } from '@/components/Sidebar/AmortizationSidebar';
import { HeroResults } from '@/components/Results/HeroResults';
import { EvolutionProjection } from '@/components/Results/EvolutionProjection';
import { IntelligenceReport } from '@/components/Results/IntelligenceReport';

const App: React.FC = () => {
  const {
    inputs,
    results,
    yearlyEvolution,
    currentInstallmentDisplay,
    currentAnnualRate,
    isInvalidDownPayment,
    aiAnalysis,
    loadingAi,
    showYearly,
    expandedYears,
    setAmortizationSystem,
    setTermInMonths,
    handleCurrencyChange,
    handleRateChange,
    updateAmortization,
    addAmortization,
    removeAmortization,
    getAiInsight,
    toggleYear,
    toggleAllYears,
    setShowYearly
  } = useFinancing();

  const hasExtra = inputs.extraAmortizations.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Header
        onAiInsight={getAiInsight}
        loadingAi={loadingAi}
        isValid={results.isValid}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <ParamSidebar
            propertyValue={inputs.propertyValue}
            downPayment={inputs.downPayment}
            loanAmount={results.loanAmount}
            amortizationSystem={inputs.amortizationSystem}
            termInMonths={inputs.termInMonths}
            annualInterestRate={inputs.annualInterestRate}
            installmentDisplay={currentInstallmentDisplay}
            mRate={results.monthlyInterestRate}
            lastEdited={inputs.lastEdited}
            isInvalidDownPayment={isInvalidDownPayment}
            onCurrencyChange={handleCurrencyChange}
            onRateChange={handleRateChange}
            onSystemChange={setAmortizationSystem}
            onTermChange={setTermInMonths}
          />

          <AmortizationSidebar
            amortizations={inputs.extraAmortizations}
            loanAmount={results.loanAmount}
            termInMonths={inputs.termInMonths}
            onAdd={addAmortization}
            onRemove={removeAmortization}
            onUpdate={updateAmortization}
          />
        </aside>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <HeroResults
            hasExtra={hasExtra}
            isInvalidDownPayment={isInvalidDownPayment}
            monthsSaved={results.monthsSaved}
            interestSavings={results.interestSavings}
            onAddAmortization={addAmortization}
          />

          <EvolutionProjection
            showYearly={showYearly}
            setShowYearly={setShowYearly}
            yearlyEvolution={yearlyEvolution}
            expandedYears={expandedYears}
            toggleYear={toggleYear}
            toggleAllYears={toggleAllYears}
            results={results}
            hasExtra={hasExtra}
          />

          <IntelligenceReport
            analysis={aiAnalysis}
            loading={loadingAi}
          />
        </div>
      </main>

      <Footer
        optimizedTotalPaid={results.optimizedTotalPaid}
        annualInterestRate={results.annualInterestRate}
        optimizedTotalInterest={results.optimizedTotalInterest}
      />
    </div>
  );
};

export default App;
