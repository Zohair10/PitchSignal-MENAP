import { EvaluationReport } from "../schemas/evaluationReport.schema";

export const PAYBRIDGE_FALLBACK_REPORT: EvaluationReport = {
  startupName: "PayBridge",
  verdict: "Promising but needs sharper proof",
  overallScore: 72,
  scores: {
    storyClarity: 78,
    regionalMarketFit: 76,
    tractionCredibility: 63,
  },
  topInvestorObjections: [
    {
      objection: "Your waitlist is not enough proof of payment trust.",
      whyItMatters:
        "For a fintech product in Pakistan, investors need evidence that users will trust you with real payment flows, not only signups.",
      howToFix:
        "Convert waitlist users into a small verified pilot with measurable transaction intent or LOIs.",
    },
    {
      objection: "The regulatory path is unclear.",
      whyItMatters:
        "Fintech investors will ask what can be tested now and what requires approval before scaling.",
      howToFix:
        "Add a regulatory awareness slide explaining pilot scope, licensing assumptions, and next legal review steps.",
    },
    {
      objection: "The UAE-to-Pakistan corridor is still too broad.",
      whyItMatters:
        "A broad cross-border payment claim creates execution and compliance risk.",
      howToFix:
        "Start with one narrow wedge, such as UAE-based agencies paying Pakistani freelancers.",
    },
    {
      objection: "There is no live transaction data yet.",
      whyItMatters:
        "Payments investors need transaction evidence, retention, or repeat usage signals.",
      howToFix:
        "Run a concierge MVP or manual workflow to collect early transaction behavior.",
    },
    {
      objection: "The $300K ask needs clearer milestone mapping.",
      whyItMatters:
        "Investors want to know what proof the round will create.",
      howToFix:
        "Map the funding ask to milestones: pilot users, transaction volume, regulatory review, and MVP launch.",
    },
  ],
  vcMemo: {
    summary:
      "PayBridge addresses a real pain point for Pakistani freelancers and SMBs, but it is not fully pitch-ready because traction is still mostly intent-based. The story becomes stronger if the team proves a narrow payment corridor and shows verified pilot usage.",
    whatWorks: [
      "Clear pain point",
      "Relevant Pakistan freelancer market",
      "Strong fintech wedge",
    ],
    whatBreaksThePitch: [
      "No live transaction data",
      "Regulatory path unclear",
      "Waitlist used as traction",
    ],
  },
  topThreeFixes: [
    {
      title: "Validate trust with a pilot",
      action: "Convert 20 waitlist users into verified pilot participants.",
      expectedImpact: "Improves traction credibility.",
    },
    {
      title: "Narrow the wedge",
      action: "Focus on one corridor and one customer segment.",
      expectedImpact: "Makes the go-to-market more believable.",
    },
    {
      title: "Add regulatory awareness",
      action: "Explain what can be piloted now versus what needs approval.",
      expectedImpact: "Reduces investor risk perception.",
    },
  ],
  improvedPitch: {
    oneLiner:
      "PayBridge helps Pakistani freelancers receive international client payments through a faster, lower-friction workflow built for the UAE-to-Pakistan corridor.",
    elevatorPitch:
      "Pakistani freelancers lose time and money receiving international payments. PayBridge starts with a focused UAE-to-Pakistan freelancer payment workflow, validating trust and transaction behavior before scaling into a broader fintech platform.",
  },
  regionalSignalsUsed: [
    "Pakistan funding selectivity",
    "Pakistan freelancer export market",
    "Fintech regulatory awareness",
    "Investor preference for verified traction over waitlists",
  ],
};
