export const SALARY_LPAS = [5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25, 30];

export interface SalaryPageConfig {
  lpa: number;
  slug: string;
}

export function getSalaryConfigs(): SalaryPageConfig[] {
  return SALARY_LPAS.map((lpa) => ({
    lpa,
    slug: `${lpa}-lpa`,
  }));
}
