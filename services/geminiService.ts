
import { GoogleGenAI } from "@google/genai";
import { CalculationInputs, CalculationResults } from "../types";

export async function analyzeFinancing(inputs: CalculationInputs, results: CalculationResults) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analise este financiamento imobiliário brasileiro:
    - Valor do Imóvel: R$ ${inputs.propertyValue.toLocaleString('pt-BR')}
    - Entrada: R$ ${inputs.downPayment.toLocaleString('pt-BR')}
    - Parcela Mensal: R$ ${inputs.monthlyInstallment.toLocaleString('pt-BR')}
    - Prazo: ${inputs.termInYears} anos (${inputs.termInYears * 12} meses)
    
    Resultados Calculados:
    - Valor Financiado: R$ ${results.loanAmount.toLocaleString('pt-BR')}
    - Taxa de Juros Mensal Real: ${(results.monthlyInterestRate * 100).toFixed(2)}%
    - Taxa de Juros Anual Real: ${(results.annualInterestRate * 100).toFixed(2)}%
    - Total pago em Juros: R$ ${results.totalInterest.toLocaleString('pt-BR')}
    - Custo total do financiamento: R$ ${results.totalPaid.toLocaleString('pt-BR')} (Total pago incluindo parcelas e entrada)

    Por favor:
    1. Avalie se essa taxa de juros é competitiva em comparação com a média de mercado atual no Brasil (SELIC e taxas de bancos comerciais).
    2. Dê conselhos sobre como reduzir o custo total (amortização extraordinária, etc).
    3. Analise o comprometimento de renda (idealmente a parcela não deve superar 30% da renda).
    4. Explique brevemente o impacto dos juros compostos neste cenário.
    
    Responda em tom profissional e amigável, formatado em Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível obter a análise da IA no momento. Verifique sua conexão ou tente novamente mais tarde.";
  }
}
