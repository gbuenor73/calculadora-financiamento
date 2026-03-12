import React from 'react';

interface AdBannerProps {
    slot?: string; // Optional: AdSense slot ID
    client?: string; // Optional: AdSense client ID (e.g. ca-pub-XXXXXX)
    className?: string;
    label?: string; // Optional: Label like "Publicidade" or "Dica Lucidus"
}

/**
 * AdBanner Component
 * A non-intrusive ad placeholder that fits the Lucidus design system.
 * Designed to be used for Google AdSense or internal affiliate banners.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ slot, client, className = "", label = "Publicidade" }) => {
    // If we have actual Google AdSense data, we would render the script/ins tag
    // For now, we'll create a premium-looking placeholder that respects the design system.
    
    return (
        <div className={`relative overflow-hidden group rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-1 flex flex-col items-center justify-center min-h-[100px] transition-all hover:bg-white/60 dark:hover:bg-slate-900/60 ${className}`}>
            {/* Label */}
            <span className="absolute top-2 left-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                {label}
            </span>
            
            {/* Ad Content Placeholder */}
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M12 2v20M2 12h20M12 2l4.5 4.5M12 22l-4.5-4.5M2 12l4.5 4.5M22 12l-4.5-4.5" />
                        </svg>
                    </div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-[200px]">
                        Espaço para anúncios e parcerias estratégicas.
                    </p>
                </div>
            </div>

            {/* If AdSense is active, we would include the <ins> tag here */}
            {/* 
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client={client}
                 data-ad-slot={slot}
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            */}

            {/* Shine Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
};
