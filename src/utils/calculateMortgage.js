export const calculateMortgage = (principal, annualRate, years) => {
  const p = Number(principal);
  const r = Number(annualRate) / 100 / 12; // Monthly interest rate
  const n = Number(years) * 12; // Total number of payments

  if (p <= 0 || r <= 0 || n <= 0) return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0 };

  // Standard amortization formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  
  const totalRepayment = monthlyPayment * n;
  const totalInterest = totalRepayment - p;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest)
  };
};
