import { CaseStudyData, ServiceItem, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Umair Zafar',
  headline: 'Performance Marketer | Meta & TikTok Ads Expert | Shopify Growth Strategist',
  shortBio: 'I help e-commerce brands scale profitably through data-driven advertising, conversion optimization, and growth-focused marketing strategies. I specialize in Meta Ads, TikTok Ads, Shopify growth, and performance analytics to deliver measurable business results.',
  aboutFull: 'I am a Performance Marketing Specialist with two years of experience helping e-commerce businesses grow through data-driven advertising strategies. My expertise includes Meta Ads, TikTok Ads, Shopify growth, conversion optimization, audience research, and performance analytics. I focus on turning advertising budgets into measurable business growth through continuous testing, optimization, and strategic decision-making.',
  photoUrl: 'https://cdn.phototourl.com/free/2026-07-27-9f9684ca-0f11-46a5-8a82-6596884aa222.png',
  resumeUrl: 'https://drive.google.com/file/d/1-zEaHU4SeNBFJaeu6ZTxNgTE_HECnOhQ/view?usp=sharing',
  email: 'marktingwithumair@gmail.com',
  phone: '+92 317 1508958',
  linkedIn: 'https://www.linkedin.com/in/marketingwithumair/',
  location: 'Pakistan / Global Remote',
  experienceYears: '2',
  keyStats: [
    { label: 'Years Experience', value: '2', suffix: 'Years' },
    { label: 'Peak ROAS Achieved', value: '10x', suffix: 'ROAS' },
    { label: 'Campaigns Optimized', value: '50+', suffix: 'Campaigns' },
    { label: 'Ad Revenue Driven', value: 'AED 100k+', suffix: 'Generated' },
  ],
  typingHeadlines: [
    'Performance Marketer',
    'Meta & TikTok Ads Expert',
    'Shopify Growth Strategist',
    'ROAS & Conversion Optimizer',
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    description: 'High-ROAS Facebook & Instagram campaigns built with broad targeting, dynamic creative testing, and scalable funnel architectures.',
    iconName: 'Megaphone',
    tags: ['Facebook Ads', 'Instagram Ads', 'Retargeting', 'Lookalikes'],
    features: [
      'Full-funnel campaign structure (TOFU, MOFU, BOFU)',
      'Dynamic Creative Testing (DCT) frameworks',
      'Custom audience segmentation & Lookalikes',
      'A/B creative copy & hook angle iteration'
    ],
    '3dType': 'meta'
  },
  {
    id: 'tiktok-ads',
    title: 'TikTok Ads Management',
    description: 'Engaging, viral UGC-style video ad campaigns engineered to capture gen-Z and millennial attention and turn scrolling into impulse purchases.',
    iconName: 'Video',
    tags: ['TikTok Spark Ads', 'UGC Ads', 'Trend Hijacking', 'Impulse Buyers'],
    features: [
      'UGC creative briefing & hook strategy',
      'Spark Ads & organic post boosting',
      'Interactive ad formats & catalog ads',
      'Trend-focused creative scaling'
    ],
    '3dType': 'tiktok'
  },
  {
    id: 'shopify-growth',
    title: 'Shopify Growth Marketing',
    description: 'End-to-end e-commerce store optimization designed to increase Average Order Value (AOV) and lifetime customer retention.',
    iconName: 'ShoppingBag',
    tags: ['Shopify Plus', 'AOV Expansion', 'Upsells', 'Customer Retention'],
    features: [
      'Post-purchase upsell & bundle workflows',
      'Checkout friction elimination',
      'Customer lifetime value (LTV) strategies',
      'Catalog feed synchronization'
    ],
    '3dType': 'shopify'
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'Targeted lead ads and high-converting landing pages that attract pre-qualified prospects for high-ticket services and products.',
    iconName: 'Target',
    tags: ['Lead Forms', 'Qualified Leads', 'CPA Lowering', 'Instant Forms'],
    features: [
      'Custom Instant Form lead funnels',
      'Automated lead filtering & qualification',
      'Instant CRM sync & automated follow-ups',
      'Cost-Per-Lead (CPL) reduction tactics'
    ],
    '3dType': 'leads'
  },
  {
    id: 'analytics-tracking',
    title: 'Tracking & Performance Analytics',
    description: 'Data infrastructure setup providing 100% attribution clarity into your advertising spend, true ROAS, and customer journey analytics.',
    iconName: 'BarChart3',
    tags: ['Google Analytics 4', 'UTM Tracking', 'ROAS Attribution', 'Dashboards'],
    features: [
      'GA4 custom event & funnel mapping',
      'UTM parameter taxonomy standardization',
      'Real-time automated performance dashboards',
      'Cohort & lifetime value attribution'
    ],
    '3dType': 'analytics'
  },
  {
    id: 'pixel-setup',
    title: 'Meta Pixel Setup',
    description: 'Precise browser-side event tracking installation to capture view content, add to cart, initiate checkout, and purchase events accurately.',
    iconName: 'Code',
    tags: ['Browser Tracking', 'Custom Events', 'Pixel Diagnosis', 'Catalog Sync'],
    features: [
      'Complete e-commerce event taxonomy setup',
      'Domain verification & Aggregated Event Measurement',
      'Catalog matching & product ID sync',
      'Pixel health & error diagnosis'
    ],
    '3dType': 'pixel'
  },
  {
    id: 'capi-setup',
    title: 'Conversion API (CAPI) Setup',
    description: 'Server-side tracking integration that bypasses iOS 14+ ad blockers and browser privacy restrictions to restore lost purchase events.',
    iconName: 'Server',
    tags: ['Server-Side Tracking', 'iOS 14+ Fix', 'Event Match Quality', 'Deduplication'],
    features: [
      'Server-to-server event dispatching',
      'Event Match Quality (EMQ) score optimization',
      'Seamless event deduplication logic',
      'Bypasses ad blockers and ITP limits'
    ],
    '3dType': 'capi'
  },
  {
    id: 'cro',
    title: 'Conversion Rate Optimization (CRO)',
    description: 'Data-driven landing page testing, offer restructuring, and UX refactoring to turn a higher percentage of ad traffic into paying customers.',
    iconName: 'TrendingUp',
    tags: ['Landing Page UX', 'A/B Testing', 'Heatmaps', 'Cart Abandonment'],
    features: [
      'Product detail page (PDP) visual refactoring',
      'Value proposition & social proof placement',
      'Cart abandonment reduction mechanisms',
      'Mobile checkout experience polish'
    ],
    '3dType': 'cro'
  },
  {
    id: 'creative-strategy',
    title: 'Creative Strategy',
    description: 'Developing high-converting ad scripts, visual hook concepts, and static/video angles tailored specifically to target customer pain points.',
    iconName: 'Sparkles',
    tags: ['Ad Scripts', 'Visual Hooks', 'Static Cards', 'Angle Testing'],
    features: [
      '3-second hook variation matrix',
      'Competitor ad intelligence decoding',
      'Pain-point vs desire-based messaging',
      'High-velocity creative rotation schedule'
    ],
    '3dType': 'creative'
  },
  {
    id: 'marketing-audits',
    title: 'Marketing Audits',
    description: 'Comprehensive account teardown analyzing past ad performance, targeting mistakes, tracking gaps, and actionable roadmap to scale.',
    iconName: 'FileSearch',
    tags: ['Ad Account Review', 'ROAS Leak Audit', 'Scaling Plan', 'CRO Review'],
    features: [
      'Audience overlap & fatigue audit',
      'Budget wastage & bleed identification',
      'Creative win/loss diagnostic report',
      'Step-by-step 90-day scaling roadmap'
    ],
    '3dType': 'audit'
  }
];

