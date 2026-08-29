import { SalaryRecommendation } from '../types';

interface WageBenchmarkConfig {
  statutoryMinDaily: number;
  fairMarketDaily: number;
  medianHourly: number;
  toolAllowanceDaily: number;
}

const tradeBenchmarkMap: Record<string, WageBenchmarkConfig> = {
  Mason: { statutoryMinDaily: 580, fairMarketDaily: 850, medianHourly: 110, toolAllowanceDaily: 100 },
  Plumber: { statutoryMinDaily: 560, fairMarketDaily: 800, medianHourly: 105, toolAllowanceDaily: 120 },
  Electrician: { statutoryMinDaily: 600, fairMarketDaily: 900, medianHourly: 120, toolAllowanceDaily: 150 },
  Carpenter: { statutoryMinDaily: 580, fairMarketDaily: 850, medianHourly: 110, toolAllowanceDaily: 150 },
  Painter: { statutoryMinDaily: 520, fairMarketDaily: 750, medianHourly: 95, toolAllowanceDaily: 80 },
  Welder: { statutoryMinDaily: 620, fairMarketDaily: 950, medianHourly: 130, toolAllowanceDaily: 120 },
  Helper: { statutoryMinDaily: 450, fairMarketDaily: 600, medianHourly: 75, toolAllowanceDaily: 0 },
  Driver: { statutoryMinDaily: 550, fairMarketDaily: 800, medianHourly: 100, toolAllowanceDaily: 0 },
  Security: { statutoryMinDaily: 500, fairMarketDaily: 700, medianHourly: 85, toolAllowanceDaily: 0 },
  Housekeeper: { statutoryMinDaily: 420, fairMarketDaily: 550, medianHourly: 70, toolAllowanceDaily: 0 },
};

export const calculateFairWage = (
  profession: string,
  period: 'hour' | 'day' | 'week' | 'month' = 'day',
  workerBringsTools: boolean = false,
  experienceYears: number = 2
): SalaryRecommendation => {
  const baseConfig = tradeBenchmarkMap[profession] || {
    statutoryMinDaily: 500,
    fairMarketDaily: 750,
    medianHourly: 95,
    toolAllowanceDaily: 100,
  };

  const expMultiplier = 1 + Math.min(experienceYears * 0.05, 0.3);
  const toolAllowance = workerBringsTools ? baseConfig.toolAllowanceDaily : 0;

  const minDaily = Math.round(baseConfig.statutoryMinDaily);
  const medianDaily = Math.round(baseConfig.fairMarketDaily * expMultiplier + toolAllowance);
  const maxDaily = Math.round(medianDaily * 1.25);

  const bonusPercent = Math.round((expMultiplier - 1) * 100);
  const factorsExplanation: string[] = [
    'Official statutory minimum daily wage baseline: ₹' + minDaily,
    'Market benchmark adjusted for ' + experienceYears + ' yrs experience (' + bonusPercent + '% bonus)',
  ];

  if (workerBringsTools && toolAllowance > 0) {
    factorsExplanation.push('Includes +₹' + toolAllowance + '/day equipment & tool wear allowance');
  }

  if (period === 'hour') {
    return {
      recommendedMin: Math.round(minDaily / 8),
      recommendedMax: Math.round(maxDaily / 8),
      suggestedMedian: Math.round(medianDaily / 8),
      factorsExplanation,
      currency: 'INR',
    };
  }

  if (period === 'month') {
    return {
      recommendedMin: minDaily * 26,
      recommendedMax: maxDaily * 26,
      suggestedMedian: medianDaily * 26,
      factorsExplanation,
      currency: 'INR',
    };
  }

  if (period === 'week') {
    return {
      recommendedMin: minDaily * 6,
      recommendedMax: maxDaily * 6,
      suggestedMedian: medianDaily * 6,
      factorsExplanation,
      currency: 'INR',
    };
  }

  return {
    recommendedMin: minDaily,
    recommendedMax: maxDaily,
    suggestedMedian: medianDaily,
    factorsExplanation,
    currency: 'INR',
  };
};

export const getWageComplianceLevel = (
  offeredAmount: number,
  profession: string,
  period: 'hour' | 'day' | 'week' | 'month' = 'day'
): 'fair_wage' | 'legal_minimum' | 'substandard' => {
  const benchmark = calculateFairWage(profession, period);
  if (offeredAmount >= benchmark.suggestedMedian) return 'fair_wage';
  if (offeredAmount >= benchmark.recommendedMin) return 'legal_minimum';
  return 'substandard';
};
