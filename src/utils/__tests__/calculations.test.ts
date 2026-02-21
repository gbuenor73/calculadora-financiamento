import { describe, it, expect } from 'vitest';
import { calculateInstallment, calculateMonthlyRate, calculateSACRate, simulateFinancing } from '../calculations';

describe('Financial Calculations', () => {
    describe('calculateInstallment (PRICE)', () => {
        it('should correctly calculate PRICE installment', () => {
            const loan = 100000;
            const rate = 0.01; // 1%
            const months = 12;
            const result = calculateInstallment(loan, rate, months);
            // Formula: PMT = 100000 * 0.01 * (1.01^12) / (1.01^12 - 1)
            expect(result).toBeCloseTo(8884.88, 2);
        });

        it('should handle zero interest rate', () => {
            const result = calculateInstallment(100000, 0, 10);
            expect(result).toBe(10000);
        });
    });

    describe('calculateMonthlyRate (PRICE - Newton-Raphson)', () => {
        it('should find the correct rate for a given installment', () => {
            const loan = 100000;
            const installment = 8884.88;
            const months = 12;
            const rate = calculateMonthlyRate(loan, installment, months);
            expect(rate).toBeCloseTo(0.01, 3);
        });
    });

    describe('calculateSACRate', () => {
        it('should calculate rate from first SAC installment', () => {
            const loan = 100000;
            const months = 10;
            const firstInstallment = 11000;
            // Amortization = 10000. Interest = 1000. Rate = 1000/100000 = 0.01
            const rate = calculateSACRate(loan, firstInstallment, months);
            expect(rate).toBe(0.01);
        });
    });

    describe('simulateFinancing', () => {
        it('should simulate a SAC financing correctly', () => {
            const result = simulateFinancing(100000, 0.01, 0, 10, 'SAC', []);
            expect(result.monthsCount).toBe(10);
            expect(result.firstInstallment).toBe(11000);
            expect(result.lastInstallment).toBe(10100);
        });

        it('should simulate a PRICE financing correctly', () => {
            // For Price, we pass the regular installment calculated previously
            const installment = calculateInstallment(100000, 0.01, 10);
            const result = simulateFinancing(100000, 0.01, installment, 10, 'PRICE', []);
            expect(result.monthsCount).toBe(10);
            expect(result.firstInstallment).toBeCloseTo(installment, 2);
            expect(result.lastInstallment).toBeCloseTo(installment, 2);
        });

        it('should shorten the term with extra amortizations', () => {
            const installment = calculateInstallment(100000, 0.01, 24);
            // Add a huge extra amortization in month 1
            const extra = [{ id: '1', amount: 50000, frequency: 'once' as const, startMonth: 1 }];
            const result = simulateFinancing(100000, 0.01, installment, 24, 'PRICE', extra);
            expect(result.monthsCount).toBeLessThan(24);
        });
    });
});
