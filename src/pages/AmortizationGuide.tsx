import React from 'react';
import { Link } from 'react-router-dom';

export const AmortizationGuide: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                </svg>
                Voltar à Calculadora
            </Link>

            <div className="mb-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">Guia Estratégico</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Amortização Extra: Como Economizar Milhares de Reais</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Aprenda a estratégia mais poderosa para reduzir o custo do seu financiamento imobiliário.</p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">💡 <strong>Você sabia?</strong> Uma amortização extra de apenas R$ 500/mês em um financiamento de R$ 400.000 pode economizar mais de R$ 150.000 em juros e reduzir o prazo em 15 anos ou mais.</p>
                </div>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">O que é Amortização Extra?</h2>
                    <p>Amortização extra é o pagamento antecipado de parte do saldo devedor do seu financiamento, além da parcela mensal regular. Esse pagamento vai direto para reduzir o valor que você deve, sem juros adicionais.</p>
                    <p>É uma das ferramentas financeiras mais poderosas disponíveis para quem tem financiamento imobiliário, pois reduz diretamente a base sobre a qual os juros são calculados.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Por que a Amortização Extra é tão Poderosa?</h2>
                    <p>Para entender o poder da amortização extra, é preciso entender como funcionam os juros compostos no financiamento:</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">O Efeito Bola de Neve Invertida</h3>
                    <p>No financiamento, os juros são calculados sobre o saldo devedor. Quando você faz uma amortização extra:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>O saldo devedor diminui <strong>imediatamente</strong></li>
                        <li>Os juros do mês seguinte são menores (calculados sobre um saldo menor)</li>
                        <li>Uma parte maior da sua parcela regular vai para amortização (em vez de juros)</li>
                        <li>O saldo devedor diminui ainda mais rápido</li>
                        <li>O ciclo se repete, criando um efeito bola de neve a seu favor</li>
                    </ol>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 my-4">
                        <p className="text-sm font-bold mb-2">📊 Exemplo Real:</p>
                        <p className="text-sm">Financiamento de R$ 400.000, taxa de 10% a.a., prazo de 360 meses (SAC):</p>
                        <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>Sem amortização extra:</strong> Total de juros = ~R$ 603.000</li>
                            <li>• <strong>Com R$ 500/mês extra:</strong> Total de juros = ~R$ 380.000</li>
                            <li>• <strong>Economia:</strong> ~R$ 223.000 + 15 anos a menos de dívida</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Reduzir Prazo ou Reduzir Parcela?</h2>
                    <p>Ao fazer uma amortização extra, você geralmente pode escolher entre duas opções:</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Opção 1: Reduzir o Prazo</h3>
                    <p>A parcela mensal permanece a mesma, mas o financiamento termina antes. <strong>Esta opção gera a maior economia em juros.</strong></p>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 my-3">
                        <p className="text-sm text-green-800 dark:text-green-300">✅ <strong>Recomendado</strong> para quem tem renda estável e quer maximizar a economia total.</p>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Opção 2: Reduzir a Parcela</h3>
                    <p>O prazo permanece o mesmo, mas as parcelas mensais ficam menores. Você tem mais alívio no orçamento mensal, mas paga mais juros no total.</p>
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 my-3">
                        <p className="text-sm text-amber-800 dark:text-amber-300">⚠️ Recomendado para quem precisa de mais folga no orçamento mensal ou está passando por instabilidade financeira.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Quando Fazer Amortização Extra</h2>
                    <p>O momento ideal para fazer amortizações extras é <strong>o mais cedo possível</strong>. Quanto antes você reduzir o saldo devedor, menos juros pagará ao longo de todo o financiamento.</p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">Melhores Momentos:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>13º salário:</strong> Use pelo menos uma parte para amortizar</li>
                        <li><strong>Restituição do IR:</strong> Excelente oportunidade para amortização</li>
                        <li><strong>Bônus e PLR:</strong> Destinando para o financiamento, você multiplica o valor economizado</li>
                        <li><strong>FGTS:</strong> A cada 2 anos, você pode usar o FGTS para amortizar (se o imóvel se enquadra no SFH)</li>
                        <li><strong>Renda extra:</strong> Trabalhos extras, freelances ou vendas podem alimentar amortizações</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Amortizar ou Investir?</h2>
                    <p>Esta é uma das perguntas mais comuns de quem tem financiamento. A resposta depende de uma comparação simples:</p>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 my-4">
                        <p className="text-sm font-bold mb-2">A Regra de Ouro:</p>
                        <p className="text-sm">Se a <strong>taxa do seu financiamento é maior</strong> que o rendimento líquido dos seus investimentos, <strong>amortize</strong>. Se o rendimento dos investimentos é maior, <strong>invista</strong>.</p>
                    </div>

                    <p>Na prática, para a maioria dos brasileiros com financiamento a taxas entre 8% e 12% ao ano, a amortização extra tende a ser a melhor opção, pois:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>A "rentabilidade" da amortização é garantida (você economiza juros certos)</li>
                        <li>Não há risco de mercado</li>
                        <li>Não há incidência de Imposto de Renda sobre a economia</li>
                        <li>Com a Selic em níveis moderados, poucos investimentos de renda fixa superam a taxa do financiamento após impostos</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Estratégias Inteligentes de Amortização</h2>
                    <ol className="list-decimal pl-6 space-y-3">
                        <li>
                            <strong>Estratégia Constante</strong>
                            <p className="mt-1">Defina um valor fixo mensal para amortização extra e mantenha a disciplina. Mesmo R$ 200/mês fazem diferença ao longo dos anos.</p>
                        </li>
                        <li>
                            <strong>Estratégia Progressiva</strong>
                            <p className="mt-1">Comece com um valor pequeno e aumente gradualmente conforme sua renda cresce. Comprometa-se a direcionar pelo menos metade de qualquer aumento de renda para amortização.</p>
                        </li>
                        <li>
                            <strong>Estratégia de Grandes Aportes</strong>
                            <p className="mt-1">Em vez de amortizações mensais, reserve os grandes recebimentos (13º, PLR, FGTS) para fazer amortizações significativas 2 a 4 vezes por ano.</p>
                        </li>
                        <li>
                            <strong>Estratégia Híbrida</strong>
                            <p className="mt-1">Combine amortizações mensais pequenas com aportes maiores em datas especiais. É a estratégia que gera os melhores resultados para a maioria das famílias.</p>
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Erros Comuns a Evitar</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Não manter reserva de emergência:</strong> Antes de amortizar, tenha pelo menos 6 meses de despesas guardados em um investimento líquido.</li>
                        <li><strong>Ignorar dívidas com juros mais altos:</strong> Se você tem dívidas de cartão de crédito ou cheque especial, pague-as antes de amortizar o financiamento.</li>
                        <li><strong>Esperar demais:</strong> Cada mês sem amortizar é um mês a mais de juros. Comece o mais cedo possível, mesmo com valores pequenos.</li>
                        <li><strong>Não fazer simulações:</strong> Use a <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">calculadora Lucidus</Link> para entender o impacto real de cada amortização antes de decidir.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">Simule sua Economia</h2>
                    <p>Quer descobrir exatamente quanto você pode economizar com amortizações extras? Use a calculadora Lucidus para simular seu cenário personalizado.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/" className="inline-flex items-center gap-2 bg-slate-950 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-blue-500 transition-all hover:shadow-lg active:scale-95">
                            Calcular Economia →
                        </Link>
                        <Link to="/guia-financiamento" className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                            Guia de Financiamento
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
};
