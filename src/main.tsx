import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FinancingGuide } from './pages/FinancingGuide';
import { AmortizationGuide } from './pages/AmortizationGuide';
import { PageLayout } from './components/Layout/PageLayout';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacidade" element={<PageLayout><PrivacyPolicy /></PageLayout>} />
        <Route path="/termos" element={<PageLayout><TermsOfService /></PageLayout>} />
        <Route path="/sobre" element={<PageLayout><About /></PageLayout>} />
        <Route path="/contato" element={<PageLayout><Contact /></PageLayout>} />
        <Route path="/guia-financiamento" element={<PageLayout><FinancingGuide /></PageLayout>} />
        <Route path="/guia-amortizacao" element={<PageLayout><AmortizationGuide /></PageLayout>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
