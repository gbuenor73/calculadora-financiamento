
import { ExtraAmortization } from "../types";

/**
 * Calculates the monthly interest rate using Newton-Raphson method
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
 * Calculates the installment based on loan, monthly rate and months (PMT)
 */
export function calculateInstallment(loan: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return loan / months;
  const powN = Math.pow(1 + monthlyRate, months);
  return (loan * monthlyRate * powN) / (powN - 1);
}

/**
 * Simulates the entire financing lifecycle with multiple extra amortizations
 */
export function simulateFinancing(
  loan: number, 
  monthlyRate: number, 
  regularInstallment: number, 
  maxMonths: number,
  extraAmortizations: ExtraAmortization[]
) {
  let balance = loan;
  let totalInterest = 0;
  let monthsCount = 0;
  let totalPaid = 0;

  while (balance > 0.01 && monthsCount < 1200) { // Safety cap at 100 years
    monthsCount++;
    const interest = balance * monthlyRate;
    
    // Regular installment logic
    let principalFromRegular = Math.min(balance, regularInstallment - interest);
    if (principalFromRegular < 0) principalFromRegular = 0;

    // Calculate sum of applicable extra amortizations for THIS specific month
    let totalExtraThisMonth = 0;
    for (const amort of extraAmortizations) {
      if (monthsCount < amort.startMonth) continue;

      let applies = false;
      if (amort.frequency === 'monthly') {
        applies = true;
      } else if (amort.frequency === 'yearly') {
        applies = (monthsCount - amort.startMonth) % 12 === 0;
      } else if (amort.frequency === 'once') {
        applies = monthsCount === amort.startMonth;
      }

      if (applies) {
        totalExtraThisMonth += amort.amount;
      }
    }

    const maxExtraPossible = Math.min(balance - principalFromRegular, totalExtraThisMonth);
    
    totalInterest += interest;
    totalPaid += (interest + principalFromRegular + maxExtraPossible);
    balance -= (principalFromRegular + maxExtraPossible);

    // Stop if we reached original term and have no extra payments left to process
    if (monthsCount >= maxMonths && balance <= 0.01) break;
    // Safety exit if extra is zero and we reached the end
    if (monthsCount >= maxMonths && extraAmortizations.length === 0) break;
  }

  return {
    monthsCount,
    totalInterest,
    totalPaid
  };
}
