import { describe, it, expect } from 'vitest';
import { formatCurrency, formatRate, parseCurrency, parseRate } from '../formatters';

describe('Formatters', () => {
    describe('formatCurrency', () => {
        it('should format a simple number to BRL currency string', () => {
            expect(formatCurrency(1234.56)).toBe('1.234,56');
        });

        it('should format zero', () => {
            expect(formatCurrency(0)).toBe('0,00');
        });

        it('should format large numbers with thousand separators', () => {
            expect(formatCurrency(1000000)).toBe('1.000.000,00');
        });

        it('should format small decimal values', () => {
            expect(formatCurrency(0.5)).toBe('0,50');
        });

        it('should format negative numbers', () => {
            const result = formatCurrency(-500.99);
            expect(result).toContain('500,99');
        });
    });

    describe('formatRate', () => {
        it('should format rate with comma separator', () => {
            expect(formatRate(10.5)).toBe('10,50');
        });

        it('should format zero rate', () => {
            expect(formatRate(0)).toBe('0,00');
        });

        it('should format rate with many decimals to 2 places', () => {
            expect(formatRate(9.876)).toBe('9,88');
        });
    });

    describe('parseCurrency', () => {
        it('should parse formatted currency string to number', () => {
            expect(parseCurrency('1.234,56')).toBe(123456 / 100);
        });

        it('should parse string with R$ prefix', () => {
            expect(parseCurrency('R$ 500,00')).toBe(50000 / 100);
        });

        it('should return 0 for empty string', () => {
            expect(parseCurrency('')).toBe(0);
        });

        it('should handle string with only non-digit chars', () => {
            expect(parseCurrency('R$')).toBe(0);
        });
    });

    describe('parseRate', () => {
        it('should parse rate string to number', () => {
            expect(parseRate('10,50')).toBe(1050 / 100);
        });

        it('should return 0 for empty string', () => {
            expect(parseRate('')).toBe(0);
        });

        it('should limit to 5 digits', () => {
            // "123456" -> sliced to "12345" -> 12345 / 100 = 123.45
            expect(parseRate('1234,56')).toBe(12345 / 100);
        });
    });
});
