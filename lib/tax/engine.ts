import {
  TaxSlab,
  Rebate87A,
  TaxYearConfig,
  IncomeDetails,
  Deductions,
  TaxResult,
  CompareResult,
  TakeHomeResult,
} from "./types";

function calculateSlabTax(taxableIncome: number, slabs: TaxSlab[]): number {
  let tax = 0;
  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  for (const slab of slabs) {
    const slabSize = slab.limit ? slab.limit - previousLimit : Infinity;
    const incomeInSlab = Math.min(Math.max(0, remainingIncome), slabSize);

    tax += incomeInSlab * slab.rate;
    remainingIncome -= incomeInSlab;
    previousLimit = slab.limit || 0;

    if (remainingIncome <= 0) break;
  }

  return tax;
}

function calculate87ARebate(
  taxableIncome: number,
  baseTax: number,
  config: Rebate87A
): { rebateAmount: number; marginalRelief: number } {
  if (taxableIncome <= config.incomeLimit) {
    return {
      rebateAmount: Math.min(baseTax, config.maxRebate),
      marginalRelief: 0,
    };
  }

  if (config.marginalRelief && taxableIncome > config.incomeLimit) {
    const excessIncome = taxableIncome - config.incomeLimit;
    if (baseTax > excessIncome) {
      const rebate = baseTax - excessIncome;
      return { rebateAmount: rebate, marginalRelief: rebate };
    }
  }

  return { rebateAmount: 0, marginalRelief: 0 };
}

function calculateSurcharge(
  taxableIncome: number,
  baseTax: number,
  surchargeSlabs: TaxSlab[],
  calcTaxFn: (income: number) => number
): { surchargeAmount: number; marginalRelief: number } {
  let rate = 0;
  let threshold = 0;

  for (const slab of surchargeSlabs) {
    if (slab.limit === null || taxableIncome <= slab.limit) {
      rate = slab.rate;
      break;
    }
    threshold = slab.limit;
  }

  if (rate === 0) return { surchargeAmount: 0, marginalRelief: 0 };

  const rawSurcharge = baseTax * rate;
  const taxPlusSurcharge = baseTax + rawSurcharge;

  const taxAtThreshold = calcTaxFn(threshold);
  let rateAtThresh = 0;
  for (const slab of surchargeSlabs) {
    if (slab.limit === null || threshold <= slab.limit) {
      rateAtThresh = slab.rate;
      break;
    }
  }

  const taxPlusSurchargeAtThreshold =
    taxAtThreshold + taxAtThreshold * rateAtThresh;
  const excessIncome = taxableIncome - threshold;

  const maxTaxAllowed = taxPlusSurchargeAtThreshold + excessIncome;

  let marginalRelief = 0;
  if (taxPlusSurcharge > maxTaxAllowed) {
    marginalRelief = taxPlusSurcharge - maxTaxAllowed;
  }

  return {
    surchargeAmount: rawSurcharge - marginalRelief,
    marginalRelief,
  };
}

export function calculateNewRegime(
  income: IncomeDetails,
  deductions: Deductions,
  config: TaxYearConfig
): TaxResult {
  const c = config.newRegime;
  const grossIncome = income.grossSalary + income.otherIncome;

  const stdDed =
    income.grossSalary > 0
      ? Math.min(income.grossSalary, c.standardDeduction)
      : 0;
  // Under New Regime, standard deduction and Employer NPS (80CCD(2)) are allowed.
  const allowedDeductions = stdDed + deductions.employerNps80CCD2;

  let netTaxableIncome = Math.max(0, grossIncome - allowedDeductions);
  netTaxableIncome = Math.round(netTaxableIncome / 10) * 10;

  const taxOnIncome = calculateSlabTax(netTaxableIncome, c.slabs);

  const { rebateAmount, marginalRelief: rebateMr } = calculate87ARebate(
    netTaxableIncome,
    taxOnIncome,
    c.rebate87A
  );

  const taxAfterRebate = Math.max(0, taxOnIncome - rebateAmount);

  const calcTaxFn = (inc: number) => calculateSlabTax(inc, c.slabs);
  const { surchargeAmount, marginalRelief: surchargeMr } = calculateSurcharge(
    netTaxableIncome,
    taxAfterRebate,
    c.surcharge,
    calcTaxFn
  );

  const taxPlusSurcharge = taxAfterRebate + surchargeAmount;
  const cess = taxPlusSurcharge * c.cess;

  const totalTax = taxPlusSurcharge + cess;

  return {
    grossIncome,
    totalDeductions: allowedDeductions,
    netTaxableIncome,
    taxOnIncome,
    rebate87A: rebateAmount,
    surcharge: surchargeAmount,
    marginalRelief: rebateMr + surchargeMr,
    cess,
    totalTax: Math.round(totalTax),
  };
}

