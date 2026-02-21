import { useState, useMemo, useCallback } from 'react';
import {
    CalculationInputs,
    CalculationResults,
    ExtraAmortization,
    AmortizationFrequency,
    AmortizationSystem
} from '@/types';
import {
    calculateMonthlyRate,
    calculateInstallment,
    simulateFinancing,
    calculateSACRate
} from '@/utils/calculations';
import { analyzeFinancing } from '@/services/geminiService';

interface YearlyEvolution {
    year: number;
    totalInterest: number;
    totalPrincipal: number;
    totalExtra: number;
    endBalance: number;
    avgInstallment: number;
    months: any[];
}

export const useFinancing = () => {
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

    const toggleYear = useCallback((year: number) => {
        setExpandedYears(prev => {
            const next = new Set(prev);
            if (next.has(year)) next.delete(year);
            else next.add(year);
            return next;
        });
    }, []);

    const toggleAllYears = useCallback((years: number[], expand: boolean) => {
        if (expand) setExpandedYears(new Set(years));
        else setExpandedYears(new Set());
    }, []);

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

    const handleCurrencyChange = useCallback((name: string, value: number) => {
        setInputs(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'monthlyInstallment') next.lastEdited = 'installment';
            return next;
        });
    }, []);

    const handleRateChange = useCallback((value: number) => {
        setInputs(prev => ({ ...prev, annualInterestRate: value, lastEdited: 'rate' }));
    }, []);

    const updateAmortization = useCallback((id: string, updates: Partial<ExtraAmortization>) => {
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
    }, []);

    const addAmortization = useCallback(() => {
        setInputs(prev => {
            const loanBalance = Math.max(0, prev.propertyValue - prev.downPayment);
            const defaultAmount = Math.min(500, loanBalance);
            return {
                ...prev,
                extraAmortizations: [...prev.extraAmortizations, {
                    id: Math.random().toString(36).substr(2, 9),
                    amount: defaultAmount,
                    frequency: 'monthly',
                    startMonth: 1
                }]
            };
        });
    }, []);

    const removeAmortization = useCallback((id: string) => {
        setInputs(prev => ({
            ...prev,
            extraAmortizations: prev.extraAmortizations.filter(a => a.id !== id)
        }));
    }, []);

    const getAiInsight = async () => {
        if (!results.isValid) return;
        setLoadingAi(true);
        setAiAnalysis(null);
        try {
            const insight = await analyzeFinancing(inputs, results);
            setAiAnalysis(insight || null);
        } catch (err) {
            setAiAnalysis("Funcionalidade disponível em breve.");
        } finally {
            setLoadingAi(false);
        }
    };

    const setAmortizationSystem = useCallback((system: AmortizationSystem) => {
        setInputs(prev => ({ ...prev, amortizationSystem: system }));
    }, []);

    const setTermInMonths = useCallback((term: number) => {
        setInputs(prev => ({ ...prev, termInMonths: term }));
    }, []);

    return {
        inputs,
        results,
        simulationData,
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
    };
};
