import { GoogleGenAI } from "@google/genai";
import { CalculationInputs, CalculationResults } from "@/types";

export async function analyzeFinancing(inputs: CalculationInputs, results: CalculationResults) {
  const apiKey = (process.env as any).API_KEY || "";

  if (!apiKey) {
    console.warn("Gemini API Key not found. Analysis will not be available.");
    return "Disponivel em breve.";
  }

  // Use the new Google DeepMind SDK pattern
  const ai = new GoogleGenAI({ apiKey });

  const amortDetails = inputs.extraAmortizations.map((a: any) =>
    `- R$ ${a.amount.toLocaleString('pt-BR')} (${a.frequency === 'monthly' ? 'Mensal' : a.frequency === 'yearly' ? 'Anual' : 'Único'}, iniciando no mês ${a.startMonth})`
  ).join('\n');

  const prompt = `
    Analise este plano de financiamento imobiliário brasileiro com múltiplas estratégias de amortização:
    - Sistema de Amortização: ${inputs.amortizationSystem}
    - Valor do Imóvel: R$ ${inputs.propertyValue.toLocaleString('pt-BR')}
    - Entrada: R$ ${inputs.downPayment.toLocaleString('pt-BR')}
    - Parcela Regular: R$ ${inputs.monthlyInstallment.toLocaleString('pt-BR')}
    
    Estratégias de Amortização Extra:
    ${amortDetails || 'Nenhuma informada.'}
    
    Resultados da Simulação:
    - Economia total de juros: R$ ${results.interestSavings.toLocaleString('pt-BR')}
    - Prazo reduzido de ${inputs.termInMonths} para ${results.optimizedMonths} meses
    - Taxa de Juros Anual Real (CET): ${(results.annualInterestRate * 100).toFixed(2)}%

    Por favor dê dicas estratégicas de amortização.
    Responda em tom consultivo, amigável e focado em educação financeira, formatado em Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Funcionalidade disponível em breve.";
  }
}
