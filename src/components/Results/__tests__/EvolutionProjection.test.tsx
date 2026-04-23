import { render, screen, fireEvent } from '@testing-library/react';
import { EvolutionProjection } from '../EvolutionProjection';
import { describe, it, expect, vi } from 'vitest';

describe('EvolutionProjection', () => {
    const mockSetShowYearly = vi.fn();
    const mockToggleYear = vi.fn();
    const mockToggleAllYears = vi.fn();

    const defaultProps = {
        showYearly: false,
        setShowYearly: mockSetShowYearly,
        yearlyEvolution: [
            {
                year: 1,
                avgInstallment: 4500,
                totalInterest: 3500,
                totalPrincipal: 1000,
                totalExtra: 500,
                endBalance: 398500,
                months: [{ month: 1, interest: 300, principal: 100, extra: 50, balance: 399850 }]
            }
        ],
        expandedYears: new Set<number>(),
        toggleYear: mockToggleYear,
        toggleAllYears: mockToggleAllYears,
        results: {
            firstInstallment: 4500,
            lastInstallment: 2000,
            totalInterest: 500000,
            optimizedTotalInterest: 300000,
            loanAmount: 400000,
            monthlyInterestRate: 0.008,
            annualInterestRate: 10.5,
            totalPaid: 900000,
            isValid: true,
            optimizedMonths: 200,
            optimizedTotalPaid: 700000,
            interestSavings: 200000,
            monthsSaved: 160
        },
        hasExtra: true
    };

    it('should render chart view by default', () => {
        render(<EvolutionProjection {...defaultProps} />);
        expect(screen.getByText(/1ª Parcela/i)).toBeInTheDocument();
        expect(screen.getByText(/Última Parcela/i)).toBeInTheDocument();
    });

    it('should switch to table view', () => {
        render(<EvolutionProjection {...defaultProps} />);
        const tableButton = screen.getByText(/Tabela/i);
        fireEvent.click(tableButton);
        expect(mockSetShowYearly).toHaveBeenCalledWith(true);
    });

    it('should render table when showYearly is true', () => {
        render(<EvolutionProjection {...defaultProps} showYearly={true} />);
        expect(screen.getByText(/1º Ano/i)).toBeInTheDocument();
        expect(screen.getByText(/Parcela Média/i)).toBeInTheDocument();
    });

    it('should call toggleYear when clicking a year row', () => {
        render(<EvolutionProjection {...defaultProps} showYearly={true} />);
        const yearRow = screen.getByText(/1º Ano/i);
        fireEvent.click(yearRow);
        expect(mockToggleYear).toHaveBeenCalledWith(1);
    });

    it('should call toggleAllYears when clicking Expandir Tudo', () => {
        render(<EvolutionProjection {...defaultProps} showYearly={true} />);
        const expandButton = screen.getByText(/Expandir Tudo/i);
        fireEvent.click(expandButton);
        expect(mockToggleAllYears).toHaveBeenCalledWith([1], true);
    });

    it('should show months when year is expanded', () => {
        render(<EvolutionProjection {...defaultProps} showYearly={true} expandedYears={new Set([1])} />);
        expect(screen.getByText(/Mês 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Extra/i)).toBeInTheDocument();
    });

    it('should render without extra info when hasExtra is false', () => {
        render(<EvolutionProjection {...defaultProps} hasExtra={false} />);
        // The chart section would be different but the parcelas are still there
        expect(screen.getByText(/1ª Parcela/i)).toBeInTheDocument();
    });
});
