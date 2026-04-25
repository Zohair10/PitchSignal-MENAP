export const SECTOR_CATEGORIES = [
  "Fintech",
  "SaaS",
  "E-commerce",
  "Healthtech",
  "Edtech",
  "Logistics",
  "AgriTech",
  "CleanTech/Energy",
  "PropTech",
  "AI/ML",
  "D2C",
  "Other",
] as const;

export type SectorCategory = (typeof SECTOR_CATEGORIES)[number];

export interface SectorKnowledge {
  evaluationLens: string;
  keyMetrics: string[];
  redFlags: string[];
  investorExpectations: string[];
  regionalNuances: string[];
  bonusSignals: string[];
}

const sectorKnowledgePack: Record<string, SectorKnowledge> = {
  fintech: {
    evaluationLens:
      "Regulatory readiness, unit economics per transaction, and trust signals are the primary evaluation criteria for fintech startups.",
    keyMetrics: [
      "transaction volume and GMV",
      "regulatory license or sandbox status",
      "unit economics per transaction (take rate, cost per tx)",
      "NPS or trust scores from pilot users",
    ],
    redFlags: [
      "No awareness of SBP / central bank regulatory requirements",
      "Waitlist-only traction for a payments or lending product",
      "No fraud or compliance strategy mentioned",
      "Claiming to 'displace banks' without a licensing path",
    ],
    investorExpectations: [
      "Clear regulatory roadmap (sandbox → pilot → license)",
      "Evidence of user trust (pilot transactions, not just signups)",
      "Unit economics or path to profitability per transaction",
      "Partnerships with banks, telcos, or financial institutions",
    ],
    regionalNuances: [
      "Pakistan SBP requires licensing for digital payments and lending; sandbox available but slow",
      "GCC remittance corridors (UAE→PK, KSA→PK) are high-volume but heavily regulated",
      "Mobile wallets (Easypaisa, JazzCash) dominate in Pakistan — partnerships essential",
      "Open banking is nascent in MENAP; API-based plays need bank partnerships",
    ],
    bonusSignals: [
      "Active regulatory sandbox application or approval",
      "Pilot with measurable transaction volume",
      "Bank or telco LOI/partnership",
    ],
  },

  saas: {
    evaluationLens:
      "Recurring revenue quality, customer retention, and scalability are the primary evaluation criteria for SaaS startups.",
    keyMetrics: [
      "ARR / MRR and growth rate",
      "net dollar retention or logo retention",
      "CAC payback period",
      "gross margin (target 70%+)",
    ],
    redFlags: [
      "No usage retention data (only signups)",
      "Single-customer or single-segment concentration",
      "Heavy customization per client (consulting disguised as SaaS)",
      "No clear pricing model or free-tier-without-upgrade path",
    ],
    investorExpectations: [
      "Demonstrable MRR or ARR with growth trajectory",
      "Low churn and expanding usage within existing accounts",
      "Product-led growth or efficient sales motion",
      "Clear path to 70%+ gross margins at scale",
    ],
    regionalNuances: [
      "MENAP enterprises prefer on-premise or hybrid deployments — pure cloud SaaS adoption is still early",
      "SMB willingness-to-pay for software is low in Pakistan; B2B enterprise or GCC markets preferred",
      "Arabic localization is table stakes for GCC enterprise sales",
      "Government / SOE contracts are large but have long sales cycles and payment delays",
    ],
    bonusSignals: [
      "3+ months of sequential MRR growth",
      "Net dollar retention above 110%",
      "Enterprise or government pilot with expansion commitment",
    ],
  },

  ecommerce: {
    evaluationLens:
      "Unit economics (GMV, AOV, repeat rate) and logistics execution capability are the primary evaluation criteria for e-commerce startups.",
    keyMetrics: [
      "GMV and monthly growth rate",
      "repeat purchase rate and AOV",
      "logistics cost as % of revenue",
      "customer acquisition cost and LTV",
    ],
    redFlags: [
      "No logistics strategy or last-mile plan",
      "Low margins with no clear path to scale advantage",
      "Pure marketplace with no supply differentiation",
      "Ignoring COD (cash-on-delivery) dominance in Pakistan",
    ],
    investorExpectations: [
      "Demonstrable repeat purchase behavior",
      "Own or managed logistics solution for quality control",
      "Clear take-rate or commission model",
      "Supply-side moat (exclusive brands, own label, or vertical integration)",
    ],
    regionalNuances: [
      "COD accounts for 80%+ of e-commerce transactions in Pakistan — must plan for it",
      "Last-mile delivery is unreliable outside major cities; hyperlocal plays are risky",
      "Daraz and price-comparison sites (PriceOye) dominate discovery — differentiation is key",
      "GCC e-commerce is mature; social commerce (Instagram/WhatsApp) is growing in Pakistan",
    ],
    bonusSignals: [
      "Repeat purchase rate above 30%",
      "Own logistics or exclusive courier partnership",
      "Positive unit economics at current scale",
    ],
  },

  healthtech: {
    evaluationLens:
      "Clinical validation, provider adoption, and regulatory clearance are the primary evaluation criteria for healthtech startups.",
    keyMetrics: [
      "clinical outcome data or validated health impact",
      "provider or hospital adoption rate",
      "patient retention and engagement metrics",
      "regulatory clearance status",
    ],
    redFlags: [
      "No regulatory clearance pathway mentioned",
      "Claims clinical outcomes without supporting data",
      "No healthcare professional or clinical advisor on team",
      "Selling to hospitals without understanding procurement cycles",
    ],
    investorExpectations: [
      "Evidence of clinical validation or pilot with a recognized hospital",
      "Clear regulatory pathway (PMC, FDA, MoH approval)",
      "Clinician or healthcare expert on founding team",
      "Reimbursement or insurance integration strategy",
    ],
    regionalNuances: [
      "Pakistan healthcare is 70%+ out-of-pocket — affordability is critical",
      "Hospital procurement is slow and relationship-driven; pilots are easier than contracts",
      "Telemedicine adoption spiked post-COVID but monetization remains challenging",
      "GCC healthcare is insurance-driven; integration with payers is essential",
    ],
    bonusSignals: [
      "Active hospital or clinic pilot with outcome data",
      "Regulatory approval or clearance obtained",
      "Clinical advisory board or medical co-founder",
    ],
  },

  edtech: {
    evaluationLens:
      "Learning outcomes, engagement retention, and willingness-to-pay are the primary evaluation criteria for edtech startups.",
    keyMetrics: [
      "completion rates for courses or programs",
      "learner engagement and daily/weekly active usage",
      "paid conversion rate from free tier",
      "learning outcome improvement (test scores, job placements)",
    ],
    redFlags: [
      "No evidence of learning outcomes or skill improvement",
      "High signup rates but low completion or engagement",
      "Free-only model with no monetization strategy",
      "Targeting schools without government or institutional buy-in",
    ],
    investorExpectations: [
      "Demonstrable learning outcomes or placement rates",
      "Freemium-to-paid conversion above industry average",
      "B2B or institutional revenue (not just B2C)",
      "Content moat or proprietary curriculum",
    ],
    regionalNuances: [
      "Pakistan has high willingness to pay for test prep (MDCAT, CSS, IELTS) — vertical edtech works",
      "Government school digitization programs exist but move slowly; private school B2B is faster",
      "GCC has strong demand for upskilling and professional certification (PMP, CFA, tech skills)",
      "Urdu / Arabic localization significantly expands addressable market",
    ],
    bonusSignals: [
      "Completion rate above 40%",
      "Measurable learning outcome improvement",
      "Institutional or B2B contracts signed",
    ],
  },

  logistics: {
    evaluationLens:
      "Operational efficiency, delivery reliability, and fleet/infrastructure management are the primary evaluation criteria for logistics startups.",
    keyMetrics: [
      "on-time delivery rate",
      "cost per delivery and route efficiency",
      "fleet utilization rate",
      "customer NPS or complaint rate",
    ],
    redFlags: [
      "No fleet or infrastructure strategy",
      "Ignoring last-mile challenges in target geography",
      "No proof of delivery reliability or SLA tracking",
      "Competing on price alone without operational efficiency",
    ],
    investorExpectations: [
      "Demonstrable on-time delivery above 90%",
      "Declining cost-per-delivery with scale",
      "Technology-enabled route optimization or tracking",
      "Strategic warehouse or hub placement",
    ],
    regionalNuances: [
      "Pakistan logistics suffers from poor road infrastructure outside urban centers",
      "Freight and trucking are fragmented — tech-enabled aggregation works (like Bykea, Trukkr)",
      "GCC logistics is mature; cross-border logistics (GCC↔Pakistan) is an underserved niche",
      "Cold chain logistics for pharma and food is a growing opportunity in both regions",
    ],
    bonusSignals: [
      "On-time delivery rate above 95%",
      "Declining unit economics with scale",
      "Enterprise logistics contracts with major shippers",
    ],
  },

  agritech: {
    evaluationLens:
      "Farmer adoption, yield improvement evidence, and supply chain integration are the primary evaluation criteria for agritech startups.",
    keyMetrics: [
      "number of farmers onboarded and active",
      "yield improvement or cost reduction data",
      "revenue per farmer or per acre",
      "supply chain throughput or marketplace GMV",
    ],
    redFlags: [
      "No field trial data or yield improvement evidence",
      "Selling to farmers without understanding seasonal cash flow",
      "No last-mile distribution plan for rural areas",
      "Ignoring middlemen / arhti dominance in Pakistan agriculture",
    ],
    investorExpectations: [
      "Pilot data showing yield improvement or cost reduction",
      "Farmer retention across seasons",
      "Clear monetization model (subscription, marketplace commission, or input sales)",
      "Partnership with agronomists, research institutes, or government programs",
    ],
    regionalNuances: [
      "Pakistan agriculture is 20% of GDP but heavily fragmented; smallholder farmers are the majority",
      "Arhti (middlemen) control supply chains — bypassing them requires strong farmer relationships",
      "GCC imports 80%+ of food — cross-border agritech (export quality, cold chain) has potential",
      "Government subsidies for seeds, fertilizer, and equipment exist but distribution is uneven",
    ],
    bonusSignals: [
      "Multi-season farmer retention data",
      "Yield improvement above 20% in field trials",
      "Government or institutional partnership",
    ],
  },

  cleantech: {
    evaluationLens:
      "Energy yield or efficiency data, regulatory incentives, and capital efficiency are the primary evaluation criteria for clean energy startups.",
    keyMetrics: [
      "energy yield or efficiency metrics (kWh, CO2 offset)",
      "LCOE (levelized cost of energy) or payback period",
      "installed capacity or project pipeline",
      "offtaker agreements or PPA contracts",
    ],
    redFlags: [
      "No energy yield data or performance benchmarks",
      "Dependent on subsidies with no path to grid parity",
      "No understanding of grid interconnection or net metering rules",
      "High capex with unclear unit economics at scale",
    ],
    investorExpectations: [
      "Proven energy yield or efficiency data from pilots",
      "Clear path to grid parity without subsidies",
      "Offtaker agreements or power purchase agreements",
      "Scalable technology (not just project finance)",
    ],
    regionalNuances: [
      "Pakistan has net metering for solar; policy stability is a concern",
      "GCC is investing heavily in solar and green hydrogen — large-scale opportunities",
      "Circular debt in Pakistan's power sector complicates utility-scale plays",
      "Off-grid solar and micro-grids are viable for rural Pakistan and remote GCC sites",
    ],
    bonusSignals: [
      "PPA or offtaker agreement signed",
      "Energy yield data exceeding projections",
      "Government tender or NEPRA approval (Pakistan)",
    ],
  },

  proptech: {
    evaluationLens:
      "Transaction volume, marketplace liquidity, and regulatory compliance are the primary evaluation criteria for proptech startups.",
    keyMetrics: [
      "transaction volume or GMV",
      "time-to-close or listing-to-sale ratio",
      "marketplace liquidity (listings vs. transactions)",
      "revenue per transaction or subscription MRR",
    ],
    redFlags: [
      "No evidence of actual transactions completed",
      "Ignoring property registration and title verification complexity",
      "Marketplace model with no supply or demand moat",
      "No understanding of real estate regulation (RERA, CDA, etc.)",
    ],
    investorExpectations: [
      "Completed transactions with measurable efficiency gains",
      "Title verification or due diligence automation",
      "Partnership with developers, agents, or financial institutions",
      "Data moat (property records, pricing data, or market intelligence)",
    ],
    regionalNuances: [
      "Pakistan real estate is largely undocumented — title verification and digital records are a major pain point",
      "RERA-style regulation is emerging but enforcement is weak",
      "GCC real estate is more regulated; DLD (Dubai), RERA (Dubai) require compliance",
      "Fractional ownership and REITs are nascent in both Pakistan and GCC — early mover advantage",
    ],
    bonusSignals: [
      "Completed transactions with documented efficiency improvement",
      "Government or authority partnership for data access",
      "Mortgage or financing integration with banks",
    ],
  },

  aiml: {
    evaluationLens:
      "Model performance, data moat, and defensible technical differentiation are the primary evaluation criteria for AI/ML startups.",
    keyMetrics: [
      "model accuracy or performance benchmarks vs. baselines",
      "training data volume and uniqueness",
      "API call volume or inference throughput",
      "customer integration depth (API vs. dashboard)",
    ],
    redFlags: [
      "No proprietary model — just wrapping a third-party API",
      "No training data strategy or data moat",
      "Claims AI capability without benchmarks or evaluation data",
      "High inference cost with no optimization plan",
    ],
    investorExpectations: [
      "Proprietary model or fine-tuned model with measurable performance edge",
      "Training data pipeline or unique data source",
      "Technical team with ML/AI research credentials",
      "Clear differentiation from open-source or API-based alternatives",
    ],
    regionalNuances: [
      "MENAP market is price-sensitive — expensive inference costs can kill unit economics",
      "Arabic/Urdu NLP models are underdeveloped — opportunity for localization plays",
      "Government and enterprise AI adoption is growing but requires on-premise deployment options",
      "Data privacy regulations are evolving — data residency and sovereignty matter",
    ],
    bonusSignals: [
      "Model performance exceeding open-source baselines",
      "Unique proprietary training dataset",
      "Enterprise integration with measurable customer ROI",
    ],
  },

  d2c: {
    evaluationLens:
      "Brand loyalty, repeat purchase behavior, and unit economics across channels are the primary evaluation criteria for D2C startups.",
    keyMetrics: [
      "repeat purchase rate and brand recall",
      "CAC and LTV by channel",
      "gross margin after fulfillment costs",
      "social media engagement to conversion rate",
    ],
    redFlags: [
      "Low repeat purchase rate — one-time buyers only",
      "High CAC with no organic or viral channel",
      "No brand differentiation from existing alternatives",
      "Ignoring COD and local payment preferences",
    ],
    investorExpectations: [
      "Strong repeat purchase behavior (30%+)",
      "Balanced CAC:LTV ratio (at least 1:3)",
      "Brand building strategy with measurable engagement",
      "Multi-channel distribution (Instagram, WhatsApp, marketplaces, retail)",
    ],
    regionalNuances: [
      "WhatsApp commerce is massive in Pakistan — D2C must support WhatsApp ordering",
      "Instagram and TikTok are primary discovery channels for young consumers",
      "GCC consumers expect premium packaging and fast delivery — logistics partnerships essential",
      "Price sensitivity is high in Pakistan; value-for-money positioning works better than premium",
    ],
    bonusSignals: [
      "Repeat purchase rate above 40%",
      "Organic/viral acquisition channel contributing 30%+ of sales",
      "Retail or marketplace partnerships expanding reach",
    ],
  },

  other: {
    evaluationLens:
      "General startup evaluation: problem-solution fit, market size, team capability, and traction evidence.",
    keyMetrics: [
      "user growth or revenue traction",
      "customer acquisition cost and retention",
      "market size and competitive positioning",
      "team domain expertise",
    ],
    redFlags: [
      "No evidence of customer demand or validation",
      "Large TAM claim with no wedge or differentiation",
      "No revenue model or monetization strategy",
      "Unrealistic projections without supporting evidence",
    ],
    investorExpectations: [
      "Clear problem statement with validated customer need",
      "Demonstrable traction (users, revenue, partnerships)",
      "Realistic market sizing with go-to-market strategy",
      "Team with relevant domain expertise",
    ],
    regionalNuances: [
      "MENAP investors prefer capital-efficient models with shorter paths to revenue",
      "Distribution and go-to-market in Pakistan is harder than building the product",
      "Government and enterprise B2B sales have long cycles in the region",
    ],
    bonusSignals: [
      "Revenue-generating with month-over-month growth",
      "Recognized institutional or enterprise customer",
      "Team with prior successful exit or deep domain experience",
    ],
  },
};

export function getSectorKnowledge(sector: string): SectorKnowledge {
  const normalized = sector.toLowerCase().replace(/[/\s-]/g, "");
  return sectorKnowledgePack[normalized] || sectorKnowledgePack.other;
}
