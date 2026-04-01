import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';

interface FooterProps {
    optimizedTotalPaid: number;
    annualInterestRate: number;
    optimizedTotalInterest: number;
}

export const Footer: React.FC<FooterProps> = ({ optimizedTotalPaid, annualInterestRate, optimizedTotalInterest }) => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 mt-20 py-10 px-4 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                {/* Financial Summary */}
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 w-full opacity-40 dark:opacity-20 grayscale hover:opacity-100 dark:hover:opacity-80 hover:grayscale-0 transition-all duration-500">
                    <div className="text-center group">
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Custo Projetado do Imóvel</p>
                        <p className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">R$ {formatCurrency(optimizedTotalPaid)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Custo Efetivo Total (CET)</p>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">{(annualInterestRate * 100).toFixed(2)}% a.a.</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Total de Juros Pagos</p>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">R$ {formatCurrency(optimizedTotalInterest)}</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/60">
                    <div>
                        <h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Ferramenta</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Calculadora</Link></li>
                            <li><Link to="/sobre" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sobre a Lucidus</Link></li>
                            <li><Link to="/contato" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fale Conosco</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Conteúdo</h4>
                        <ul className="space-y-2">
                            <li><Link to="/guia-financiamento" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guia de Financiamento</Link></li>
                            <li><Link to="/guia-amortizacao" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guia de Amortização</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link to="/privacidade" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Política de Privacidade</Link></li>
                            <li><Link to="/termos" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Termos de Uso</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 w-full flex flex-col items-center gap-2">
                    <p className="text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.3em] leading-none">Lucidus © 2026 • Ferramenta de Planejamento Financeiro</p>
                    <p className="text-[8px] text-slate-400/60 dark:text-slate-600/60 max-w-lg text-center leading-relaxed">
                        Os resultados apresentados são meramente informativos e não constituem aconselhamento financeiro. 
                        Consulte sempre um profissional qualificado antes de tomar decisões financeiras.
                    </p>
                </div>
            </div>
        </footer>
    );
};
