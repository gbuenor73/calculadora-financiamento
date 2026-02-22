import React from 'react';
import { Card } from '@/components/ui/Card';

interface IntelligenceReportProps {
    analysis: string | null;
    loading: boolean;
}

export const IntelligenceReport: React.FC<IntelligenceReportProps> = ({ analysis, loading }) => {
    if (!analysis && !loading) return null;

    return (
        <Card
            title="Intelligence Report"
            subtitle="Análise estratégica do seu cenário"
            className="bg-slate-900 dark:bg-slate-950 border-slate-800 dark:border-blue-900/30 text-white transition-colors"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-400"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-6.39a.75.75 0 0 0-1.5 0v2.43l-.31-.31a7 7 0 0 0-11.712 3.138.75.75 0 0 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311h-2.433a.75.75 0 0 0 0 1.5H16.01a.75.75 0 0 0 .75-.75V3.75l.001-.002V5.034Z" clipRule="evenodd" /></svg>}
        >
            {loading ? (
                <div className="flex flex-col items-center py-12 gap-5">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full" />
                        <div className="absolute top-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-sm font-black text-white animate-pulse">Consultando Mercados</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processando milhares de variáveis...</p>
                    </div>
                </div>
            ) : (
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed font-medium">
                    {analysis?.split('\n').map((line, i) => (
                        <p key={i} className="mb-4">
                            {line.startsWith('#') ? (
                                <span className="font-black text-white block mt-6 mb-2 text-xs uppercase tracking-widest bg-white/5 py-1 px-3 rounded-lg w-fit border border-white/10">
                                    {line.replace(/^#+\s/, '')}
                                </span>
                            ) : line}
                        </p>
                    ))}
                </div>
            )}
        </Card>
    );
};
