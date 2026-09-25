import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for submitted contact messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const contactMessages: ContactMessage[] = [];

// API Route: Health Check
app.get("/api/health", (req, res) => {
  return res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Route: Submit Contact Form
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields (name, email, message).",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const newMessage: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: String(name).trim(),
      email: cleanEmail,
      company: company ? String(company).trim() : "",
      subject: subject ? String(subject).trim() : "New Portfolio Inquiry",
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);
    console.log("📩 New contact form submission received for marktingwithumair@gmail.com:", newMessage);

    return res.json({
      success: true,
      message: `Thank you, ${newMessage.name}! Your inquiry has been received. Umair will get back to you shortly.`,
      messageId: newMessage.id,
      submission: newMessage,
    });
  } catch (error: any) {
    console.error("Error handling contact submission:", error);
    return res.status(500).json({ success: false, error: "Failed to process message." });
  }
});

// API Route: Retrieve Contact Messages (For Verification)
app.get("/api/messages", (req, res) => {
  return res.json({
    success: true,
    total: contactMessages.length,
    messages: contactMessages,
  });
});

// API Route: AI Growth & Performance Audit powered by Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Generate tailored fallback audit customized to the store parameters
function generateTailoredAudit(params: {
  storeName?: string;
  storeCategory?: string;
  currentMonthlySpend?: string;
  currentROAS?: string;
  goal?: string;
}) {
  const brand = params.storeName?.trim() || "Your E-Commerce Store";
  const category = params.storeCategory?.trim() || "Beauty & Lifestyle";
  const spend = params.currentMonthlySpend?.trim() || "$2,000";
  const roasNum = parseFloat((params.currentROAS || "").replace(/[^0-9.]/g, "")) || 2.2;
  const targetROAS = (roasNum * 2.1).toFixed(1);
  const targetROASHigh = (roasNum * 2.8).toFixed(1);

  return {
    projectedROAS: `${targetROAS}x - ${targetROASHigh}x`,
    estimatedRevenueLift: `+${Math.min(320, Math.max(120, Math.round(roasNum * 65)))}% Revenue Growth`,
    quickWins: [
      `Deploy Broad Targeting + Dynamic Creative Testing (DCT) on Meta Ads specifically tailored for ${category} to decrease blended CAC by 28-35%.`,
      `Implement Meta Conversion API (CAPI) server-side event deduplication with Shopify to reclaim 20-30% untracked iOS purchase signals.`,
      `Scale high-velocity Meta Reels video hooks and dynamic creative combinations focusing on 3-second visual problem-solution proof to drive cheap engaged top-of-funnel traffic.`,
      `Structure an AOV expansion funnel on Shopify (post-purchase 1-click upsells & tiered bundle discounts) targeting customers above your current ${spend}/mo volume.`
    ],
    recommendedStrategy: `For ${brand} in the ${category} vertical, Umair Zafar recommends establishing a consolidated 3-tier campaign architecture: Broad Advantage+ shopping with dynamic creative testing (70% budget), Meta Reels & video ads for cold acquisition (20% budget), and hyper-targeted retention/CAPI retargeting (10% budget) to reach the ${params.goal || "target scaling goal"} profitably.`
  };
}

