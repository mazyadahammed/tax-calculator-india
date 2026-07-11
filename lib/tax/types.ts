export interface TaxSlab {
  limit: number | null; // null indicates up to infinity
  rate: number;
}

export interface Rebate87A {
  incomeLimit: number;
  maxRebate: number;
  marginalRelief: boolean;
}

export interface RegimeConfigBase {
  standardDeduction: number;
  rebate87A: Rebate87A;
  surcharge: TaxSlab[];
  cess: number;
}

export interface NewRegimeConfig extends RegimeConfigBase {
  slabs: TaxSlab[];
}

export interface OldRegimeConfig extends RegimeConfigBase {
  slabsByAge: {
    general: TaxSlab[];
    senior: TaxSlab[];
    superSenior: TaxSlab[];
  };
}

export interface TaxYearConfig {
  fy: string;
  ay: string;
  newRegime: NewRegimeConfig;
  oldRegime: OldRegimeConfig;
}

export interface IncomeDetails {
  grossSalary: number;
  otherIncome: number;
  ageCategory: "general" | "senior" | "superSenior";
}

export interface Deductions {
  basicSection80C: number;
  medicalSection80D: number;
  homeLoanInterest24B: number;
  nps80CCD1B: number;
  employerNps80CCD2: number;
  hraExemption: number;
  ltaExemption: number;
  otherDeductions: number;
  professionalTax: number;
}

export interface TaxResult {
  grossIncome: number;
  totalDeductions: number;
  netTaxableIncome: number;
  taxOnIncome: number;
  rebate87A: number;
  surcharge: number;
  marginalRelief: number;
  cess: number;
  totalTax: number;
}

export interface CompareResult {
  newRegime: TaxResult;
  oldRegime: TaxResult;
  betterRegime: "new" | "old" | "equal";
  taxSaved: number;
}

export interface TakeHomeResult {
  grossMonthly: number;
  monthlyDeductions: {
    epf: number;
    professionalTax: number;
    incomeTax: number;
  };
  netTakeHome: number;
}
