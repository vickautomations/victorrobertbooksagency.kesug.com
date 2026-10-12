import type { Express, Request, Response } from "express";

type Inquiry = Record<string, unknown>;

const requiredFields = ["name", "email", "bookTitle", "genre", "publishingStatus", "consent"] as const;

function isEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function registerInquiryRoute(app: Express) {
  app.post("/api/inquiry", async (req: Request, res: Response) => {
    const payload = (req.body || {}) as Inquiry;
    const missing = requiredFields.filter(field => !payload[field]);
    if (missing.length > 0 || !isEmail(payload.email)) {
      return res.status(400).json({ message: "Please complete the required fields with a valid email address." });
    }

    if (process.env.INQUIRY_WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "victor-robert-website", receivedAt: new Date().toISOString(), ...payload }),
        });
        if (!webhookResponse.ok) throw new Error(`Webhook returned ${webhookResponse.status}`);
        return res.json({ success: true, message: "Your enquiry has been received. The configured project inbox will review it." });
      } catch (error) {
        console.error("[Inquiry] Configured destination failed:", error);
        return res.status(502).json({ message: "The enquiry destination is temporarily unavailable. Please try again later." });
      }
    }

    return res.status(503).json({ message: "The enquiry form is ready, but its email or CRM destination has not been connected yet." });
  });
}
