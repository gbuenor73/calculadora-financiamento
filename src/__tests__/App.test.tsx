import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock Recharts to avoid issues in JSDOM
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    BarChart: () => <div>BarChart</div>,
    Bar: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    Cell: () => null,
}));

// Mock Gemini Service
vi.mock('@/services/geminiService', () => ({
    analyzeFinancing: vi.fn(),
}));

describe('App Component (Acceptance Tests)', () => {
    it('should render the application title', () => {
        render(<App />);
        expect(screen.getByText('ImobiJuros')).toBeInTheDocument();
    });

    it('should allow changing the property value', () => {
        render(<App />);
        const input = screen.getByLabelText(/Valor do Imóvel/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: '600.000,00' } });
        expect(input.value).toBe('600.000,00');
    });

    it('should toggle between SAC and PRICE', () => {
        render(<App />);
        const priceButton = screen.getByText(/PRICE \(Fixa\)/i);
        fireEvent.click(priceButton);
        expect(priceButton).toHaveClass('bg-white');
    });

    it('should show the simulated amortization section when added', () => {
        render(<App />);
        const addButton = screen.getByRole('button', { name: /Simular Amortização/i });
        fireEvent.click(addButton);

        expect(screen.getByText(/Tempo de Financiamento Salvo/i)).toBeInTheDocument();
    });
});
