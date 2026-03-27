import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                </svg>
                Voltar à Calculadora
            </Link>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Sobre a Lucidus</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Clareza no seu financiamento imobiliário</p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Nossa Missão</h2>
                    <p>A <strong>Lucidus</strong> nasceu com um propósito claro: <em>trazer transparência e clareza para uma das decisões financeiras mais importantes da vida</em> — a compra do seu imóvel.</p>
                    <p>O nome "Lucidus" vem do latim e significa "luminoso, claro, brilhante". Acreditamos que decisões financeiras devem ser tomadas com total clareza, sem surpresas ocultas ou cálculos confusos.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">O Problema que Resolvemos</h2>
                    <p>No Brasil, milhões de famílias financiam seus imóveis, muitas vezes sem compreender plenamente o impacto dos juros compostos ao longo de 20, 30 ou até 35 anos. Poucos sabem que uma simples amortização extra pode:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Reduzir o prazo do financiamento em <strong>vários anos</strong></li>
                        <li>Economizar <strong>dezenas de milhares de reais</strong> em juros</li>
                        <li>Liberar recursos para outros investimentos e sonhos</li>
                    </ul>
                    <p>A Lucidus existe para revelar esse potencial oculto e empoderar cada brasileiro a tomar decisões mais inteligentes sobre seu patrimônio.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">O que Oferecemos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">📊 Simulação Precisa</h3>
                            <p className="text-sm">Calculadora completa com sistemas SAC e PRICE, taxas reais de mercado e projeções detalhadas mês a mês.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">💰 Amortização Extra</h3>
                            <p className="text-sm">Descubra exatamente quanto você pode economizar com amortizações antecipadas em qualquer momento do financiamento.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">🤖 Insights com IA</h3>
                            <p className="text-sm">Análises estratégicas geradas por inteligência artificial para ajudá-lo a entender melhor seu financiamento.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">📈 Visualização Clara</h3>
                            <p className="text-sm">Gráficos e tabelas interativas que mostram a evolução do seu financiamento de forma visual e compreensível.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Nossos Valores</h2>
                    <ul className="list-none space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold text-lg mt-0.5">●</span>
                            <div>
                                <strong className="text-slate-800 dark:text-slate-200">Transparência Total:</strong> Todos os cálculos são mostrados abertamente, sem fórmulas ocultas.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold text-lg mt-0.5">●</span>
                            <div>
                                <strong className="text-slate-800 dark:text-slate-200">Educação Financeira:</strong> Acreditamos que conhecimento é poder, especialmente em finanças.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold text-lg mt-0.5">●</span>
                            <div>
                                <strong className="text-slate-800 dark:text-slate-200">Acessibilidade:</strong> A ferramenta é e sempre será gratuita para todos os brasileiros.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold text-lg mt-0.5">●</span>
                            <div>
                                <strong className="text-slate-800 dark:text-slate-200">Privacidade:</strong> Seus dados financeiros ficam no seu navegador. Não armazenamos informações pessoais.
                            </div>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Quem Somos</h2>
                    <p>A Lucidus é um projeto independente desenvolvido por profissionais brasileiros apaixonados por tecnologia e educação financeira. Nosso objetivo é democratizar o acesso a ferramentas financeiras de qualidade que antes estavam disponíveis apenas para quem podia pagar consultores caros.</p>
                    <p>Desenvolvemos a Lucidus com as melhores tecnologias disponíveis — React, TypeScript e inteligência artificial — para entregar uma experiência premium, rápida e confiável.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Fale Conosco</h2>
                    <p>Adoramos ouvir nossos usuários! Se você tiver sugestões, feedbacks, dúvidas ou quiser colaborar com o projeto, não hesite em entrar em contato:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>E-mail:</strong> contato@lucidus.com.br</li>
                        <li><strong>Página de contato:</strong> <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">Fale Conosco</Link></li>
                    </ul>
                </section>
            </div>
        </article>
    );
};
