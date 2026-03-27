import React from 'react';
import { Link } from 'react-router-dom';

export const FinancingGuide: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                </svg>
                Voltar à Calculadora
            </Link>

            <div className="mb-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Guia Completo</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Guia Completo de Financiamento Imobiliário no Brasil</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Tudo o que você precisa saber antes de financiar seu imóvel — explicado de forma clara e prática.</p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">📖 <strong>Neste guia você vai aprender:</strong> O que é financiamento imobiliário, como funcionam os sistemas SAC e PRICE, como calcular sua capacidade de compra, dicas para conseguir melhores taxas e como planejar amortizações extras para economizar milhares de reais.</p>
                </div>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">O que é Financiamento Imobiliário?</h2>
                    <p>Financiamento imobiliário é uma modalidade de crédito oferecida por bancos e instituições financeiras para a compra de imóveis. Funciona como um empréstimo de longo prazo, onde o banco paga o valor do imóvel ao vendedor e você reembolsa o banco em parcelas mensais, acrescidas de juros.</p>
                    <p>No Brasil, os financiamentos imobiliários são regulados pelo Sistema Financeiro de Habitação (SFH) e pelo Sistema de Financiamento Imobiliário (SFI), ambos supervisionados pelo Banco Central.</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Características Principais</h3>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Prazo:</strong> Pode chegar a até 35 anos (420 meses)</li>
                        <li><strong>Entrada mínima:</strong> Geralmente 20% do valor do imóvel (SFH) ou 10% (com condições especiais)</li>
                        <li><strong>Garantia:</strong> O próprio imóvel serve como garantia (alienação fiduciária)</li>
                        <li><strong>Taxas de juros:</strong> Variam entre 7% e 12% ao ano, dependendo do banco e do perfil do comprador</li>
                        <li><strong>Limite SFH:</strong> Imóveis de até R$ 1,5 milhão podem usar recursos do FGTS</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">SAC vs PRICE: Entendendo os Sistemas de Amortização</h2>
                    <p>O sistema de amortização define como as parcelas do seu financiamento são calculadas ao longo do tempo. No Brasil, os dois sistemas mais utilizados são o SAC e o PRICE.</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Sistema SAC (Sistema de Amortização Constante)</h3>
                    <p>No SAC, a amortização (parte que reduz o saldo devedor) é constante em todas as parcelas. Como os juros são calculados sobre o saldo devedor, que diminui a cada mês, as parcelas vão ficando menores ao longo do tempo.</p>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 my-4">
                        <p className="text-sm font-medium mb-2">Exemplo com SAC:</p>
                        <ul className="text-sm space-y-1">
                            <li>Financiamento de R$ 300.000 em 360 meses</li>
                            <li>Amortização fixa: R$ 833,33/mês</li>
                            <li>Primeira parcela: ~R$ 3.333 (mais alta)</li>
                            <li>Última parcela: ~R$ 840 (mais baixa)</li>
                        </ul>
                    </div>
                    <p><strong>Vantagem:</strong> Você paga menos juros no total. <strong>Desvantagem:</strong> As primeiras parcelas são mais altas.</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Sistema PRICE (Tabela Price)</h3>
                    <p>No PRICE, as parcelas são fixas durante todo o financiamento. No início, a maior parte da parcela são juros; com o tempo, a proporção de amortização aumenta.</p>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 my-4">
                        <p className="text-sm font-medium mb-2">Exemplo com PRICE:</p>
                        <ul className="text-sm space-y-1">
                            <li>Financiamento de R$ 300.000 em 360 meses</li>
                            <li>Parcela fixa: ~R$ 2.700/mês</li>
                            <li>Todas as parcelas iguais</li>
                            <li>Total de juros maior que no SAC</li>
                        </ul>
                    </div>
                    <p><strong>Vantagem:</strong> Parcelas mais baixas no início e previsíveis. <strong>Desvantagem:</strong> Você paga mais juros no total.</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Qual escolher?</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-2 px-3 font-bold text-slate-700 dark:text-slate-300">Critério</th>
                                    <th className="text-left py-2 px-3 font-bold text-slate-700 dark:text-slate-300">SAC</th>
                                    <th className="text-left py-2 px-3 font-bold text-slate-700 dark:text-slate-300">PRICE</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600 dark:text-slate-400">
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="py-2 px-3">Parcela inicial</td>
                                    <td className="py-2 px-3">Mais alta</td>
                                    <td className="py-2 px-3">Mais baixa</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="py-2 px-3">Total de juros</td>
                                    <td className="py-2 px-3 text-green-600 font-medium">Menor ✓</td>
                                    <td className="py-2 px-3">Maior</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="py-2 px-3">Previsibilidade</td>
                                    <td className="py-2 px-3">Parcelas variam</td>
                                    <td className="py-2 px-3 text-green-600 font-medium">Parcelas fixas ✓</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-3">Renda necessária</td>
                                    <td className="py-2 px-3">Maior</td>
                                    <td className="py-2 px-3 text-green-600 font-medium">Menor ✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Como Calcular sua Capacidade de Compra</h2>
                    <p>Antes de buscar um financiamento, é fundamental entender quanto você pode pagar. A regra geral é que a parcela do financiamento não deve ultrapassar <strong>30% da sua renda bruta familiar</strong>.</p>

                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 my-4">
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">⚠️ <strong>Atenção:</strong> Lembre-se de considerar outros custos como ITBI (Imposto de Transmissão), escritura, registro do imóvel, seguro habitacional e taxas administrativas. Estes custos podem representar de 3% a 5% do valor do imóvel.</p>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Passo a passo:</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li><strong>Calcule 30% da renda familiar bruta</strong> — este é o valor máximo da parcela</li>
                        <li><strong>Determine sua entrada disponível</strong> — quanto mais entrada, menores os juros</li>
                        <li><strong>Use a calculadora Lucidus</strong> para simular diferentes cenários de prazo e taxa</li>
                        <li><strong>Compare as condições</strong> de pelo menos 3 bancos diferentes</li>
                        <li><strong>Considere o CET</strong> (Custo Efetivo Total), que inclui seguros e taxas</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Dicas para Conseguir Melhores Taxas</h2>
                    <ol className="list-decimal pl-6 space-y-3">
                        <li>
                            <strong>Mantenha um bom score de crédito</strong>
                            <p className="mt-1">Pague suas contas em dia e mantenha seu cadastro atualizado nos birôs de crédito. Um score alto pode reduzir significativamente sua taxa de juros.</p>
                        </li>
                        <li>
                            <strong>Negocie com múltiplos bancos</strong>
                            <p className="mt-1">Solicite simulações em pelo menos 3 bancos. Use as propostas como argumento de negociação para conseguir condições melhores.</p>
                        </li>
                        <li>
                            <strong>Ofereça uma entrada maior</strong>
                            <p className="mt-1">Quanto maior a entrada, menor o risco para o banco, o que resulta em taxas menores. Tente dar pelo menos 30% de entrada.</p>
                        </li>
                        <li>
                            <strong>Considere a portabilidade de crédito</strong>
                            <p className="mt-1">Se já tem um financiamento, verifique se outros bancos oferecem condições melhores. A portabilidade é um direito seu e bancos competem por clientes.</p>
                        </li>
                        <li>
                            <strong>Relacionamento com o banco</strong>
                            <p className="mt-1">Ter conta corrente, investimentos ou receber salário pelo banco pode garantir condições especiais.</p>
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Documentação Necessária</h2>
                    <p>Para solicitar um financiamento imobiliário, você geralmente precisa dos seguintes documentos:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>RG e CPF</li>
                        <li>Comprovante de estado civil</li>
                        <li>Comprovante de renda (3 últimos holerites ou declaração do IR)</li>
                        <li>Comprovante de residência atualizado</li>
                        <li>Certidão negativa de débitos</li>
                        <li>Extrato do FGTS (se for utilizar)</li>
                        <li>Declaração do Imposto de Renda (últimos 2 anos)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Use a Lucidus para Simular</h2>
                    <p>Agora que você já entende os conceitos fundamentais do financiamento imobiliário, use a <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Calculadora Lucidus</Link> para simular seu cenário. Você pode:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Comparar SAC e PRICE lado a lado</li>
                        <li>Visualizar o impacto de diferentes taxas de juros</li>
                        <li>Calcular a economia com amortizações extras</li>
                        <li>Gerar análises estratégicas com IA</li>
                    </ul>
                    <div className="mt-6">
                        <Link to="/" className="inline-flex items-center gap-2 bg-slate-950 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-blue-500 transition-all hover:shadow-lg active:scale-95">
                            Simular Agora →
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
};
