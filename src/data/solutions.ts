export type Solution = {
  id: number
  title: string
  subtitle: string
  content: string
  chips: string[]
  status: 'active' | 'inactive' | 'pending'
  offerType: 'discount' | 'free-trial' | 'special-offer' | 'all'
  region: 'us' | 'eu' | 'ca' | 'uk' | 'all'
  category: 'pricing-underwriting' | 'product-operations' | 'technology' | 'central-functions' | 'claims' | 'all'
  heroHeadline?: string
  heroBlurb?: string
  highlights?: { title: string; body: string }[]
}

export const solutions: Solution[] = [
  {
    id: 1,
    title: 'SchemeServe',
    subtitle: 'Policy Admin System',
    content:
      'SchemeServe gives you the confidence to build your own schemes, and beat your competitors to market.',
    heroHeadline:
      'Launch and Manage Insurance Schemes Fast with Flexible, Real-Time Tools and Expert Support',
    heroBlurb:
      'SchemeServe helps MGAs launch, manage, and adapt schemes fast—whether you build them yourself or with help from their expert team. Make real-time changes at no extra cost, streamline operations with API integrations, and get lightning-fast support. Trusted since 2000, SchemeServe is carbon negative, ISO-certified, and built for insurers who value speed, flexibility, and simplicity.',
    highlights: [
      {
        title: 'Build Schemes Fast, Your Way',
        body:
          'Self-build with a no-code toolkit or collaborate with specialists to go live quickly. Keep full control from day one with transparent pricing—no surprise fees.'
      },
      {
        title: 'Edit Anything, Anytime — For Free',
        body:
          'Update rating, documents, or workflows instantly without waiting on a release cycle. Make safe changes in minutes and move at market speed.'
      },
      {
        title: 'Smart Automation & Underwriting',
        body:
          'Automate quotes, referrals, and renewals with configurable rules and triage. Use data-driven underwriting to reduce leakage and increase hit‑rate.'
      },
      {
        title: 'Powerful API Integrations',
        body:
          'Connect to pricing engines, payment providers, CRMs, and data sources. Orchestrate your stack with reliable, well-documented APIs.'
      },
      {
        title: 'Built‑In Accounting with Digit',
        body:
          'Reconcile premiums and bordereaux without spreadsheets. Automate postings and cut month‑end from days to hours.'
      }
    ],
    chips: ['Pricing & Underwriting', 'Product & Operations', 'Technology'],
    status: 'active',
    offerType: 'discount',
    region: 'eu',
    category: 'pricing-underwriting',
  },
  {
    id: 2,
    title: 'InsCipher',
    subtitle: 'Surplus Lines Filing Service',
    content:
      'Remove filing friction and reduce penalties with a managed surplus lines service built for speed and accuracy.',
    heroHeadline:
      'Stay Compliant Across All States with Fast, Accurate Surplus Lines Filings',
    heroBlurb:
      'InsCipher’s managed service combines expert filers and purpose‑built software to handle premium tax filings across jurisdictions. Track status in real time, reduce administrative overhead, and eliminate late fees.',
    highlights: [
      { title: 'Expert Filers on Demand', body: 'Licensed specialists file on your behalf while your team focuses on writing business.' },
      { title: 'Multi‑State Made Simple', body: 'One workflow covers varied state requirements, with built‑in validations to avoid errors.' },
      { title: 'Real‑Time Visibility', body: 'Dashboards and alerts keep you informed on due dates, submissions, and approvals.' },
      { title: 'Audit‑Ready Records', body: 'Centralized documentation and exportable reports simplify audits and reconciliations.' },
      { title: 'Predictable Pricing', body: 'Transparent, per‑filing pricing with no onboarding fees or long contracts.' }
    ],
    chips: ['Central Functions', 'Product & Operations', 'Technology'],
    status: 'active',
    offerType: 'free-trial',
    region: 'us',
    category: 'central-functions',
  },
  {
    id: 3,
    title: 'Sanctions.io',
    subtitle: 'Integrated Sanctions, PEP & Adverse Media Screening for MGAs',
    content:
      'Screen customers against global watchlists with fast, accurate AML checks. API & portal access, with low false positives. 20% off for Members.',
    heroHeadline:
      'Reduce False Positives and Prove Compliance with Modern AML Screening',
    heroBlurb:
      'Sanctions.io delivers rapid screening against consolidated sanctions, PEP, and adverse media lists. Tune your risk appetite with precise matching to lighten manual review without compromising compliance.',
    highlights: [
      { title: 'High‑Precision Matching', body: 'Advanced fuzzy logic reduces noise so analysts focus on true risks.' },
      { title: 'Always‑Up‑to‑Date Lists', body: 'Continuously refreshed sanctions and PEP sources with full change history.' },
      { title: 'Flexible Deployment', body: 'Use a clean web portal or embed via REST API with clear SLAs.' },
      { title: 'Configurable Workflows', body: 'Set review thresholds, dispositions, and audit trails to match policy.' },
      { title: 'Global Coverage', body: 'Support for multiple alphabets and transliterations for international screening.' }
    ],
    chips: ['Central Functions', 'Technology'],
    status: 'active',
    offerType: 'discount',
    region: 'uk',
    category: 'central-functions',
  },
  {
    id: 4,
    title: 'ExpertPEO',
    subtitle: 'Broker for PEO services',
    content:
      'Cut HR complexity and unlock enterprise‑grade benefits for small teams with the right PEO fit.',
    heroHeadline:
      'Find the Right PEO—Without Switching Carriers or Inflating Costs',
    heroBlurb:
      'ExpertPEO runs a competitive process across a curated panel of providers. You get apples‑to‑apples comparisons, negotiation support, and ongoing advisory—at no cost to you.',
    highlights: [
      { title: 'Competitive Bids', body: 'Vetted PEOs compete for your business—optimize rates and service levels.' },
      { title: 'Keep Your Carriers', body: 'Maintain existing insurance relationships while improving benefits and admin.' },
      { title: 'Hands‑On Transition', body: 'White‑glove onboarding minimizes disruption for your team and payroll.' },
      { title: 'Compliance Confidence', body: 'Multi‑state payroll, taxes, and filings handled by specialists.' },
      { title: 'Quarterly Reviews', body: 'Benchmark performance and costs to ensure continued fit and value.' }
    ],
    chips: ['Pricing & Underwriting', 'Product & Operations', 'Technology'],
    status: 'active',
    offerType: 'discount',
    region: 'ca',
    category: 'pricing-underwriting',
  },
  {
    id: 5,
    title: 'Turris',
    subtitle: 'Agent onboarding & compliance',
    content:
      'Automate agent onboarding, licensing, and compliance in minutes. Self‑serve tools + 6‑month free trial & 20% lifetime discount for Members.',
    heroHeadline:
      'Onboard Agents in Days, Not Weeks—with Automated Licensing and Controls',
    heroBlurb:
      'Turris centralizes producer data, licensing, and appointments in one system of record. Track expirations, automate renewals, and prevent distribution compliance gaps.',
    highlights: [
      { title: 'Single Source of Truth', body: 'Consolidate agent records, documents, and attestations across programs.' },
      { title: 'Licensing Automation', body: 'Automate applications and renewals with built‑in state‑specific rules.' },
      { title: 'Real‑Time Monitoring', body: 'Alerts for expirations and status changes keep your book compliant.' },
      { title: 'API‑Ready', body: 'Integrate with policy systems and portals to push updates automatically.' },
      { title: 'Audit Trails', body: 'Complete history for regulators and partners, exportable in seconds.' }
    ],
    chips: ['Central Functions', 'Product & Operations', 'Technology'],
    status: 'inactive',
    offerType: 'free-trial',
    region: 'eu',
    category: 'central-functions',
  },
  {
    id: 6,
    title: 'Cardinus',
    subtitle: 'Risk Surveys',
    content:
      'High‑quality risk surveys to reduce costs, save lives & meet compliance. Nationwide team. Preferred rates for Accelerant Members.',
    heroHeadline:
      'Make Risk Visible with Field‑Ready Surveyors and Actionable Reporting',
    heroBlurb:
      'Cardinus deploys experienced surveyors across the country to assess risks on‑site or virtually. You receive pragmatic recommendations, standardized scoring, and clear evidence to underwrite with confidence.',
    highlights: [
      { title: 'Nationwide Coverage', body: 'Rapid scheduling and consistent deliverables across regions and lines.' },
      { title: 'Actionable Reports', body: 'Clear findings, severity scoring, and prioritized recommendations for underwriters.' },
      { title: 'Flexible Modality', body: 'On‑site or virtual options to meet timelines and budget.' },
      { title: 'Safety First', body: 'Specialists trained for high‑risk environments and compliance requirements.' },
      { title: 'Program Insights', body: 'Roll‑up dashboards reveal systemic issues and ROI of mitigation.' }
    ],
    chips: ['Claims', 'Pricing & Underwriting', 'Technology'],
    status: 'active',
    offerType: 'special-offer',
    region: 'us',
    category: 'claims',
  },
]


