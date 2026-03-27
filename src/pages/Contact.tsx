import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send the form data to a backend
        setSubmitted(true);
    };

    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                </svg>
                Voltar à Calculadora
            </Link>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Fale Conosco</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Estamos aqui para ajudar. Envie sua mensagem abaixo.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                            <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                            <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">E-mail</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">contato@lucidus.com.br</p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">Horário</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Seg - Sex: 9h às 18h</p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                            <path fillRule="evenodd" d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">Resposta</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Em até 48 horas úteis</p>
                </div>
            </div>

            {submitted ? (
                <div className="p-8 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-600">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Mensagem Enviada!</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">Obrigado pelo seu contato. Responderemos em até 48 horas úteis.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="contact-name" className="label-text">Nome Completo</label>
                            <input
                                type="text"
                                id="contact-name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="input-field"
                                placeholder="Seu nome completo"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="label-text">E-mail</label>
                            <input
                                type="email"
                                id="contact-email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="input-field"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="contact-subject" className="label-text">Assunto</label>
                        <select
                            id="contact-subject"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            className="input-field"
                        >
                            <option value="">Selecione um assunto</option>
                            <option value="duvida">Dúvida sobre a calculadora</option>
                            <option value="sugestao">Sugestão de melhoria</option>
                            <option value="bug">Reportar um problema</option>
                            <option value="parceria">Parcerias e publicidade</option>
                            <option value="privacidade">Proteção de dados / LGPD</option>
                            <option value="outro">Outro assunto</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="contact-message" className="label-text">Mensagem</label>
                        <textarea
                            id="contact-message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            className="input-field resize-none"
                            placeholder="Descreva sua mensagem com detalhes..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-950 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-blue-500 transition-all hover:shadow-lg active:scale-[0.98]"
                    >
                        Enviar Mensagem
                    </button>
                </form>
            )}

            <div className="mt-10 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">Perguntas Frequentes</h3>
                <div className="space-y-3">
                    <details className="group">
                        <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">A calculadora é gratuita?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">Sim, a Lucidus é completamente gratuita e sempre será. Nosso objetivo é democratizar o acesso à educação financeira.</p>
                    </details>
                    <details className="group">
                        <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Meus dados financeiros estão seguros?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">Sim. Todos os cálculos são feitos localmente no seu navegador. Nenhum dado financeiro é enviado ou armazenado em nossos servidores.</p>
                    </details>
                    <details className="group">
                        <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Os resultados são precisos?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">Os cálculos são baseados nos sistemas SAC e PRICE utilizados por instituições financeiras no Brasil. Porém, os valores são informativos e podem variar em relação às condições reais oferecidas por cada banco.</p>
                    </details>
                </div>
            </div>
        </article>
    );
};
