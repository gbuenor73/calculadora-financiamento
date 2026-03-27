import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { CookieConsent } from '@/components/ui/CookieConsent';

interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900/40 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-500">
            {/* Simple Header for content pages */}
            <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 dark:border-slate-800/60 py-4 px-4 transition-colors">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none gradient-text">Lucidus</h1>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Clareza no seu Financiamento</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        <nav className="hidden md:flex items-center gap-4">
                            <Link to="/guia-financiamento" className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guia</Link>
                            <Link to="/sobre" className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sobre</Link>
                            <Link to="/contato" className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contato</Link>
                        </nav>
                        <button
                            onClick={toggleTheme}
                            className="group relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90 overflow-hidden"
                            title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
                        >
                            <div className="relative z-10">
                                {theme === 'light' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:rotate-45">
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M4.93 19.07l1.41-1.41" /><path d="M17.66 6.34l1.41-1.41" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:-rotate-12">
                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
                                        <path d="M19 3v4" className="text-blue-400" /><path d="M17 5h4" className="text-blue-400" />
                                    </svg>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            {/* Simplified Footer for content pages */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 mt-20 py-8 px-4 transition-colors">
                <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <Link to="/sobre" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sobre</Link>
                        <Link to="/contato" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contato</Link>
                        <Link to="/privacidade" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacidade</Link>
                        <Link to="/termos" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Termos de Uso</Link>
                    </div>
                    <p className="text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.3em] leading-none">Lucidus © 2026 • Ferramenta de Planejamento Financeiro</p>
                </div>
            </footer>

            <CookieConsent />
        </div>
    );
};