export function calculateOldRegime(
  income: IncomeDetails,
  deductions: Deductions,
  config: TaxYearConfig
): TaxResult {
  const c = config.oldRegime;
  const grossIncome = income.grossSalary + income.otherIncome;

  const stdDed =
    income.grossSalary > 0
      ? Math.min(income.grossSalary, c.standardDeduction)
      : 0;
  const pt = income.grossSalary > 0 ? deductions.professionalTax : 0;

  const capped80C = Math.min(150000, deductions.basicSection80C);

  const totalDeductions =
    stdDed +
    pt +
    capped80C +
    deductions.medicalSection80D +
    deductions.homeLoanInterest24B +
    deductions.nps80CCD1B +
    deductions.employerNps80CCD2 +
    deductions.hraExemption +
    deductions.ltaExemption +
    deductions.otherDeductions;

  let netTaxableIncome = Math.max(0, grossIncome - totalDeductions);
  netTaxableIncome = Math.round(netTaxableIncome / 10) * 10;

  const slabs = c.slabsByAge[income.ageCategory] || c.slabsByAge.general;

  const taxOnIncome = calculateSlabTax(netTaxableIncome, slabs);

  const { rebateAmount, marginalRelief: rebateMr } = calculate87ARebate(
    netTaxableIncome,
    taxOnIncome,
    c.rebate87A
  );

  const taxAfterRebate = Math.max(0, taxOnIncome - rebateAmount);

  const calcTaxFn = (inc: number) => calculateSlabTax(inc, slabs);
  const { surchargeAmount, marginalRelief: surchargeMr } = calculateSurcharge(
    netTaxableIncome,
    taxAfterRebate,
    c.surcharge,
    calcTaxFn
  );

  const taxPlusSurcharge = taxAfterRebate + surchargeAmount;
  const cess = taxPlusSurcharge * c.cess;

  const totalTax = taxPlusSurcharge + cess;

  return {
    grossIncome,
    totalDeductions,
    netTaxableIncome,
    taxOnIncome,
    rebate87A: rebateAmount,
    surcharge: surchargeAmount,
    marginalRelief: rebateMr + surchargeMr,
    cess,
    totalTax: Math.round(totalTax),
  };
}

export function compareRegimes(
  income: IncomeDetails,
  deductions: Deductions,
  config: TaxYearConfig
): CompareResult {
  const newRegime = calculateNewRegime(income, deductions, config);
  const oldRegime = calculateOldRegime(income, deductions, config);

  let betterRegime: "new" | "old" | "equal" = "equal";
  if (newRegime.totalTax < oldRegime.totalTax) {
    betterRegime = "new";
  } else if (oldRegime.totalTax < newRegime.totalTax) {
    betterRegime = "old";
  }

  return {
    newRegime,
    oldRegime,
    betterRegime,
    taxSaved: Math.abs(newRegime.totalTax - oldRegime.totalTax),
  };
}

export function calculateTakeHome(
  income: IncomeDetails,
  deductions: Deductions,
  annualTax: number,
  epfMonthly: number
): TakeHomeResult {
  const grossMonthly = income.grossSalary / 12;
  const incomeTaxMonthly = annualTax / 12;
  const ptMonthly = deductions.professionalTax / 12;

  const netTakeHome = grossMonthly - epfMonthly - ptMonthly - incomeTaxMonthly;

  return {
    grossMonthly,
    monthlyDeductions: {
      epf: epfMonthly,
      professionalTax: ptMonthly,
      incomeTax: incomeTaxMonthly,
    },
    netTakeHome,
  };
}