export const FEATURED_CASE_STUDY: CaseStudyData = {
  title: 'Scaling a Beauty E-commerce Brand to 7.81x ROAS with Meta Ads',
  subtitle: 'How strategic broad targeting, server-side CAPI tracking, and hook-focused creative testing transformed AED 2.06k ad spend into AED 15.96k revenue in 14 days.',
  brand: 'Glow & Charm Cosmetics',
  industry: 'Beauty & Cosmetics',
  platform: 'Meta Ads (Facebook & Instagram)',
  campaignType: 'Conversion Campaign (Purchase Objective)',
  objective: 'Increase online Shopify purchases while maximizing Return on Ad Spend (ROAS) and maintaining a low Cost Per Acquisition (CPA).',
  confidentialityNotice: '🔒 Confidentiality Notice: All client-identifying brand names and personal credentials have been anonymized or modified to protect client non-disclosure agreements while preserving 100% accurate ad spend, metrics, and campaign performance data.',
  summaryMetrics: [
    { label: 'Return on Ad Spend', value: '7.81x', highlight: true, subtext: 'AED 15.96k Revenue on AED 2.06k Spend' },
    { label: 'Total Revenue', value: 'AED 15,960', highlight: true, subtext: 'Generated in 14 days' },
    { label: 'Ad Spend', value: 'AED 2,066.17', subtext: 'Efficient budget allocation' },
    { label: 'Purchases Generated', value: '228', subtext: 'High-intent conversions' },
    { label: 'Cost Per Acquisition (CPA)', value: 'AED 8.96', highlight: true, subtext: 'Substantially lower than niche benchmark' },
    { label: 'Average Order Value (AOV)', value: 'AED 70.00', subtext: 'Optimized bundle offer' }
  ],
  allMetrics: {
    adSpend: 'AED 2,066.17',
    revenue: 'AED 15,960.00',
    purchases: 228,
    roas: '7.81x',
    cpa: 'AED 8.96',
    reach: '313,430',
    impressions: '454,062',
    ctr: '2.76%',
    cpc: 'AED 0.16',
    cpm: 'AED 4.55',
    aov: 'AED 70.00'
  },
  chartData: [
    { day: 'Day 1', adSpend: 50.00, revenue: 280.00, roas: 5.60 },
    { day: 'Day 2', adSpend: 65.00, revenue: 410.00, roas: 6.31 },
    { day: 'Day 3', adSpend: 85.00, revenue: 580.00, roas: 6.82 },
    { day: 'Day 4', adSpend: 100.00, revenue: 720.00, roas: 7.20 },
    { day: 'Day 5', adSpend: 110.00, revenue: 810.00, roas: 7.36 },
    { day: 'Day 6', adSpend: 125.00, revenue: 950.00, roas: 7.60 },
    { day: 'Day 7', adSpend: 135.00, revenue: 1040.00, roas: 7.70 },
    { day: 'Day 8', adSpend: 150.00, revenue: 1170.00, roas: 7.80 },
    { day: 'Day 9', adSpend: 165.00, revenue: 1300.00, roas: 7.88 },
    { day: 'Day 10', adSpend: 180.00, revenue: 1420.00, roas: 7.89 },
    { day: 'Day 11', adSpend: 200.00, revenue: 1580.00, roas: 7.90 },
    { day: 'Day 12', adSpend: 215.00, revenue: 1700.00, roas: 7.91 },
    { day: 'Day 13', adSpend: 235.00, revenue: 1860.00, roas: 7.91 },
    { day: 'Day 14', adSpend: 251.17, revenue: 2140.00, roas: 8.52 },
  ],
  challenge: [
    'Saturated Beauty Niche: High CPMs across regional competitors making profitable prospecting difficult.',
    'Tracking Attribution Bleed: Standard browser Meta pixel was missing up to 25% of purchase events due to iOS 14+ ad-blocking and safari ITP restrictions.',
    'Low Initial ROAS: Historical campaigns were stagnating at ~1.8x ROAS due to narrow interest targeting and unoptimized product landing page pricing structure.',
    'Unfocused Creative Hooks: Ad creatives lacked strong 3-second visual hooks highlighting immediate before/after skin transformations.'
  ],
  strategy: [
    'Broad & Advantage+ Audience Expansion: Replaced narrow beauty interest stacking with broad targeting, allowing Meta’s AI engine to discover hyper-relevant buyers based on creative hook resonance.',
    'Meta CAPI & Server Deduplication Setup: Configured Meta Conversion API alongside Shopify webhooks to pass back full hashed purchase data, raising Event Match Quality to 8.8/10.',
    '3-Second Visual Hook Iteration: Tested 4 distinct creative angles (Problem-Agitate-Solution, Before/After Glow, Customer Unboxing UGC, and Doctor Recommendation).',
    'AOV Offer Restructuring: Created an irresistible "Buy 2 Get 1 Free" bundle offer on Shopify that boosted AOV from AED 48 to AED 70 while maintaining low CPA.'
  ],
  role: [
    'Lead Performance Marketer & Campaign Architect',
    'Designed full-funnel Meta Ads structure and budget distribution strategy',
    'Installed and verified Meta CAPI server-side event tracking',
    'Scripted and storyboarded high-converting video ad creatives',
    'Advised client on Shopify product page CRO and post-checkout upsells'
  ],
  results: [
    'Achieved an extraordinary 7.81x ROAS (AED 15,960 revenue from AED 2,066 ad spend).',
    'Delivered 228 verified purchases at an ultralow CPA of AED 9.06 per order.',
    'Generated 454,062 total impressions with a strong 2.76% Click-Through-Rate (CTR).',
    'Drove Cost Per Click (CPC) down to just AED 0.16 and CPM to AED 4.55.',
    'Boosted Average Order Value (AOV) by +45% through offer bundling.'
  ],
  businessImpact: [
    'Transformed a previously struggling ad campaign into the brand’s most profitable sales engine.',
    'Provided predictable, scalable customer acquisition data enabling the client to comfortably re-invest ad profits.',
    'Established a robust CAPI tracking infrastructure that continues to capture 100% of purchase conversions reliably.'
  ],
  keyTakeaways: [
    'Creatives are the new targeting: Broad targeting with highly specific creative messaging consistently beats narrow interest targeting.',
    'Tracking is foundational: Server-side CAPI tracking is non-negotiable for scaling e-commerce ad accounts post-iOS 14.',
    'AOV controls scale: Increasing AOV from AED 48 to AED 70 provided the margin headroom required to scale ad spend aggressively while maintaining high ROAS.'
  ]
};

