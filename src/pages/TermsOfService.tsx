import React from 'react';
import { Link } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                </svg>
                Voltar à Calculadora
            </Link>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Termos de Uso</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Última atualização: 27 de março de 2026</p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">1. Aceitação dos Termos</h2>
                    <p>Ao acessar e utilizar o site <strong>Lucidus — Calculadora de Financiamento Estratégico</strong>, você declara que leu, compreendeu e concorda em estar vinculado a estes Termos de Uso. Se você não concordar com algum destes termos, não utilize nosso site.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">2. Descrição do Serviço</h2>
                    <p>A Lucidus é uma ferramenta gratuita de simulação de financiamento imobiliário que permite aos usuários:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Simular financiamentos imobiliários nos sistemas SAC e PRICE</li>
                        <li>Calcular o impacto de amortizações extraordinárias</li>
                        <li>Visualizar a evolução do saldo devedor ao longo do tempo</li>
                        <li>Obter insights estratégicos fundamentados por inteligência artificial</li>
                        <li>Comparar cenários de financiamento para tomada de decisão consciente</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">3. Natureza Informativa</h2>
                    <p><strong>Os resultados apresentados pela calculadora são meramente informativos e de caráter educacional.</strong> Eles não constituem:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Aconselhamento financeiro profissional</li>
                        <li>Recomendação de investimento</li>
                        <li>Oferta ou proposta de financiamento</li>
                        <li>Garantia de aprovação de crédito</li>
                    </ul>
                    <p>Recomendamos sempre consultar um profissional financeiro qualificado antes de tomar decisões financeiras importantes. Os valores calculados podem variar em relação às condições reais oferecidas por instituições financeiras.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">4. Uso Adequado</h2>
                    <p>Ao utilizar nosso site, você concorda em:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Utilizar o serviço apenas para fins lícitos e pessoais</li>
                        <li>Não tentar acessar áreas restritas ou comprometer a segurança do site</li>
                        <li>Não usar bots, scrapers ou meios automatizados para acessar o site</li>
                        <li>Não reproduzir, duplicar ou explorar comercialmente o conteúdo sem autorização</li>
                        <li>Não interferir no funcionamento normal do site para outros usuários</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">5. Propriedade Intelectual</h2>
                    <p>Todo o conteúdo do site, incluindo mas não limitado a textos, gráficos, logotipos, ícones, imagens, código-fonte, design e funcionalidades, é de propriedade da Lucidus ou de seus licenciadores e está protegido pelas leis de direitos autorais e propriedade intelectual aplicáveis.</p>
                    <p>É proibida a reprodução, distribuição, modificação ou uso comercial de qualquer conteúdo do site sem autorização prévia e expressa.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">6. Publicidade e Anúncios</h2>
                    <p>O site pode exibir anúncios de terceiros fornecidos pelo Google AdSense e outros parceiros de publicidade. Estes anúncios podem utilizar cookies para personalização. Para mais informações, consulte nossa <Link to="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline">Política de Privacidade</Link>.</p>
                    <p>A Lucidus não se responsabiliza pelo conteúdo dos anúncios de terceiros, nem pelas práticas comerciais dos anunciantes.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">7. Limitação de Responsabilidade</h2>
                    <p>A Lucidus, seus diretores, funcionários e parceiros <strong>não serão responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos</strong> decorrentes de:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Uso ou incapacidade de usar o serviço</li>
                        <li>Decisões financeiras tomadas com base nos resultados da calculadora</li>
                        <li>Imprecisões nos cálculos ou análises apresentadas</li>
                        <li>Interrupção do serviço ou perda de dados</li>
                        <li>Conteúdo de terceiros exibido no site</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">8. Disponibilidade do Serviço</h2>
                    <p>Nos esforçamos para manter o site disponível 24 horas por dia, 7 dias por semana. No entanto, não garantimos que o serviço estará ininterrupto, seguro ou livre de erros. Podemos suspender, modificar ou descontinuar o serviço a qualquer momento, sem aviso prévio.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">9. Links para Terceiros</h2>
                    <p>O site pode conter links para sites de terceiros que não são de nossa propriedade ou controle. Não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas de sites de terceiros.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">10. Alterações nos Termos</h2>
                    <p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. O uso continuado do site após alterações constitui sua aceitação dos novos termos.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">11. Legislação Aplicável</h2>
                    <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será submetida ao foro da comarca de domicílio do usuário, conforme previsto no Código de Defesa do Consumidor (Lei nº 8.078/90).</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">12. Contato</h2>
                    <p>Para dúvidas ou esclarecimentos sobre estes Termos de Uso, entre em contato conosco:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>E-mail:</strong> contato@lucidus.com.br</li>
                        <li><strong>Página de contato:</strong> <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">Fale Conosco</Link></li>
                    </ul>
                </section>
            </div>
        </article>
    );
};
