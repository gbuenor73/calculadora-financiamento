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

        it('should return 0 when installment * months <= loan', () => {
            const rate = calculateMonthlyRate(100000, 100, 10);
            expect(rate).toBe(0);
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

        it('should return 0 when first installment equals amortization (no interest)', () => {
            const rate = calculateSACRate(100000, 10000, 10);
            expect(rate).toBe(0);
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
            const installment = calculateInstallment(100000, 0.01, 10);
            const result = simulateFinancing(100000, 0.01, installment, 10, 'PRICE', []);
            expect(result.monthsCount).toBe(10);
            expect(result.firstInstallment).toBeCloseTo(installment, 2);
            expect(result.lastInstallment).toBeCloseTo(installment, 2);
        });

        it('should shorten the term with extra amortizations (once)', () => {
            const installment = calculateInstallment(100000, 0.01, 24);
            const extra = [{ id: '1', amount: 50000, frequency: 'once' as const, startMonth: 1 }];
            const result = simulateFinancing(100000, 0.01, installment, 24, 'PRICE', extra);
            expect(result.monthsCount).toBeLessThan(24);
        });

        it('should generate correct history entries', () => {
            const result = simulateFinancing(100000, 0.01, 0, 10, 'SAC', []);
            expect(result.history).toHaveLength(10);
            expect(result.history[0].month).toBe(1);
            expect(result.history[0].interest).toBe(1000);
            expect(result.history[0].principal).toBe(10000);
            expect(result.history[0].extra).toBe(0);
            // Balance after first month: 100000 - 10000 = 90000
            expect(result.history[0].balance).toBe(90000);
            // Last entry balance should be 0
            expect(result.history[9].balance).toBeCloseTo(0, 2);
        });

        it('should correctly compute totalInterest and totalPaid', () => {
            const result = simulateFinancing(100000, 0.01, 0, 10, 'SAC', []);
            // Total interest for SAC: sum of (balance * rate) for each month
            // Month 1: 100000*0.01=1000, Month 2: 90000*0.01=900, ..., Month 10: 10000*0.01=100
            // Total = 1000+900+800+...+100 = 5500
            expect(result.totalInterest).toBeCloseTo(5500, 2);
            expect(result.totalPaid).toBeCloseTo(105500, 2);
        });

        describe('Periodic frequency amortizations', () => {
            it('should apply monthly extra every month', () => {
                const extra = [{ id: '1', amount: 1000, frequency: 'monthly' as const, startMonth: 1 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                // Monthly extra should shorten the term significantly
                expect(result.monthsCount).toBeLessThan(120);
                // Every month should have extra applied
                expect(result.history[0].extra).toBe(1000);
                expect(result.history[1].extra).toBe(1000);
            });

            it('should apply bimonthly extra every 2 months', () => {
                const extra = [{ id: '1', amount: 5000, frequency: 'bimonthly' as const, startMonth: 1 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                // Month 1 (startMonth): should apply
                expect(result.history[0].extra).toBe(5000);
                // Month 2: should NOT apply (1 month after start)
                expect(result.history[1].extra).toBe(0);
                // Month 3: should apply (2 months after start)
                expect(result.history[2].extra).toBe(5000);
                // Month 4: should NOT apply
                expect(result.history[3].extra).toBe(0);
            });

            it('should apply quarterly extra every 3 months', () => {
                const extra = [{ id: '1', amount: 5000, frequency: 'quarterly' as const, startMonth: 1 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                expect(result.history[0].extra).toBe(5000); // Month 1
                expect(result.history[1].extra).toBe(0);    // Month 2
                expect(result.history[2].extra).toBe(0);    // Month 3
                expect(result.history[3].extra).toBe(5000); // Month 4
            });

            it('should apply fourmonthly extra every 4 months', () => {
                const extra = [{ id: '1', amount: 5000, frequency: 'fourmonthly' as const, startMonth: 1 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                expect(result.history[0].extra).toBe(5000); // Month 1
                expect(result.history[1].extra).toBe(0);    // Month 2
                expect(result.history[2].extra).toBe(0);    // Month 3
                expect(result.history[3].extra).toBe(0);    // Month 4
                expect(result.history[4].extra).toBe(5000); // Month 5
            });

            it('should apply semiannual extra every 6 months', () => {
                const extra = [{ id: '1', amount: 5000, frequency: 'semiannually' as const, startMonth: 1 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                expect(result.history[0].extra).toBe(5000); // Month 1
                for (let i = 1; i < 6; i++) {
                    expect(result.history[i].extra).toBe(0); // Months 2-6
                }
                expect(result.history[6].extra).toBe(5000); // Month 7
            });

            it('should apply yearly extra every 12 months', () => {
                const extra = [{ id: '1', amount: 5000, frequency: 'yearly' as const, startMonth: 1 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                expect(result.history[0].extra).toBe(5000);  // Month 1
                for (let i = 1; i < 12; i++) {
                    expect(result.history[i].extra).toBe(0); // Months 2-12
                }
                expect(result.history[12].extra).toBe(5000); // Month 13
            });

            it('should not apply extra before startMonth', () => {
                const extra = [{ id: '1', amount: 5000, frequency: 'monthly' as const, startMonth: 5 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                expect(result.history[0].extra).toBe(0); // Month 1
                expect(result.history[3].extra).toBe(0); // Month 4
                expect(result.history[4].extra).toBe(5000); // Month 5
            });

            it('should handle multiple simultaneous extra amortizations', () => {
                const extras = [
                    { id: '1', amount: 1000, frequency: 'monthly' as const, startMonth: 1 },
                    { id: '2', amount: 3000, frequency: 'quarterly' as const, startMonth: 1 },
                ];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extras);
                // Month 1: both apply = 1000 + 3000 = 4000
                expect(result.history[0].extra).toBe(4000);
                // Month 2: only monthly = 1000
                expect(result.history[1].extra).toBe(1000);
                // Month 3: only monthly = 1000
                expect(result.history[2].extra).toBe(1000);
                // Month 4: both apply again = 4000
                expect(result.history[3].extra).toBe(4000);
            });

            it('should respect startMonth for periodic frequencies', () => {
                // Quarterly starting at month 3
                const extra = [{ id: '1', amount: 5000, frequency: 'quarterly' as const, startMonth: 3 }];
                const result = simulateFinancing(100000, 0.01, 0, 120, 'SAC', extra);
                expect(result.history[0].extra).toBe(0);    // Month 1
                expect(result.history[1].extra).toBe(0);    // Month 2
                expect(result.history[2].extra).toBe(5000); // Month 3 (startMonth)
                expect(result.history[3].extra).toBe(0);    // Month 4
                expect(result.history[4].extra).toBe(0);    // Month 5
                expect(result.history[5].extra).toBe(5000); // Month 6 (3 months after start)
            });

            it('should cap extra amortization to remaining balance', () => {
                // Very large extra that exceeds balance
                const extra = [{ id: '1', amount: 999999, frequency: 'once' as const, startMonth: 1 }];
                const result = simulateFinancing(10000, 0.01, 0, 120, 'SAC', extra);
                // Should finish in 1 month since extra covers the entire balance
                expect(result.monthsCount).toBe(1);
                expect(result.history[0].balance).toBe(0);
            });
        });
    });
});
