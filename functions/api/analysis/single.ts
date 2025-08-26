// /functions/api/analysis/single.ts
// Drop-in replacement with dual support: FormData file uploads + JSON base64
// Enhanced error handling and OpenAI v1 SDK compatibility
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

  // Enhanced error response helper with detailed logging
  const fail = (status: number, message: string, extra: any = {}) => {
    console.error(`[Analysis API Error] Status: ${status}, Message: ${message}`, extra);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: message, 
        timestamp: new Date().toISOString(),
        ...extra 
      }), 
      {
        status,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
      }
    );
  };

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
    });
  }

  try {
    console.log("[Analysis API] Processing request...");

    // 1) Input processing - supports both FormData and JSON formats
    let base64Image: string | null = null;

    const contentType = request.headers.get("content-type") || "";
    console.log(`[Analysis API] Content-Type: ${contentType}`);

    if (contentType.includes("multipart/form-data")) {
      console.log("[Analysis API] Processing FormData upload...");
      const form = await request.formData();
      const file = form.get("image") as File | null;
      
      if (!file) {
        return fail(400, "No image file found in FormData. Please send 'image' field.");
      }

      if (!file.type.startsWith("image/")) {
        return fail(400, `Invalid file type: ${file.type}. Only image files are supported.`);
      }

      console.log(`[Analysis API] File received: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
      
      const buffer = await file.arrayBuffer();
      base64Image = bufferToBase64(buffer, file.type);
      
    } else {
      // JSON mode: { imageBase64: "data:image/png;base64,..." } or { image: "..." }
      console.log("[Analysis API] Processing JSON payload...");
      const body = await safeJsonParse(request);
      
      if (!body) {
        return fail(400, "Invalid JSON payload. Please send valid JSON with imageBase64 field.");
      }

      base64Image = (body?.imageBase64 || body?.image || "") as string;
      
      if (!base64Image) {
        return fail(400, "No image data found. Please send 'imageBase64' field in JSON.");
      }

      // Add data URL prefix if missing
      if (!base64Image.startsWith("data:")) {
        base64Image = `data:image/png;base64,${base64Image}`;
      }
    }

    // Validate base64 image format
    if (!isValidBase64Image(base64Image)) {
      return fail(400, "Invalid image format. Please send a valid base64 encoded image.");
    }

    console.log("[Analysis API] Image processed successfully");

    // 2) OpenAI API Configuration
    if (!env.OPENAI_API_KEY) {
      return fail(500, "OpenAI API key not configured in environment");
    }

    const openai = new OpenAI({ 
      apiKey: env.OPENAI_API_KEY,
      timeout: 30000, // 30 second timeout
    });

    // Use lightweight but capable model for image analysis
    const model = "gpt-4o-mini";

    // Enhanced Japanese prompt for banner analysis
    const analysisPrompt = `あなたはバナー広告の専門評価者です。
与えられた画像を分析し、以下の観点から総合評価してください：
- 訴求力（メッセージの明確さ・魅力度）
- 視認性（色使い・レイアウト・読みやすさ）
- デザイン品質（バランス・統一感・プロフェッショナル度）
- 情報設計（重要度の整理・導線の明確さ）

出力は **必ず** 以下のJSON形式のみで返してください：
{"score": 0-100の整数, "verdict": "一言コメント(30文字以内)", "reasons": ["改善点や良い点を3-5個の箇条書き"]}

例：{"score": 75, "verdict": "訴求力は高いが視認性に改善余地あり", "reasons": ["キャッチコピーが魅力的", "色使いが少し派手すぎる", "フォントサイズをもう少し大きく"]}`;

    console.log("[Analysis API] Calling OpenAI API...");

    // 3) OpenAI API call with robust error handling
    let apiResponse;
    try {
      apiResponse = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: analysisPrompt },
              { type: "image_url", image_url: { url: base64Image } }
            ],
          },
        ],
        max_tokens: 800,
        temperature: 0.3, // More consistent responses
      });
    } catch (openaiError: any) {
      console.error("[Analysis API] OpenAI API Error:", openaiError);
      
      if (openaiError.code === 'rate_limit_exceeded') {
        return fail(429, "API rate limit exceeded. Please try again later.");
      } else if (openaiError.code === 'invalid_api_key') {
        return fail(500, "Invalid OpenAI API key configuration.");
      } else if (openaiError.code === 'model_not_found') {
        return fail(500, "Requested AI model not available.");
      } else {
        return fail(502, "OpenAI API error occurred", { 
          error_type: openaiError.type,
          error_code: openaiError.code,
          error_message: openaiError.message 
        });
      }
    }

    // 4) Response processing and validation
    const responseText = apiResponse.choices?.[0]?.message?.content;
    
    if (!responseText) {
      return fail(502, "No response received from OpenAI", { raw_response: apiResponse });
    }

    console.log("[Analysis API] OpenAI response received:", responseText.substring(0, 200) + "...");

    // 5) JSON extraction with flexible parsing
    const parsedResult = safeExtractAndValidateJson(responseText);
    
    if (!parsedResult.success) {
      return fail(502, "Failed to parse OpenAI response as valid JSON", { 
        response_text: responseText,
        parse_error: parsedResult.error 
      });
    }

    const jsonData = parsedResult.data;

    // 6) Result validation and normalization
    const result: ScoreResult = {
      score: validateAndClampScore(jsonData.score),
      verdict: String(jsonData.verdict || "評価コメントなし").substring(0, 100), // Truncate if too long
      reasons: Array.isArray(jsonData.reasons) 
        ? jsonData.reasons.map(String).filter(Boolean).slice(0, 10) // Max 10 reasons
        : ["詳細な評価理由が取得できませんでした"]
    };

    // Final validation
    if (isNaN(result.score)) {
      return fail(502, "Invalid score value received from analysis", { json_data: jsonData });
    }

    console.log("[Analysis API] Analysis completed successfully", result);

    // 7) Success response with proper CORS headers
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        timestamp: new Date().toISOString(),
        model_used: model
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      }
    );

  } catch (error: any) {
    // 8) Global error handler
    console.error("[Analysis API] Unexpected error:", error);
    return fail(500, "Internal server error occurred", {
      error_message: error?.message,
      error_stack: error?.stack?.substring(0, 500), // Truncate stack trace
      timestamp: new Date().toISOString()
    });
  }
};

// ---- Enhanced Utility Functions ----

/**
 * Convert ArrayBuffer to base64 data URL
 */
function bufferToBase64(buffer: ArrayBuffer, mimeType: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Safely parse JSON from request
 */
async function safeJsonParse(request: Request): Promise<any | null> {
  try {
    const text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("[Analysis API] JSON parse error:", error);
    return null;
  }
}

/**
 * Validate base64 image format
 */
function isValidBase64Image(dataUrl: string): boolean {
  try {
    // Check if it starts with data:image/
    if (!dataUrl.startsWith("data:image/")) return false;
    
    // Extract base64 part
    const base64Part = dataUrl.split(",")[1];
    if (!base64Part) return false;
    
    // Basic base64 validation
    const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
    return base64Pattern.test(base64Part) && base64Part.length > 100; // Minimum size check
  } catch {
    return false;
  }
}

/**
 * Extract and validate JSON from OpenAI response with flexible parsing
 */
function safeExtractAndValidateJson(text: string): { success: boolean; data?: any; error?: string } {
  try {
    // Method 1: Try direct JSON parse
    try {
      const direct = JSON.parse(text);
      if (direct && typeof direct === 'object') {
        return { success: true, data: direct };
      }
    } catch {}

    // Method 2: Extract JSON between first { and last }
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const jsonText = text.slice(firstBrace, lastBrace + 1);
      try {
        const parsed = JSON.parse(jsonText);
        if (parsed && typeof parsed === 'object') {
          return { success: true, data: parsed };
        }
      } catch {}
    }

    // Method 3: Try to extract JSON with regex
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed && typeof parsed === 'object') {
          return { success: true, data: parsed };
        }
      } catch {}
    }

    return { 
      success: false, 
      error: "No valid JSON found in response"
    };
    
  } catch (error) {
    return { 
      success: false, 
      error: `JSON parsing failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

/**
 * Validate and clamp score to 0-100 range
 */
function validateAndClampScore(score: any): number {
  const numScore = Number(score);
  if (isNaN(numScore)) return 0;
  return Math.max(0, Math.min(100, Math.round(numScore)));
}