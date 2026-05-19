import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gemini Initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/budget/parse", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Sen bir Japonya seyahat bütçe asistanısın. Kullanıcının girdiği harcama tanımını analiz et ve JSON formatında döndür.
      
      Kategoriler:
      - 'fixed': Konaklama, uçak bileti, kargo gibi ana sabit giderler.
      - 'activity': Müze, USJ, Shinkansen, ulaşım kartı yükleme (Suica vb.) gibi etkinlik giderleri.
      - 'spending': Yemek, market, hediyelik eşya gibi günlük harcamalar. (Varsayılan seçim budur)
      
      Kurallar:
      1. Para Birimi: 'JPY' veya 'TL' seç. Eğer 'yen' veya '¥' geçiyorsa JPY, 'tl' veya '₺' geçiyorsa TL seç. Belirtilmemişse; 500, 2000 gibi değerler JPY'dir, ama 10000+ değerler TL olabilir (uçak vs). Akıllı tahmin yap.
      2. Miktar: Sadece sayısal değer döndür.
      3. Tarih: 'YYYY-MM-DD' formatında döndür. 'Bugün' derse ${new Date().toISOString().split('T')[0]}, 'Dün' derse ${new Date(Date.now() - 86400000).toISOString().split('T')[0]} yap. '25 Mayıs' derse 2026-05-25 yap. Belirtilmemişse bugünü kullan.
      
      Kullanıcı Girişi: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            amount: { type: Type.NUMBER },
            currency: { type: Type.STRING, enum: ["JPY", "TL"] },
            category: { type: Type.STRING, enum: ["fixed", "activity", "spending"] },
            date: { type: Type.STRING }
          },
          required: ["description", "amount", "currency", "category", "date"]
        }
      }
    });

    const result = JSON.parse(response.text);
    res.json(result);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to parse expense" });
  }
});

// Vite Middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
