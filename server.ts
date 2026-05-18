import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Advisor Route
app.post("/api/ai/recommend", async (req, res) => {
  const { phoneModel, fps, gameStyle } = req.body;

  if (!phoneModel || !fps || !gameStyle) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Proporciona una configuración de sensibilidad óptima para Free Fire basada en los siguientes datos:
        - Celular: ${phoneModel}
        - FPS: ${fps}
        - Estilo de juego: ${gameStyle}
        
        IMPORTANTE: Los valores de sensibilidad (general, redDot, scope2x, scope4x, awm) deben estar en un rango de 0 a 200, ya que Free Fire aumentó el límite recientemente. El DPI suele estar entre 400 y 1200.
        
        La respuesta debe ser puramente JSON con los siguientes campos: general, redDot, scope2x, scope4x, awm, dpi, advice.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            general: { type: Type.INTEGER },
            redDot: { type: Type.INTEGER },
            scope2x: { type: Type.INTEGER },
            scope4x: { type: Type.INTEGER },
            awm: { type: Type.INTEGER },
            dpi: { type: Type.INTEGER },
            advice: { type: Type.STRING }
          },
          required: ["general", "redDot", "scope2x", "scope4x", "awm", "dpi", "advice"]
        }
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
