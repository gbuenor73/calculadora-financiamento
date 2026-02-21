# ImobiJuros 🏠✨
## A Inteligência Estratégica para o seu Financiamento

**ImobiJuros** é um simulador de financiamento imobiliário de ultra-performance, desenhado para transformar a complexidade bancária em uma estratégia clara de quitação.

O projeto foi iniciado originalmente no **Google AI Studio** e hoje evolui através da precisão do **Antigravity**, unindo matemática financeira avançada e Inteligência Artificial para ajudar corretores e compradores a visualizarem o caminho mais rápido para a casa própria.

---

<div align="center">
  <img width="1200" alt="ImobiJuros Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

---

### 🌟 Destaques do Projeto

- **💎 Interface Premium**: Design moderno baseado em *Glassmorphism*, com foco em clareza visual e hierarquia de informações.
- **👔 Broker-Friendly**: Layout otimizado para corretores de imóveis, destacando o **tempo salvo** e a **economia de juros** para facilitar a negociação com clientes.
- **🤖 Inteligência Artificial**: Relatórios estratégicos gerados pelo **Google Gemini** que analisam a competitividade das taxas e sugerem planos de amortização.
- **📊 Visualização Dinâmica**: Alternância entre gráficos de barras interativos e tabelas detalhadas de evolução (anual/mensal).
- **🚀 Simulador de Amortização**: Gerencie múltiplos aportes extras (mensais, anuais ou únicos) e veja o impacto instantâneo no prazo do financiamento.

### 🛠️ Funcionalidades Principais

1. **Sistemas SAC e PRICE**: Alternância instantânea entre os principais sistemas de amortização do mercado brasileiro.
2. **Cálculo de CET Real**: Transparência total no Custo Efetivo Total baseado na parcela informada.
3. **Plano de Antecipação**: Área dedicada para estruturar o uso de bonificações, 13º salário ou FGTS para quitar o imóvel.
4. **Resumo de Impacto**: Cards vibrantes que mostram anos de vida "recuperados" e milhares de reais economizados.
5. **Insights Consultivos**: Análise de IA sobre o cenário atual do mercado e dicas psicológicas de economia.

### 🚀 Tecnologias Utilizadas

O projeto utiliza um stack moderno focado em performance e tipagem segura:

- **React 19**: O core da interface.
- **TypeScript**: Garantia de integridade nos cálculos financeiros.
- **Tailwind CSS**: Estilização rica com utilitários customizados para glassmorphism.
- **Vite**: Build tool ultra-rápida.
- **Recharts**: Renderização de gráficos de alta fidelidade.
- **Google Gemini API**: Inteligência generativa para análise financeira.

### 💻 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/gbuenor73/calculadora-financiamento.git
   ```

2. **Instalar as dependências**
   ```bash
   npm install
   ```

3. **Configurar a API do Gemini**
   Crie um arquivo `.env.local` na raiz do projeto e adicione sua API Key:
   ```env
   API_KEY=sua_chave_aqui
   ```

4. **Iniciar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

### 🚢 Deployment e Integração Contínua

O projeto é deployado automaticamente via **Vercel** a cada push na branch `main`.

- **Repositório Oficial**: [github.com/gbuenor73/calculadora-financiamento](https://github.com/gbuenor73/calculadora-financiamento)
- **Ambiente de Produção**: Deploy contínuo via Vercel.

### 📂 Estrutura de Pastas

```text
├── components/       # Componentes de UI (Card, Inputs, etc)
├── services/         # Integração com Gemini API
├── utils/            # Motores matemáticos (SAC, PRICE, Amortização)
├── types.ts          # Definições de interfaces do domínio
├── App.tsx           # Container principal e gestão de estado
└── index.css         # Design System e utilitários Tailwind
```

---

<p align="center">
  Desenvolvido para fins de planejamento financeiro estratégico e educação imobiliária. 💡
</p>
