import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ContentSection adds valuable, crawlable text content to the main page.
 * Google AdSense requires substantial original content — this section
 * provides educational financial content that adds real value for users
 * while making the page more attractive to AdSense reviewers.
 */
export const ContentSection: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 mt-8">
            {/* Section Header */}
            <div className="text-center mb-12">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full mb-3">Educação Financeira</span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Aprenda a dominar seu financiamento</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Conteúdos educativos gratuitos para ajudar você a tomar decisões financeiras mais inteligentes.</p>
            </div>

            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Card 1 */}
                <Link to="/guia-financiamento" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                            <path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h10.5a.75.75 0 0 1 0 1.5H2.544L1 2.75Zm1.75 4.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 4a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm0 4a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Guia Completo de Financiamento</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Entenda como funciona o financiamento imobiliário no Brasil, diferenças entre SAC e PRICE, e como escolher a melhor opção.</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mt-4 group-hover:gap-2 transition-all">
                        Ler guia completo →
                    </span>
                </Link>

                {/* Card 2 */}
                <Link to="/guia-amortizacao" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-green-200 dark:hover:border-green-800 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600 dark:text-green-400">
                            <path fillRule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Amortização Extra: Economize Milhares</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Descubra como amortizações antecipadas podem reduzir drasticamente o custo total do seu financiamento e o prazo de pagamento.</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 mt-4 group-hover:gap-2 transition-all">
                        Ver estratégias →
                    </span>
                </Link>

                {/* Card 3 - How It Works */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-600 dark:text-amber-400">
                            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Como Usar a Lucidus</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Insira o valor do imóvel, entrada, taxa e prazo. A calculadora mostra instantaneamente a evolução do seu financiamento e o impacto de cada amortização extra.</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mt-4">
                        Gratuito e sem cadastro
                    </span>
                </div>
            </div>

            {/* SEO-friendly informational content */}
            <div className="max-w-3xl mx-auto space-y-8 text-slate-600 dark:text-slate-400">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">O que é a Lucidus?</h2>
                    <p className="text-sm leading-relaxed">A <strong className="text-slate-700 dark:text-slate-300">Lucidus</strong> é uma calculadora de financiamento imobiliário gratuita que permite simular diferentes cenários de financiamento para a compra do seu imóvel. Com a Lucidus, você pode comparar os sistemas de amortização SAC e PRICE, adicionar amortizações extras e visualizar a evolução completa do seu financiamento mês a mês, incluindo saldo devedor, juros e parcelas.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Por que simular seu financiamento?</h2>
                    <p className="text-sm leading-relaxed">Um financiamento imobiliário é geralmente o maior compromisso financeiro da vida de uma pessoa. Com prazos que podem chegar a 35 anos e custos totais que frequentemente ultrapassam o dobro do valor original do imóvel, entender cada detalhe do seu financiamento pode significar uma economia de centenas de milhares de reais. A simulação permite que você tome decisões informadas sobre entrada, prazo, sistema de amortização e aportes extras.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Recursos da calculadora</h2>
                    <ul className="text-sm space-y-2 leading-relaxed">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-slate-700 dark:text-slate-300">Comparação SAC vs PRICE:</strong> Veja como cada sistema de amortização afeta suas parcelas e o total de juros pagos</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-slate-700 dark:text-slate-300">Amortizações extraordinárias:</strong> Simule quanto você pode economizar ao fazer pagamentos antecipados</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-slate-700 dark:text-slate-300">Evolução detalhada:</strong> Acompanhe seu saldo devedor, parcelas e juros mês a mês e ano a ano</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-slate-700 dark:text-slate-300">Lucidus Insight com IA:</strong> Receba análises estratégicas personalizadas geradas por inteligência artificial</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-slate-700 dark:text-slate-300">100% gratuito:</strong> Sem cadastro, sem limitações e sem dados armazenados</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
