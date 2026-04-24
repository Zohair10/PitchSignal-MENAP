export const evaluationRules = {
  pakistan: {
    traction: {
      waitlistOnly: {
        penalty: -15,
        reason:
          "In Pakistan's selective funding market, waitlists are weak unless supported by pilots, LOIs, revenue, or repeat usage.",
      },
      hasPilotUsers: {
        bonus: 10,
        reason:
          "Pilot users provide stronger evidence than passive signups.",
      },
      hasRevenue: {
        bonus: 15,
        reason:
          "Revenue is a strong credibility signal for early-stage fundraising.",
      },
    },
    market: {
      noDistributionStrategy: {
        penalty: -15,
        reason:
          "Pakistan has large digital scale but uneven internet penetration, so go-to-market must be clear.",
      },
    },
    fintech: {
      noRegulatoryAwareness: {
        penalty: -10,
        reason:
          "Fintech founders should explain what can be piloted now versus what requires approval.",
      },
    },
  },
};
