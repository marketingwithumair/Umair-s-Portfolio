export type ThemeMode = 'light' | 'dark';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
  features: string[];
  '3dType': 'meta' | 'tiktok' | 'shopify' | 'leads' | 'analytics' | 'pixel' | 'capi' | 'cro' | 'creative' | 'audit';
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  brand: string;
  industry: string;
  platform: string;
  campaignType: string;
  objective: string;
  confidentialityNotice: string;
  summaryMetrics: CaseStudyMetric[];
  allMetrics: {
    adSpend: string;
    revenue: string;
    purchases: number;
    roas: string;
    cpa: string;
    reach: string;
    impressions: string;
    ctr: string;
    cpc: string;
    cpm: string;
    aov: string;
  };
  chartData: {
    day: string;
    adSpend: number;
    revenue: number;
    roas: number;
  }[];
  challenge: string[];
  strategy: string[];
  role: string[];
  results: string[];
  businessImpact: string[];
  keyTakeaways: string[];
}

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  responsibilities: string[];
  achievements: string[];
  tags: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: number; // percentage 0-100
    badgeText?: string;
  }[];
}

export interface ClientUser {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  activeCampaigns: number;
  totalSpendAED: number;
  totalRevenueAED: number;
  currentROAS: number;
  status: string;
}

export interface AIAuditResult {
  projectedROAS: string;
  estimatedRevenueLift: string;
  quickWins: string[];
  recommendedStrategy: string;
}
