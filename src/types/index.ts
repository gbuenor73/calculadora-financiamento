
export type AmortizationFrequency = 'monthly' | 'yearly' | 'once';
export type AmortizationSystem = 'SAC' | 'PRICE';

export interface ExtraAmortization {
  id: string;
  amount: number;
  frequency: AmortizationFrequency;
  startMonth: number;
}

export interface CalculationInputs {
  propertyValue: number;
  downPayment: number;
  monthlyInstallment: number;
  annualInterestRate: number;
  termInMonths: number;
  amortizationSystem: AmortizationSystem;
  extraAmortizations: ExtraAmortization[];
  lastEdited: 'installment' | 'rate';
}

export interface CalculationResults {
  loanAmount: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  totalPaid: number;
  totalInterest: number;
  isValid: boolean;
  optimizedMonths: number;
  optimizedTotalInterest: number;
  optimizedTotalPaid: number;
  interestSavings: number;
  monthsSaved: number;
  firstInstallment: number;
  lastInstallment: number;
}

export interface AmortizationEntry {
  month: number;
  balance: number;
  interest: number;
  principal: number;
  extra: number;
}
