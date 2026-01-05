
/**
 * Calculates the monthly interest rate using Newton-Raphson method
 * Formula: P = L * [i(1+i)^n] / [(1+i)^n - 1]
 * where P is installment, L is loan, i is monthly rate, n is months
 */
export function calculateMonthlyRate(loan: number, installment: number, months: number): number {
  if (installment * months <= loan) return 0;

  let i = 0.01; // Initial guess (1%)
  const tolerance = 1e-10;
  const maxIterations = 100;

  for (let k = 0; k < maxIterations; k++) {
    const powN = Math.pow(1 + i, months);
    if (powN === Infinity) return 0;
    
    const powNMinus1 = Math.pow(1 + i, months - 1);
    
    // f(i) = L * i * (1+i)^n / ((1+i)^n - 1) - P
    const f = loan * i * powN / (powN - 1) - installment;
    
    // f'(i) derivative
    const df = loan * (powN * (powN - 1) + i * months * powNMinus1 * (powN - 1) - i * powN * months * powNMinus1) / Math.pow(powN - 1, 2);
    
    const newI = i - f / df;
    
    if (Math.abs(newI - i) < tolerance) {
      return newI;
    }
    i = newI;
  }
  
  return i;
}

/**
 * Calculates the installment based on loan, monthly rate and months (PMT)
 */
export function calculateInstallment(loan: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return loan / months;
  const powN = Math.pow(1 + monthlyRate, months);
  return (loan * monthlyRate * powN) / (powN - 1);
}

export function generateAmortizationSchedule(loan: number, monthlyRate: number, installment: number, months: number) {
  const schedule = [];
  let balance = loan;
  
  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const principal = installment - interest;
    balance -= principal;
    
    schedule.push({
      month: m,
      balance: Math.max(0, balance),
      interest: interest,
      principal: principal
    });
    
    if (balance <= 0) break;
  }
  
  return schedule;
}
