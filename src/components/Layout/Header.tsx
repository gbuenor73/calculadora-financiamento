import React from 'react';

interface HeaderProps {
    onAiInsight: () => void;
    loadingAi: boolean;
    isValid: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onAiInsight, loadingAi, isValid }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 py-4 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v14.25A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25V6.75A2.25 2.25 0 0 0 18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75V17.25" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none gradient-text">ImobiJuros</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Intelligent Amortization</p>
                    </div>
                </div>
                <button
                    onClick={onAiInsight}
                    disabled={loadingAi || !isValid}
                    className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95 disabled:opacity-30"
                >
                    {loadingAi ? <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" /> : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
                                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-6.39a.75.75 0 0 0-1.5 0v2.43l-.31-.31a7 7 0 0 0-11.712 3.138.75.75 0 0 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311h-2.433a.75.75 0 0 0 0-1.5H16.01a.75.75 0 0 0 .75-.75V3.75l.001-.002V5.034Z" clipRule="evenodd" />
                            </svg>
                            Análise com IA
                        </>
                    )}
                </button>
            </div>
        </header>
    );
};
