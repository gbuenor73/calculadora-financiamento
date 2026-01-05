
import { ExtraAmortization, AmortizationSystem, AmortizationEntry } from "../types";

/**
 * Calculates the monthly interest rate using Newton-Raphson method (relevant for PRICE)
 */
export function calculateMonthlyRate(loan: number, installment: number, months: number): number {
  if (installment * months <= loan) return 0;

  let i = 0.01; 
  const tolerance = 1e-10;
  const maxIterations = 100;

  for (let k = 0; k < maxIterations; k++) {
    const powN = Math.pow(1 + i, months);
    if (powN === Infinity) return 0;
    
    const powNMinus1 = Math.pow(1 + i, months - 1);
    const f = loan * i * powN / (powN - 1) - installment;
    const df = loan * (powN * (powN - 1) + i * months * powNMinus1 * (powN - 1) - i * powN * months * powNMinus1) / Math.pow(powN - 1, 2);
    
    const newI = i - f / df;
    if (Math.abs(newI - i) < tolerance) return newI;
    i = newI;
  }
  return i;
}

/**
 * Calculates the installment based on loan, monthly rate and months (PMT - relevant for PRICE)
 */
export function calculateInstallment(loan: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return loan / months;
  const powN = Math.pow(1 + monthlyRate, months);
  return (loan * monthlyRate * powN) / (powN - 1);
}

/**
 * Simulates the entire financing lifecycle with SAC or PRICE and multiple extra amortizations
 */
export function simulateFinancing(
  loan: number, 
  monthlyRate: number, 
  regularInstallment: number, 
  maxMonths: number,
  system: AmortizationSystem,
  extraAmortizations: ExtraAmortization[]
) {
  let balance = loan;
  let totalInterest = 0;
  let monthsCount = 0;
  let totalPaid = 0;
  let firstInstallment = 0;
  let lastInstallment = 0;
  const history: AmortizationEntry[] = [];

  const fixedPrincipalSAC = system === 'SAC' ? loan / maxMonths : 0;

  while (balance > 0.01 && monthsCount < 1200) { 
    monthsCount++;
    const interest = balance * monthlyRate;
    
    let principalFromRegular = 0;
    let currentInstallment = 0;

    if (system === 'SAC') {
      principalFromRegular = Math.min(balance, fixedPrincipalSAC);
      currentInstallment = principalFromRegular + interest;
    } else {
      principalFromRegular = Math.min(balance, regularInstallment - interest);
      if (principalFromRegular < 0) principalFromRegular = 0;
      currentInstallment = principalFromRegular + interest;
    }

    if (monthsCount === 1) firstInstallment = currentInstallment;
    lastInstallment = currentInstallment;

    let totalExtraThisMonth = 0;
    for (const amort of extraAmortizations) {
      if (monthsCount < amort.startMonth) continue;
      let applies = false;
      if (amort.frequency === 'monthly') applies = true;
      else if (amort.frequency === 'yearly') applies = (monthsCount - amort.startMonth) % 12 === 0;
      else if (amort.frequency === 'once') applies = monthsCount === amort.startMonth;
      if (applies) totalExtraThisMonth += amort.amount;
    }

    const maxExtraPossible = Math.min(balance - principalFromRegular, totalExtraThisMonth);
    
    totalInterest += interest;
    totalPaid += (interest + principalFromRegular + maxExtraPossible);
    
    history.push({
      month: monthsCount,
      interest: interest,
      principal: principalFromRegular,
      extra: maxExtraPossible,
      balance: Math.max(0, balance - (principalFromRegular + maxExtraPossible))
    });

    balance -= (principalFromRegular + maxExtraPossible);

    if (monthsCount >= maxMonths && balance <= 0.01) break;
    if (monthsCount >= maxMonths && extraAmortizations.length === 0) break;
  }

  return {
    monthsCount,
    totalInterest,
    totalPaid,
    firstInstallment,
    lastInstallment,
    history
  };
}
