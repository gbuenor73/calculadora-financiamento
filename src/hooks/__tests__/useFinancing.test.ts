import { renderHook, act } from '@testing-library/react';
import { useFinancing } from '../useFinancing';
import { describe, it, expect, vi } from 'vitest';

// Mock geminiService
vi.mock('@/services/geminiService', () => ({
    analyzeFinancing: vi.fn().mockResolvedValue('Mock analysis')
}));

describe('useFinancing hook', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useFinancing());
        expect(result.current.inputs.propertyValue).toBe(500000);
        expect(result.current.inputs.downPayment).toBe(100000);
    });

    it('should update currency inputs and switch lastEdited', () => {
        const { result } = renderHook(() => useFinancing());
        
        act(() => {
            result.current.handleCurrencyChange('propertyValue', 600000);
        });
        expect(result.current.inputs.propertyValue).toBe(600000);

        act(() => {
            result.current.handleCurrencyChange('monthlyInstallment', 5000);
        });
        expect(result.current.inputs.monthlyInstallment).toBe(5000);
        expect(result.current.inputs.lastEdited).toBe('installment');
    });

    it('should update rate and set lastEdited to rate', () => {
        const { result } = renderHook(() => useFinancing());
        
        act(() => {
            result.current.handleRateChange(12);
        });
        expect(result.current.inputs.annualInterestRate).toBe(12);
        expect(result.current.inputs.lastEdited).toBe('rate');
    });

    it('should add, update and remove extra amortizations', () => {
        const { result } = renderHook(() => useFinancing());
        
        act(() => {
            result.current.addAmortization();
        });
        expect(result.current.inputs.extraAmortizations.length).toBe(1);
        
        const id = result.current.inputs.extraAmortizations[0].id;
        act(() => {
            result.current.updateAmortization(id, { amount: 1000, frequency: 'yearly' });
        });
        expect(result.current.inputs.extraAmortizations[0].amount).toBe(1000);
        expect(result.current.inputs.extraAmortizations[0].frequency).toBe('yearly');

        act(() => {
            result.current.removeAmortization(id);
        });
        expect(result.current.inputs.extraAmortizations.length).toBe(0);
    });

    it('should toggle years and yearly view', () => {
        const { result } = renderHook(() => useFinancing());
        
        act(() => {
            result.current.setShowYearly(true);
        });
        expect(result.current.showYearly).toBe(true);

        act(() => {
            result.current.toggleYear(1);
        });
        expect(result.current.expandedYears.has(1)).toBe(true);
        
        act(() => {
            result.current.toggleYear(1);
        });
        expect(result.current.expandedYears.has(1)).toBe(false);

        act(() => {
            result.current.toggleAllYears([1, 2, 3], true);
        });
        expect(result.current.expandedYears.size).toBe(3);

        act(() => {
            result.current.toggleAllYears([], false);
        });
        expect(result.current.expandedYears.size).toBe(0);
    });

    it('should change amortization system and term', () => {
        const { result } = renderHook(() => useFinancing());
        
        act(() => {
            result.current.setAmortizationSystem('PRICE');
        });
        expect(result.current.inputs.amortizationSystem).toBe('PRICE');

        act(() => {
            result.current.setTermInMonths(120);
        });
        expect(result.current.inputs.termInMonths).toBe(120);
    });

    it('should handle AI analysis', async () => {
        const { result } = renderHook(() => useFinancing());
        
        await act(async () => {
            await result.current.getAiInsight();
        });
        
        expect(result.current.aiAnalysis).toBe('Mock analysis');
        expect(result.current.loadingAi).toBe(false);
    });
    
    it('should calculate simulation data correctly for SAC', () => {
        const { result } = renderHook(() => useFinancing());
        expect(result.current.results.isValid).toBe(true);
        expect(result.current.results.loanAmount).toBe(400000);
    });

    it('should handle invalid down payment', () => {
        const { result } = renderHook(() => useFinancing());
        act(() => {
            result.current.handleCurrencyChange('downPayment', 600000);
        });
        expect(result.current.isInvalidDownPayment).toBe(true);
    });
});
