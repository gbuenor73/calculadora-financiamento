
import { GoogleGenAI } from "@google/genai";
import { CalculationInputs, CalculationResults } from "../types";

export async function analyzeFinancing(inputs: CalculationInputs, results: CalculationResults) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const amortDetails = inputs.extraAmortizations.map(a => 
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

    Por favor:
    1. Avalie a eficácia do conjunto de amortizações: qual delas parece ter o maior impacto considerando o sistema ${inputs.amortizationSystem}?
    2. Dê dicas sobre como otimizar ainda mais (ex: usar FGTS se não foi citado).
    3. Explique resumidamente o benefício psicológico e financeiro de reduzir o prazo vs reduzir a parcela.
    4. Comente se a taxa informada está competitiva para o cenário atual do Brasil.
    
    Responda em tom consultivo, amigável e focado em educação financeira, formatado em Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao gerar os insights. Tente novamente.";
  }
}
