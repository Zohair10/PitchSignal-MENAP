# PitchSignal MENAP

**AI-powered investor objection generator for Pakistan/MENAP founders.** Paste your pitch, get told why investors will reject you — before you pitch.

Built for the Pakistan/MENAP startup ecosystem. Not generic Silicon Valley advice.

## What It Does

1. **Paste your pitch** — raw text or upload a PDF pitch deck
2. **AI auto-detects your sector** — Fintech, SaaS, Healthtech, E-commerce, Edtech, Logistics, AgriTech, CleanTech, PropTech, AI/ML, D2C, or Other
3. **5-agent pipeline analyzes your pitch** — sector-specific evaluation criteria, regional red flags, investor expectations
4. **Get a full investor report** — scores, top 5 objections with fixes, VC memo, improved pitch

## Features

- **Sector-aware analysis** — Different evaluation criteria for fintech vs SaaS vs healthtech vs e-commerce
- **MENAP-specific knowledge** — Pakistan SBP regulations, GCC remittance corridors, regional investor expectations
- **PDF pitch deck support** — Client-side PDF rendering + AI vision OCR for image-based decks
- **Real-time streaming** — SSE streaming shows each AI agent working through the pipeline
- **Shareable reports** — Reports encoded in the URL (lz-string compression), no database needed
- **Print-ready reports** — Clean print layout for offline sharing

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, Framer Motion |
| AI Pipeline | LangChain.js, Groq API (llama-3.3-70b-versatile) |
| PDF Processing | pdf.js (client-side rendering), llama-4-scout (OCR) |
| Validation | Zod v4 |
| Data Flow | URL-encoded reports (lz-string), no database |

## Getting Started

### Prerequisites

- Node.js 18+
- Groq API key ([get one here](https://console.groq.com))

### Setup

```bash
git clone https://github.com/Zohair10/PitchSignal-MENAP.git
cd PitchSignal-MENAP
npm install
```

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                  # Landing page
  evaluate/page.tsx         # Founder input form
  report/page.tsx           # Report display (URL-encoded data)
  api/
    evaluate/route.ts       # Sync evaluation endpoint
    evaluate-stream/route.ts # SSE streaming endpoint
    extract-ocr/route.ts    # PDF OCR endpoint

lib/
  chains/                   # 5-step AI pipeline
    intakeChain.ts          # Step 1: Extract profile + detect sector
    storyReviewChain.ts     # Step 2: Score narrative clarity
    marketTractionChain.ts  # Step 3: Regional market fit + traction
    objectionsChain.ts      # Step 4: Generate investor objections
    finalMemoChain.ts       # Step 5: Assemble evaluation report
  schemas/                  # Zod validation schemas
  services/
    model.ts                # Groq API config
    structuredOutput.ts     # JSON extraction + Zod validation
    evaluateStartup.ts      # Pipeline orchestrator
  data/
    regionalKnowledgePack.ts   # Pakistan + MENAP investor data
    sectorKnowledgePack.ts     # 12-sector evaluation criteria
    fallbackReport.ts          # Fallback report on API failure
    demoData.ts                # Demo startup data (PayBridge, MedConnect)
  utils/
    encodeReport.ts         # lz-string encode/decode

components/
  evaluate/                 # Input form components
  report/                   # Report display components
  shared/                   # Logo, score ring, gradient orb
  ui/                       # shadcn/ui primitives
```

## AI Pipeline

```
Founder submits pitch
       |
       v
  Intake Agent ──────────── Detects sector (12 categories)
       |                       Extracts: problem, solution, model, traction...
       v
  Sector Knowledge ──────── Loads sector-specific criteria + MENAP nuances
  Regional Knowledge ────── Injects Pakistan/MENAP investor expectations
       |
       v
  Story Reviewer ────────── Scores clarity (sector-aware lens)
       |
       v
  Market & Traction ─────── Regional fit + traction credibility
       |                       (sector-specific red flags + bonus signals)
       v
  Investor Simulator ────── Top 5 objections (sector + region specific)
       |
       v
  Memo Writer ───────────── Final report: scores, fixes, improved pitch
```

Each step uses Groq's `llama-3.3-70b-versatile` with structured JSON output validated by Zod schemas.

## Sector Categories

The pipeline auto-classifies startups into one of 12 sectors, each with unique evaluation criteria:

| Sector | Key Evaluation Focus |
|--------|---------------------|
| Fintech | Regulatory readiness, unit economics per transaction, trust signals |
| SaaS | ARR/MRR, net dollar retention, CAC payback, gross margin |
| E-commerce | GMV, repeat purchase rate, AOV, logistics cost ratio |
| Healthtech | Clinical validation, provider adoption, regulatory clearance |
| Edtech | Completion rates, learning outcomes, paid conversion |
| Logistics | On-time delivery, cost per delivery, fleet utilization |
| AgriTech | Farmer adoption, yield improvement, supply chain integration |
| CleanTech/Energy | Energy yield, LCOE, offtaker agreements |
| PropTech | Transaction volume, marketplace liquidity, title verification |
| AI/ML | Model performance, data moat, inference cost |
| D2C | Brand loyalty, repeat rate, CAC:LTV, social conversion |
| Other | General: problem-solution fit, market size, team, traction |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | Yes | — | Groq API key |
| `GROQ_MODEL` | No | `llama-3.3-70b-versatile` | Text model for pipeline chains |

## Deployment

Optimized for Vercel. Push to GitHub and connect the repo — zero config needed.

Set `GROQ_API_KEY` in Vercel environment variables.

## License

MIT
