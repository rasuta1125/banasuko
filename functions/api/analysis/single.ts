// /functions/api/analysis/single.ts
// Robust implementation to handle field name variations and prevent 400->500 error chain
import OpenAI from "openai";

// Cloudflare Pages Functions Environment interface
interface Env {
  OPENAI_API_KEY: string;
}

// Score result type definition
type ScoreResult = {
  score: number;        // 0-100 integer
  verdict: string;      // Brief comment
  reasons: string[];    // Bullet point reasons
};

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { env, request } = ctx;

  const fail = (status: number, message: string, extra: any = {}) =>
    new Response(JSON.stringify({ success: false, error: message, ...extra }), {
      status,
      headers: corsHeaders(request),
    });

  try {
    let base64: string | null = null;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();

      // Handle field name variations (image, file, banner, upload, image[])
      const candidateKeys = ["image", "file", "banner", "upload", "image[]"];
      let file: File | null = null;
      
      // Try standard field names first
      for (const key of candidateKeys) {
        const v = form.get(key);
        if (v instanceof File && v.size > 0) { 
          file = v; 
          break; 
        }
      }
      
      // If no standard field name found, try any File object
      if (!file) {
        for (const [, v] of form.entries()) {
          if (v instanceof File && v.size > 0) { 
            file = v; 
            break; 
          }
        }
      }
      
      if (!file) {
        return fail(400, "画像ファイルが見つかりませんでした（FormDataで image を送ってください）");
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        return fail(400, `無効なファイル形式: ${file.type}。画像ファイルを送ってください。`);
      }

      const buf = await file.arrayBuffer();
      base64 = toDataUrl(buf, file.type || "image/png");
      
    } else {
      // JSON mode: { imageBase64: "data:image/png;base64,..." } or { image: "..." }
      const body = await safeJson(request);
      base64 = (body?.imageBase64 || body?.image || "") as string;
      if (!base64) {
        return fail(400, "imageBase64 が空です（JSONで imageBase64 を送ってください）");
      }
      if (!base64.startsWith("data:")) {
        base64 = `data:image/png;base64,${base64}`;
      }
    }

    // Validate OpenAI API key
    if (!env.OPENAI_API_KEY) {
      return fail(500, "OPENAI_API_KEY が未設定です");
    }

    const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    // Simplified but effective prompt for banner analysis
    const prompt = `バナー広告を総合評価。JSONのみで返答: {"score":0-100,"verdict":"...","reasons":["..."]}`;

    // Use correct chat.completions multimodal format
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: base64 } },
        ],
      }],
      temperature: 0.2,
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    const json = extractJson(text);
    
    if (!json) {
      return fail(502, "OpenAI応答がJSONではありません", { text });
    }

    const result = {
      score: clampInt(json.score, 0, 100),
      verdict: String(json.verdict ?? ""),
      reasons: Array.isArray(json.reasons) ? json.reasons.map(String) : [],
    };
    
    if (Number.isNaN(result.score)) {
      return fail(502, "score が数値で取得できませんでした", { json });
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: corsHeaders(request),
    });
    
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e?.message || "server error" }), {
      status: 500,
      headers: corsHeaders(request),
    });
  }
};

// Handle CORS preflight requests
export const onRequestOptions: PagesFunction = async ({ request }) =>
  new Response(null, { status: 204, headers: corsHeaders(request) });

// --- Utility Functions ---

const corsHeaders = (req: Request) => ({
  "Access-Control-Allow-Origin": req.headers.get("Origin") ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Vary": "Origin",
  "Content-Type": "application/json",
});

const safeJson = async (req: Request) => { 
  try { 
    return await req.json(); 
  } catch { 
    return null; 
  } 
};

const toDataUrl = (buf: ArrayBuffer, mime: string) =>
  `data:${mime};base64,` + btoa(String.fromCharCode(...new Uint8Array(buf)));

const extractJson = (text: string) => {
  const s = text.indexOf("{"), e = text.lastIndexOf("}");
  if (s === -1 || e === -1 || e <= s) return null;
  try { 
    return JSON.parse(text.slice(s, e + 1)); 
  } catch { 
    return null; 
  }
};

const clampInt = (n: any, min: number, max: number) => {
  const v = Math.round(Number(n));
  if (Number.isNaN(v)) return NaN;
  return Math.min(max, Math.max(min, v));
};