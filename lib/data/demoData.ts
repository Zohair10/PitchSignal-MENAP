import { FounderInput } from "../schemas/founderInput.schema";

export const PAYBRIDGE_DEMO_DATA: FounderInput = {
  startupName: "PayBridge",
  country: "Pakistan",
  pitchText:
    "PayBridge is building the payment infrastructure that Pakistani freelancers and SMBs have been waiting for. Pakistan has the 4th largest freelancer population globally, generating $396M in export revenue. Yet these freelancers face 3-5 day wait times, 5-10% in fees, and unreliable payment methods. PayPal doesn't operate in Pakistan. Bank transfers are slow and expensive. PayBridge solves this by starting with a focused UAE-to-Pakistan corridor, offering same-day settlement, transparent FX rates, and a digital-first onboarding experience. We have 2,000 waitlist users, 12 pilot merchants testing the product, and 3 signed LOIs from UAE-based agencies. We're raising $300K to launch our MVP, expand our pilot program, and begin regulatory licensing. Our team includes a former fintech product manager and a payments engineer with experience at a leading Pakistani digital bank. The opportunity is massive: Pakistan's remittance corridor from the GCC exceeds $12B annually, and we're starting with the freelancer wedge before expanding to SMBs and cross-border B2B payments.",
};

export const MEDCONNECT_DEMO_DATA: FounderInput = {
  startupName: "MedConnect",
  country: "UAE",
  pitchText:
    "MedConnect is a telemedicine platform connecting UAE residents with licensed physicians for video consultations, prescription delivery, and chronic care management. The UAE healthcare market is valued at $22B but access to specialists remains a challenge — average wait time for a specialist appointment is 3 weeks. Our platform reduces this to under 24 hours. We are a Seed-stage healthtech company with 8,000 active users, $180K ARR, and partnerships with 3 hospital groups in Dubai and Abu Dhabi. Our B2B model offers corporate health plans to UAE employers — currently serving 15 companies with 4,000 covered employees. We charge AED 99 per consultation (vs AED 300+ in-clinic) and AED 49/month per employee for corporate plans. Prescription delivery is fulfilled through a partnership with Aster Pharmacy. We are raising $1.5M in Seed funding to expand to Saudi Arabia and Qatar, add AI-powered symptom triage, and grow our corporate client base to 50 companies. The GCC telemedicine market is projected to reach $6.5B by 2028, and COVID accelerated adoption with 70% of UAE residents now open to virtual consultations.",
};

export const DEMO_OPTIONS = [
  { key: "paybridge", label: "PayBridge (Fintech/PK)", data: PAYBRIDGE_DEMO_DATA },
  { key: "medconnect", label: "MedConnect (Healthtech/UAE)", data: MEDCONNECT_DEMO_DATA },
] as const;
