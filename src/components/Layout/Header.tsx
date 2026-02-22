import React from 'react';

interface HeaderProps {
    onAiInsight: () => void;
    loadingAi: boolean;
    isValid: boolean;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAiInsight, loadingAi, isValid, theme, toggleTheme }) => {
    return (
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 dark:border-slate-800/60 py-4 px-4 transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none gradient-text">Lucidus</h1>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Clareza no Financiamento</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
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
                    <button
                        onClick={onAiInsight}
                        disabled={loadingAi || !isValid}
                        className="flex items-center gap-2 bg-slate-950 dark:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-blue-500 transition-all hover:shadow-lg active:scale-95 disabled:opacity-30"
                    >
                        {loadingAi ? <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" /> : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
                                    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-6.39a.75.75 0 0 0-1.5 0v2.43l-.31-.31a7 7 0 0 0-11.712 3.138.75.75 0 0 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311h-2.433a.75.75 0 0 0 0 1.5H16.01a.75.75 0 0 0 .75-.75V3.75l.001-.002V5.034Z" clipRule="evenodd" />
                                </svg>
                                Gerar Insight
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};
