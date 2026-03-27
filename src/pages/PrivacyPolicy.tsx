import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                </svg>
                Voltar à Calculadora
            </Link>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Política de Privacidade</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Última atualização: 27 de março de 2026</p>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">1. Introdução</h2>
                    <p>A <strong>Lucidus</strong> ("nós", "nosso" ou "nossa") opera o site <em>Lucidus — Calculadora de Financiamento Estratégico</em>. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços.</p>
                    <p>Ao acessar ou utilizar nosso site, você concorda com as práticas descritas nesta política. Recomendamos a leitura atenta de todos os termos.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">2. Informações que Coletamos</h2>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">2.1 Dados Fornecidos pelo Usuário</h3>
                    <p>Para utilizar a calculadora de financiamento, você pode inserir dados como valor do imóvel, valor de entrada, taxa de juros e prazo. <strong>Esses dados são processados exclusivamente no seu navegador e não são armazenados em nossos servidores.</strong></p>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">2.2 Dados de Navegação</h3>
                    <p>Coletamos automaticamente informações técnicas sobre sua visita ao site, incluindo:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Endereço IP (anonimizado)</li>
                        <li>Tipo de navegador e sistema operacional</li>
                        <li>Páginas visitadas e tempo de permanência</li>
                        <li>URL de referência (de onde você veio)</li>
                        <li>Resolução de tela e idioma do navegador</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">2.3 Cookies e Tecnologias Similares</h3>
                    <p>Utilizamos cookies e tecnologias similares para:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento do site (ex: preferência de tema claro/escuro).</li>
                        <li><strong>Cookies de análise:</strong> Nos ajudam a entender como os visitantes interagem com o site (Google Analytics).</li>
                        <li><strong>Cookies de publicidade:</strong> Utilizados pelo Google AdSense para exibir anúncios relevantes com base em seus interesses.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">3. Como Usamos Suas Informações</h2>
                    <p>As informações coletadas são utilizadas para:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Fornecer e melhorar nossos serviços de calculadora de financiamento</li>
                        <li>Personalizar sua experiência no site</li>
                        <li>Analisar o uso do site para otimizações de desempenho</li>
                        <li>Exibir anúncios personalizados por meio do Google AdSense</li>
                        <li>Cumprir obrigações legais e regulatórias</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">4. Google AdSense e Publicidade</h2>
                    <p>Utilizamos o <strong>Google AdSense</strong> para exibir anúncios em nosso site. O Google pode utilizar cookies para exibir anúncios com base em visitas anteriores do usuário ao nosso site ou a outros sites na Internet.</p>
                    <p>Os usuários podem desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Configurações de Anúncios do Google</a>.</p>
                    <p>Terceiros fornecedores, incluindo o Google, usam cookies para veicular anúncios com base nas visitas anteriores do usuário. Para mais informações, visite a <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Política de Publicidade do Google</a>.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">5. Compartilhamento de Dados</h2>
                    <p>Não vendemos, alugamos ou comercializamos suas informações pessoais. Podemos compartilhar dados apenas nas seguintes situações:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Parceiros de publicidade:</strong> Google AdSense recebe dados anonimizados para personalização de anúncios.</li>
                        <li><strong>Cumprimento legal:</strong> Quando exigido por lei, ordem judicial ou autoridade governamental.</li>
                        <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos, propriedade ou segurança.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">6. Lei Geral de Proteção de Dados (LGPD)</h2>
                    <p>Em conformidade com a Lei nº 13.709/2018 (LGPD), garantimos os seguintes direitos aos titulares de dados pessoais:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Confirmação da existência de tratamento de dados</li>
                        <li>Acesso aos dados pessoais</li>
                        <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                        <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                        <li>Portabilidade dos dados</li>
                        <li>Eliminação de dados tratados com consentimento</li>
                        <li>Revogação do consentimento</li>
                    </ul>
                    <p>Para exercer qualquer um desses direitos, entre em contato conosco através da nossa <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">página de contato</Link>.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">7. Segurança dos Dados</h2>
                    <p>Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">8. Retenção de Dados</h2>
                    <p>Os dados de navegação são retidos por um período máximo de 26 meses para fins analíticos. Os dados de simulação de financiamento são processados localmente e não são retidos por nós.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">9. Links para Sites de Terceiros</h2>
                    <p>Nosso site pode conter links para outros sites que não são operados por nós. Não temos controle sobre o conteúdo e as práticas de privacidade desses sites e não assumimos responsabilidade por eles.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">10. Alterações nesta Política</h2>
                    <p>Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. Recomendamos que você revise esta política periodicamente.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">11. Contato</h2>
                    <p>Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato conosco:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>E-mail:</strong> contato@lucidus.com.br</li>
                        <li><strong>Página de contato:</strong> <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">Fale Conosco</Link></li>
                    </ul>
                </section>
            </div>
        </article>
    );
};
