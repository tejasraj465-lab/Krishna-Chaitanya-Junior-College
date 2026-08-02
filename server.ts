import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { buildAiSystemPrompt, generateFallbackReply } from "./src/data/aiKnowledgeBase";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize Gemini API if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.warn("Gemini API client initialization deferred or failed:", e);
    }
  }

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", college: "Krishna Chaitanya Junior College" });
  });

  // AI Campus Guide Endpoint
  app.post("/api/ai-guide", async (req, res) => {
    const { message, history } = req.body || {};
    
    if (!message) {
      res.status(400).json({ error: "Message parameter is required" });
      return;
    }

    const systemPrompt = buildAiSystemPrompt();

    if (ai) {
      try {
        const historyContext = Array.isArray(history)
          ? history
              .slice(-6)
              .map((m: { sender?: string; text?: string }) =>
                `${m.sender === "user" ? "User" : "Assistant"}: ${m.text || ""}`
              )
              .join("\n")
          : "";

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\n${historyContext ? `Recent conversation:\n${historyContext}\n\n` : ""}User Question: ${message}`,
                },
              ],
            },
          ],
        });

        const reply = response.text || generateFallbackReply(String(message));
        res.json({ reply });
        return;
      } catch (error) {
        console.error("Gemini API Error in AI Guide:", error);
      }
    }

    res.json({ reply: generateFallbackReply(String(message)) });
  });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const publicPath = path.join(process.cwd(), "public");
    app.use(express.static(publicPath));
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof SyntaxError && "body" in (err as SyntaxError & { body?: unknown })) {
      res.status(400).json({ success: false, error: "Invalid request body." });
      return;
    }

    console.error("Unhandled server error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n==================================================`);
    console.log(`  Krishna Chaitanya Educational Institutions Server`);
    console.log(`--------------------------------------------------`);
    console.log(`  Local Browser Access: http://localhost:${PORT}`);
    console.log(`  Loopback IP Access:   http://127.0.0.1:${PORT}`);
    console.log(`  Bound IP (Network):   http://0.0.0.0:${PORT}`);
    console.log(`==================================================\n`);
  });
}

startServer();
