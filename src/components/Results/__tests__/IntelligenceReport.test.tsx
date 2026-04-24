import { render, screen } from '@testing-library/react';
import { IntelligenceReport } from '../IntelligenceReport';
import { describe, it, expect } from 'vitest';

describe('IntelligenceReport', () => {
    it('should return null when no analysis and not loading', () => {
        const { container } = render(<IntelligenceReport analysis={null} loading={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render loading state', () => {
        render(<IntelligenceReport analysis={null} loading={true} />);
        expect(screen.getByText(/Consultando Mercados/i)).toBeInTheDocument();
        expect(screen.getByText(/Processando milhares de variáveis/i)).toBeInTheDocument();
    });

    it('should render analysis text', () => {
        const analysis = "First line\n# Header\nSecond line";
        render(<IntelligenceReport analysis={analysis} loading={false} />);
        expect(screen.getByText('First line')).toBeInTheDocument();
        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Second line')).toBeInTheDocument();
    });
});
