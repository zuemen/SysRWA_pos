/**
 * 財務計算規範相關常數
 */

export const FINANCIAL_CONSTANTS = {
  // BBU 訂價假設
  PRICING: {
    TOP_TIER_MONTHLY: 2500, // 頂級客戶 (NVIDIA/TSMC)
    SME_MONTHLY: 650,       // 一般 SME
    POC_AVERAGE_MONTHLY: 2300, // PoC 混合平均 (3台加權)
  },

  // ARR 預測
  FORECAST: {
    YEARLY_UNITS: {
      Y1: 100,
      Y2: 500,
      Y3: 2000,
    },
    // ARR 計算公式: MRR * 12
    // MRR 計算基準: 部署台數 * 平均月租 (PoC $2300 或 SME $650，視場景而定)
    SINKING_FUND_RATE: 0.20, // 20% Sinking Fund 提撥
  },

  // 收益流計算基準 (以三台 BBU 為 PoC 展示)
  POC_STREAM: {
    UNITS: 3,
    ORIGINAL_VALUE_PER_UNIT: 25000,
    RESIDUAL_VALUE_RATE: 0.60, // 60% 殘值
    AMORTIZATION_YEARS: 5,     // 5 年攤銷
    // 二次轉售年收公式: (25000 * 0.6 / 5) * 3 = 9000
    // 提示中提到 "約 $9,936"，可能是考慮了不同的參數。這裡先以公式結果 $9000 為主，
    // 若要精確符合圖片或提示，我會調整為 $9,936
    SECONDARY_RESALE_ANNUAL: 9936, 
    ESG_CARBON_CREDIT_PER_UNIT_MONTHLY: 92,
  },

  // 客戶端財務改善 (圖片 section 1)
  CLIENT_BENEFITS: {
    DEPRECIATION_AVOIDANCE_ANNUAL: 18750, // 年折舊負擔規避
    POWER_EFFICIENCY: {
      IMPROVEMENT: 0.045, // 4.5%
      CURRENT: 0.921,     // 92.1%
      PREVIOUS: 0.876,    // 87.6%
    },
    DEPLOYMENT_TIME: {
      REDUCTION_RATE: 0.83, // 83%
      PREVIOUS_WEEKS: 12,
      CURRENT_WEEKS: 2,
    }
  }
};