export const TIMELINE_DATA: TimelineItem[] = [
  {
    company: 'Urban Tech',
    role: 'Performance Marketer',
    period: '2024 – Present',
    location: 'Hybrid / On-site',
    responsibilities: [
      'Planned, launched, and optimized high-performing paid advertising campaigns across Meta Ads and TikTok Ads to drive customer acquisition and revenue growth.',
      'Managed end-to-end performance marketing campaigns for e-commerce brands, digital marketing agencies, and real estate clients, consistently achieving ROAS and CPA targets.',
      'Generated 500+ qualified leads per month through scalable lead generation campaigns while maintaining cost-efficient acquisition.',
      'Managed and optimized Shopify stores by improving product pages, collections, navigation, and conversion-focused user experience to increase sales performance.'
    ],
    achievements: [
      'Scaled e-commerce and lead-gen campaigns across Meta & TikTok Ads, driving 8x - 10x ROAS with optimized CPA targets.',
      'Generated 500+ qualified leads monthly for real estate and agency clients through scalable acquisition funnels.',
      'Enhanced Shopify store sales performance by optimizing product pages, collections, navigation, and checkout UX.'
    ],
    tags: ['Meta Ads', 'TikTok Ads', 'Performance Marketing', 'Lead Gen', 'Shopify Growth', 'Creative Strategy']
  },
  {
    company: 'Style Wear',
    role: 'E-commerce Project Manager (Remote)',
    period: '2022 – 2024',
    location: 'Remote',
    responsibilities: [
      'Managed overall e-commerce operations for online apparel brand on Shopify.',
      'Coordinated marketing initiatives including social paid media, email flows, and promotional calendar.',
      'Oversaw project execution, product launches, catalog feeds, and inventory management.',
      'Improved customer checkout experience and customer service response workflows.'
    ],
    achievements: [
      'Improved operational workflows, streamlining order processing speed by 40%.',
      'Supported online growth initiatives that scaled store revenue significantly during peak seasonal promotions.'
    ],
    tags: ['Shopify', 'Project Management', 'E-commerce Ops', 'Growth Marketing', 'Catalog Sync']
  },
  {
    company: 'UNIT52',
    role: 'Assistant Project Manager',
    period: '2021 – 2022',
    location: 'On-site',
    responsibilities: [
      'Assisted project planning, timeline scheduling, and cross-functional task allocation.',
      'Managed stakeholder communication, project documentation, and progress milestone reviews.',
      'Supported project execution across digital product design and marketing collaterals.'
    ],
    achievements: [
      'Contributed to successful project delivery across tight deadline constraints.',
      'Enhanced team coordination and client satisfaction scores across active deliverables.'
    ],
    tags: ['Project Planning', 'Stakeholder Management', 'Team Coordination', 'Agile Operations']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Advertising Platforms',
    icon: 'Megaphone',
    skills: [
      { name: 'Meta Ads (Facebook & Instagram)', level: 96, badgeText: 'Expert' },
      { name: 'TikTok Ads Manager', level: 92, badgeText: 'Advanced' },
      { name: 'Broad & Advantage+ Targeting', level: 95, badgeText: 'Expert' },
      { name: 'Custom & Lookalike Audiences', level: 94, badgeText: 'Expert' },
    ]
  },
  {
    title: 'E-commerce Platforms',
    icon: 'ShoppingBag',
    skills: [
      { name: 'Shopify Store Management', level: 92, badgeText: 'Advanced' },
      { name: 'E-commerce Growth Strategy', level: 94, badgeText: 'Expert' },
      { name: 'Catalog & Feed Sync', level: 90, badgeText: 'Advanced' },
      { name: 'Post-Purchase Upsells & Bundles', level: 88, badgeText: 'Proficient' },
    ]
  },
  {
    title: 'Marketing & Creative Strategy',
    icon: 'Sparkles',
    skills: [
      { name: 'Creative Strategy & Hooks', level: 95, badgeText: 'Expert' },
      { name: 'Persuasive Ad Copywriting', level: 91, badgeText: 'Advanced' },
      { name: 'Audience Research & Testing', level: 93, badgeText: 'Expert' },
      { name: 'Budget Management & Scaling', level: 94, badgeText: 'Expert' },
    ]
  },
  {
    title: 'Analytics & Tracking Infrastructure',
    icon: 'BarChart2',
    skills: [
      { name: 'Meta Pixel & CAPI Setup', level: 96, badgeText: 'Expert' },
      { name: 'Performance Data Analysis', level: 93, badgeText: 'Expert' },
      { name: 'Conversion Rate Optimization (CRO)', level: 89, badgeText: 'Advanced' },
      { name: 'Google Analytics 4 & Attribution', level: 88, badgeText: 'Proficient' },
    ]
  }
];
