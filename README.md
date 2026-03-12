# Lucidus 🏠✨
## A Inteligência Estratégica para o seu Financiamento

**Lucidus** é um simulador de financiamento imobiliário de ultra-performance, desenhado para transformar a complexidade bancária em uma estratégia clara de quitação.

O projeto foi iniciado originalmente no **Google AI Studio** e hoje evolui através da precisão do **Antigravity**, unindo matemática financeira avançada e Inteligência Artificial para ajudar corretores e compradores a visualizarem o caminho mais rápido para a casa própria.

---

<div align="center">
  <img width="1200" alt="Lucidus Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

---

### 🌟 Destaques do Projeto

- **💎 Interface Premium**: Design moderno baseado em *Glassmorphism*, com foco em clareza visual e hierarquia de informações.
- **🤖 Inteligência Artificial**: Relatórios estratégicos gerados pelo **Google Gemini** (SDK 2.0) que analisam a competitividade das taxas e sugerem planos de quitação acelerada.
- **📊 Visualização Dinâmica**: Alternância entre gráficos interativos e tabelas detalhadas de evolução (anual/mensal) com expansão inteligente.
- **🚀 Simulador de Amortização**: Controle preciso de múltiplos aportes extras (mensais, anuais ou únicos) com impacto instantâneo no prazo e economia de juros.

### 🛠️ Funcionalidades Principais

1. **Sistemas SAC e PRICE**: Alternância dinâmica com recálculo automático de taxas e parcelas.
2. **Cálculo de CET Real**: Transparência total no Custo Efetivo Total baseado nos inputs do usuário.
3. **Plano de Antecipação**: Área dedicada para estruturar o uso de bonificações ou FGTS para quitar o imóvel.
4. **Resumo de Impacto**: Destaques vibrantes sobre anos de vida recuperados e capital economizado.

### 🚀 Stack Tecnológica e Engenharia

O projeto segue as melhores práticas de desenvolvimento moderno:

- **React 19**: Core da aplicação com uso intensivo de Hooks customizados.
- **TypeScript**: Tipagem estrita para segurança em cálculos financeiros complexos.
- **Vitest & React Testing Library**: Suíte robusta de testes unitários e de integração (TAAC).
- **Tailwind CSS**: Design system baseado em utilitários com suporte a micro-interações.
- **Google Gen AI SDK**: Integração de ponta com modelos Gemini.
- **Vite**: Ambiente de build otimizado com **Path Aliasing** (`@/*`).

### 🧪 Qualidade e Testes

O sistema conta com cobertura de testes automatizados para garantir a precisão dos cálculos:

```bash
# Executar todos os testes
npm test
```

- **Testes Unitários**: Validação dos motores matemáticos de amortização (SAC/PRICE).
- **Testes de Aceitação (TAAC)**: Simulação de jornadas do usuário para garantir que a interface responda corretamente aos inputs.

### 💻 Instalação e Execução

1. **Clonar e Instalar**
   ```bash
   git clone https://github.com/gbuenor73/calculadora-financiamento.git
   npm install
   ```

2. **Configurar API Key**
   Crie um arquivo `.env.local`:
   ```env
   API_KEY=sua_chave_do_google_ai_studio
   ```

3. **Rodar**
   ```bash
   npm run dev
   ```

### 💰 Monetização (AdSense)

O projeto já conta com slots de anúncios estratégicos e não-intrusivos.
Para ativar os anúncios do **Google AdSense**:
1. No arquivo `index.html`, descomente a tag `<script>` do AdSense e substitua `ca-pub-XXXXXXXXXXXXX` pelo seu ID de cliente.
2. No componente `src/components/ui/AdBanner.tsx`, você pode configurar as tags `<ins>` com o `data-ad-client` e `data-ad-slot` específicos para cada posição.

---

### 🚢 Deployment

Deploy automático via **Vercel** conectado à branch `main` do repositório:
[github.com/gbuenor73/calculadora-financiamento](https://github.com/gbuenor73/calculadora-financiamento)

### 📂 Estrutura Modular

```text
src/
├── __tests__/        # Testes de aceitação (TAAC)
├── components/       # Componentes divididos por contexto (Results, Sidebar, UI)
├── hooks/            # useFinancing (Centralização da lógica de estado)
├── services/         # API Service (Gemini)
├── utils/            # Engines financeiras e formatadores
└── types/            # Definições de interfaces globais
```

---

<p align="center">
  Desenvolvido com foco em precisão matemática e UX premium. 💡
</p>