app.post("/api/ai-audit", async (req, res) => {
  try {
    const { storeName, storeCategory, currentMonthlySpend, currentROAS, goal } = req.body || {};

    const defaultAudit = generateTailoredAudit({
      storeName,
      storeCategory,
      currentMonthlySpend,
      currentROAS,
      goal,
    });

    const ai = getGeminiClient();
    if (!ai) {
      console.log("Notice: GEMINI_API_KEY is not configured in environment. Returning personalized expert audit.");
      return res.json({ success: true, audit: defaultAudit });
    }

    try {
      const prompt = `You are Umair Zafar, a world-class Performance Marketing Specialist and Meta Ads expert who scaled brands to 7.81x ROAS.
A prospective e-commerce store has requested an instant diagnostic audit:
- Store/Brand Name: ${storeName || "E-Commerce Brand"}
- Niche/Category: ${storeCategory || "Beauty & Lifestyle"}
- Current Monthly Ad Spend: ${currentMonthlySpend || "$2,000"}
- Current ROAS: ${currentROAS || "2.2x"}
- Growth Goal: ${goal || "Scale to 5x+ ROAS profitably"}

Provide a sharp, data-driven 4-point growth audit & action plan.
Format your response as valid JSON matching this exact structure:
{
  "projectedROAS": "e.g. 5.2x - 7.5x",
  "estimatedRevenueLift": "e.g. +165% Growth",
  "quickWins": [
    "Winning creative testing & hook recommendation for Meta Ads (FB & IG)",
    "Conversion API (CAPI) & Pixel setup recommendation to capture lost attribution",
    "Funnel offer & retargeting audience segment tactic for this niche",
    "AOV expansion or post-purchase bundle idea for Shopify"
  ],
  "recommendedStrategy": "A 2-3 sentence strategic blueprint detailing how Umair Zafar will achieve this growth."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are Umair Zafar, an elite Performance Marketing Specialist. Output strict JSON with projectedROAS, estimatedRevenueLift, quickWins (array of exactly 4 strings), and recommendedStrategy.",
          responseMimeType: "application/json",
        },
      });

      const rawText = (response.text || "").trim();
      let auditData = defaultAudit;

      if (rawText) {
        try {
          const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
          const parsed = JSON.parse(cleanedText);
          if (
            parsed.projectedROAS &&
            parsed.estimatedRevenueLift &&
            Array.isArray(parsed.quickWins) &&
            parsed.quickWins.length > 0 &&
            parsed.recommendedStrategy
          ) {
            auditData = parsed;
          }
        } catch (parseErr) {
          console.warn("Notice: Gemini output JSON parse fallback:", parseErr);
        }
      }

      return res.json({ success: true, audit: auditData });
    } catch (geminiError: any) {
      console.warn("Gemini API call encountered an issue, falling back to personalized audit engine:", geminiError?.message || geminiError);
      return res.json({ success: true, audit: defaultAudit });
    }
  } catch (err: any) {
    console.error("Critical error in /api/ai-audit:", err);
    // Even in case of unexpected input error, always return a success response with tailored audit
    return res.json({
      success: true,
      audit: generateTailoredAudit(req.body || {}),
    });
  }
});

// API Route: Client Dashboard Authentication
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Please enter email and password" });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    // Demo account authentication for live campaign metrics dashboard testing
    if (cleanEmail === "client@beautybrand.com" && cleanPassword === "demo123") {
      return res.json({
        success: true,
        token: "demo_jwt_token_umaizafar_2026",
        client: {
          id: "c_101",
          name: "Glow & Charm Beauty",
          contactPerson: "Sarah Al-Maktoum",
          email: "client@beautybrand.com",
          activeCampaigns: 4,
          totalSpendAED: 2066.17,
          totalRevenueAED: 15960.00,
          currentROAS: 7.81,
          status: "Active",
        },
      });
    }

    // Allow custom login for instant client testing
    return res.json({
      success: true,
      token: `auth_token_${Date.now()}`,
      client: {
        id: `c_${Date.now()}`,
        name: cleanEmail.split("@")[0].toUpperCase() + " Brand",
        contactPerson: "Client",
        email: cleanEmail,
        activeCampaigns: 3,
        totalSpendAED: 1850.00,
        totalRevenueAED: 12400.00,
        currentROAS: 6.7,
        status: "Active",
      },
    });
  } catch (err: any) {
    console.error("Error in login endpoint:", err);
    return res.status(500).json({ success: false, error: "Internal authentication error" });
  }
});

// API Route: Client Live Campaign Metrics
app.get("/api/client-metrics", (req, res) => {
  return res.json({
    success: true,
    metrics: {
      accountName: "Glow & Charm Beauty - Meta Ads Growth",
      currency: "AED",
      summary: {
        totalSpend: 2066.17,
        totalRevenue: 15960.00,
        roas: 7.81,
        purchases: 228,
        cpa: 9.06,
        impressions: 454062,
        reach: 313430,
        ctr: 2.76,
        cpc: 0.16,
        aov: 70.00,
      },
      dailyPerformance: [
        { day: "Day 1", spend: 180, revenue: 1120, roas: 6.22 },
        { day: "Day 2", spend: 220, revenue: 1650, roas: 7.50 },
        { day: "Day 3", spend: 290, revenue: 2280, roas: 7.86 },
        { day: "Day 4", spend: 310, revenue: 2450, roas: 7.90 },
        { day: "Day 5", spend: 340, revenue: 2710, roas: 7.97 },
        { day: "Day 6", spend: 360, revenue: 2820, roas: 7.83 },
        { day: "Day 7", spend: 366.17, revenue: 2930, roas: 8.00 },
      ],
      campaigns: [
        {
          name: "Beauty_CAPI_Broad_Conversion_V2",
          platform: "Meta Ads",
          budget: "AED 150/day",
          status: "ACTIVE",
          spend: 1240.50,
          revenue: 10110.00,
          roas: "8.15x",
          purchases: 144,
        },
        {
          name: "Advantage_Plus_Shopping_Campaign_ASC",
          platform: "Meta Ads",
          budget: "AED 80/day",
          status: "ACTIVE",
          spend: 510.00,
          revenue: 3780.00,
          roas: "7.41x",
          purchases: 54,
        },
        {
          name: "Shopify_LAL_Lookalike_Purchasers_3%",
          platform: "Meta Ads",
          budget: "AED 60/day",
          status: "ACTIVE",
          spend: 315.67,
          revenue: 2070.00,
          roas: "6.55x",
          purchases: 30,
        },
      ],
    },
  });
});

// Unhandled API routes fallback (404 for API requests)
app.all("/api/*", (req, res) => {
  return res.status(404).json({
    success: false,
    error: `API route ${req.method} ${req.path} not found.`,
  });
});

// Global Express error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    return res.status(400).json({ success: false, error: "Invalid JSON body format." });
  }
  console.error("Unhandled server error:", err);
  return res.status(500).json({ success: false, error: "Internal server error." });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Umair Zafar Portfolio Express Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

