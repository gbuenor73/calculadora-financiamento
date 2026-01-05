
export interface CalculationInputs {
  propertyValue: number;
  downPayment: number;
  monthlyInstallment: number;
  annualInterestRate: number;
  termInYears: number;
  lastEdited: 'installment' | 'rate';
}

export interface CalculationResults {
  loanAmount: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  totalPaid: number;
  totalInterest: number;
  isValid: boolean;
}

export interface AmortizationEntry {
  month: number;
  balance: number;
  interest: number;
  principal: number;
}
