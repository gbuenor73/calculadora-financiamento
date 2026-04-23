import { render, screen, fireEvent } from '@testing-library/react';
import { AmortizationSidebar } from '../AmortizationSidebar';
import { describe, it, expect, vi } from 'vitest';
import { ExtraAmortization } from '@/types';

describe('AmortizationSidebar', () => {
    const mockOnAdd = vi.fn();
    const mockOnRemove = vi.fn();
    const mockOnUpdate = vi.fn();

    const defaultProps = {
        amortizations: [] as ExtraAmortization[],
        loanAmount: 400000,
        termInMonths: 360,
        onAdd: mockOnAdd,
        onRemove: mockOnRemove,
        onUpdate: mockOnUpdate,
    };

    it('should render empty state when no amortizations', () => {
        render(<AmortizationSidebar {...defaultProps} />);
        expect(screen.getByText(/Adicione aportes extras/i)).toBeInTheDocument();
        const addButton = screen.getByRole('button', { name: /Adicionar Aporte/i });
        fireEvent.click(addButton);
        expect(mockOnAdd).toHaveBeenCalled();
    });

    it('should render amortizations list', () => {
        const amortizations: ExtraAmortization[] = [
            { id: '1', amount: 1000, frequency: 'monthly', startMonth: 1 }
        ];
        render(<AmortizationSidebar {...defaultProps} amortizations={amortizations} />);
        expect(screen.getByDisplayValue('1.000,00')).toBeInTheDocument();
    });

    it('should call onRemove when delete button is clicked', () => {
        const amortizations: ExtraAmortization[] = [
            { id: '1', amount: 1000, frequency: 'monthly', startMonth: 1 }
        ];
        render(<AmortizationSidebar {...defaultProps} amortizations={amortizations} />);
        const removeButton = screen.getByLabelText('Remover aporte');
        fireEvent.click(removeButton);
        expect(mockOnRemove).toHaveBeenCalledWith('1');
    });

    it('should call onUpdate when amount is changed', () => {
        const amortizations: ExtraAmortization[] = [
            { id: '1', amount: 1000, frequency: 'monthly', startMonth: 1 }
        ];
        render(<AmortizationSidebar {...defaultProps} amortizations={amortizations} />);
        const input = screen.getByDisplayValue('1.000,00');
        fireEvent.change(input, { target: { value: '200000' } }); // R$ 2.000,00
        expect(mockOnUpdate).toHaveBeenCalledWith('1', { amount: 2000 });
    });

    it('should call onUpdate when frequency is changed', () => {
        const amortizations: ExtraAmortization[] = [
            { id: '1', amount: 1000, frequency: 'monthly', startMonth: 1 }
        ];
        render(<AmortizationSidebar {...defaultProps} amortizations={amortizations} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'yearly' } });
        expect(mockOnUpdate).toHaveBeenCalledWith('1', { frequency: 'yearly' });
    });

    it('should show start month select for non-monthly/non-once frequencies', () => {
        const amortizations: ExtraAmortization[] = [
            { id: '1', amount: 1000, frequency: 'yearly', startMonth: 3 }
        ];
        render(<AmortizationSidebar {...defaultProps} amortizations={amortizations} />);
        expect(screen.getByText(/Mês Inicial/i)).toBeInTheDocument();
        const startMonthSelect = screen.getAllByRole('combobox')[1];
        fireEvent.change(startMonthSelect, { target: { value: '5' } });
        expect(mockOnUpdate).toHaveBeenCalledWith('1', { startMonth: 5 });
    });

    it('should show year and month select for "once" frequency', () => {
        const amortizations: ExtraAmortization[] = [
            { id: '1', amount: 1000, frequency: 'once', startMonth: 14 } // Year 2, Month 2
        ];
        render(<AmortizationSidebar {...defaultProps} amortizations={amortizations} />);
        
        // Use getAllByText because "Ano" might be in options too
        expect(screen.getAllByText(/Ano/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Mês/i).length).toBeGreaterThan(0);
        
        const yearSelect = screen.getAllByRole('combobox')[1];
        fireEvent.change(yearSelect, { target: { value: '3' } });
        // (3-1)*12 + 2 = 26
        expect(mockOnUpdate).toHaveBeenCalledWith('1', { startMonth: 26 });

        const monthSelect = screen.getAllByRole('combobox')[2];
        fireEvent.change(monthSelect, { target: { value: '5' } });
        // currentYear = 2, so (2-1)*12 + 5 = 17
        expect(mockOnUpdate).toHaveBeenCalledWith('1', { startMonth: 17 });
    });
});
