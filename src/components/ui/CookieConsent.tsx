import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('lucidus-cookie-consent');
        if (!consent) {
            // Small delay so it doesn't flash on page load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('lucidus-cookie-consent', 'accepted');
        setVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('lucidus-cookie-consent', 'rejected');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-slide-up">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 p-5 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
                                <path d="M10.362 1.093a.75.75 0 0 0-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925ZM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0 0 18 14.25V6.443ZM9.25 18.693v-8.25l-7.25-4v7.807a.75.75 0 0 0 .388.657l6.862 3.786Z" />
                            </svg>
                            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Cookies e Privacidade</h3>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Utilizamos cookies essenciais para o funcionamento do site e cookies de terceiros (Google AdSense) para exibir anúncios relevantes. 
                            Ao clicar em "Aceitar", você concorda com o uso de cookies conforme nossa{' '}
                            <Link to="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Política de Privacidade</Link>.
                            Você pode revogar seu consentimento a qualquer momento.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/30 active:scale-95"
                        >
                            Aceitar Cookies
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
