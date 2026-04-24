export const regionalKnowledgePack = {
  pakistan: {
    ecosystemReality: [
      "Pakistan startup funding is selective and concentrated; founders need strong proof, not just a large TAM.",
      "Investors usually look for founder-market fit, capital efficiency, traction quality, and realistic distribution.",
      "The Pakistan startup ecosystem is emerging but still early; investors are cautious and prefer de-risked bets.",
      "Regulatory uncertainty in fintech, healthtech, and edtech sectors is a key investor concern.",
    ],
    marketStats: [
      "Pakistan startup equity funding reached $36.6M in 2025 across 14 transactions.",
      "Pakistan had around 116M internet users at the start of 2025 with 45.7% internet penetration.",
      "Pakistani freelancers generated around $396M in export revenue in FY2021-22.",
      "Pakistan's GDP per capita is approximately $1,500, making pricing and unit economics critical.",
      "Mobile penetration exceeds 80%, making mobile-first strategies essential.",
    ],
    investorExpectations: [
      "Clear Pakistan-specific problem statement",
      "Evidence of willingness to pay, not just user interest",
      "Pilot users, revenue, LOIs, or repeat usage as traction proof",
      "Capital-efficient go-to-market strategy",
      "Regulatory awareness especially for fintech",
      "Founder-market fit and domain expertise",
      "Realistic distribution plan accounting for Pakistan's infrastructure challenges",
    ],
    commonRedFlags: [
      "Large TAM but no narrow local wedge",
      "Waitlist used as traction without verification",
      "No willingness-to-pay proof",
      "Unclear revenue model",
      "Weak distribution strategy",
      "Ignoring regulatory friction in fintech",
      "Copying a Western model without local adaptation",
      "Claiming 'first-mover advantage' without market validation",
    ],
    investorExamples: [
      "Indus Valley Capital",
      "i2i Ventures",
      "Fatima Gobi Ventures",
      "Zayn VC",
      "Sarmayacar",
      "Lakson Ventures",
      "JazzCLAN (previously known as JSCL)",
    ],
  },
  menap: {
    ecosystemReality: [
      "MENAP markets vary widely in maturity; GCC is more developed than Pakistan or North Africa.",
      "Cross-border plays between GCC and South Asia are gaining investor interest.",
      "Investors look for scalable models that can expand beyond a single MENAP market.",
    ],
    marketStats: [
      "MENAP region has a combined population of over 600M with a growing youth demographic.",
      "UAE and Saudi Arabia lead in startup funding within the MENA region.",
      "Fintech, e-commerce, and logistics are the most funded sectors in MENAP.",
    ],
    investorExpectations: [
      "Clear path to profitability given smaller market sizes",
      "Regulatory clarity for cross-border operations",
      "Evidence of product-market fit in at least one market",
    ],
    commonRedFlags: [
      "Assuming GCC purchasing power applies across all MENAP markets",
      "No regulatory plan for financial services",
      "Underestimating infrastructure and logistics challenges",
    ],
    investorExamples: [
      "BECO Capital",
      "Wamda Capital",
      "Global Ventures",
      "Raed Ventures",
    ],
  },
};

export type RegionalKnowledgeKey = keyof typeof regionalKnowledgePack;
