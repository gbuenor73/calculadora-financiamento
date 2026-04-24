import { render, screen, fireEvent } from '@testing-library/react';
import { ParamSidebar } from '../ParamSidebar';
import { describe, it, expect, vi } from 'vitest';

describe('ParamSidebar', () => {
    const mockOnCurrencyChange = vi.fn();
    const mockOnRateChange = vi.fn();
    const mockOnSystemChange = vi.fn();
    const mockOnTermChange = vi.fn();

    const defaultProps = {
        propertyValue: 500000,
        downPayment: 100000,
        loanAmount: 400000,
        amortizationSystem: 'SAC' as const,
        termInMonths: 360,
        annualInterestRate: 10.5,
        installmentDisplay: 4500,
        mRate: 0.0087,
        lastEdited: 'rate' as const,
        isInvalidDownPayment: false,
        onCurrencyChange: mockOnCurrencyChange,
        onRateChange: mockOnRateChange,
        onSystemChange: mockOnSystemChange,
        onTermChange: mockOnTermChange,
    };

    it('should render all inputs with correct values', () => {
        render(<ParamSidebar {...defaultProps} />);
        expect(screen.getByLabelText(/Valor do Imóvel/i)).toHaveValue('500.000,00');
        expect(screen.getByLabelText(/Entrada/i)).toHaveValue('100.000,00');
        expect(screen.getByText(/400.000,00/)).toBeInTheDocument();
        expect(screen.getByText(/360 meses/i)).toBeInTheDocument();
    });

    it('should call onCurrencyChange when property value changes', () => {
        render(<ParamSidebar {...defaultProps} />);
        const input = screen.getByLabelText(/Valor do Imóvel/i);
        fireEvent.change(input, { target: { value: '60000000' } }); // R$ 600.000,00
        expect(mockOnCurrencyChange).toHaveBeenCalledWith('propertyValue', 600000);
    });

    it('should call onSystemChange when switching system', () => {
        render(<ParamSidebar {...defaultProps} />);
        const priceButton = screen.getByText(/PRICE/i);
        fireEvent.click(priceButton);
        expect(mockOnSystemChange).toHaveBeenCalledWith('PRICE');
    });

    it('should call onTermChange when slider changes', () => {
        render(<ParamSidebar {...defaultProps} />);
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '240' } });
        expect(mockOnTermChange).toHaveBeenCalledWith(240);
    });

    it('should call onRateChange when rate changes', () => {
        render(<ParamSidebar {...defaultProps} />);
        const input = screen.getByLabelText(/Juros a.a./i);
        fireEvent.change(input, { target: { value: '12,50' } });
        expect(mockOnRateChange).toHaveBeenCalledWith(12.5);
    });

    it('should show error message when down payment is invalid', () => {
        render(<ParamSidebar {...defaultProps} isInvalidDownPayment={true} />);
        expect(screen.getByText(/A entrada não pode superar o valor do imóvel/i)).toBeInTheDocument();
    });

    it('should show correct installment label for PRICE', () => {
        render(<ParamSidebar {...defaultProps} amortizationSystem="PRICE" />);
        expect(screen.getByLabelText(/Parc. Fixa/i)).toBeInTheDocument();
    });
});
