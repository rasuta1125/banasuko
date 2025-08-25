// Cloudflare Pages Functions (Hono不要版)
// OpenAI v1 SDK
import { OpenAI } from "openai";

export const onRequestPost: PagesFunction = async (context) => {
  const { request, env } = context;

  // --- 環境変数取得（必ず env から） ---
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI service not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // --- OpenAIクライアントはハンドラ内で生成 ---
  const openai = new OpenAI({ apiKey });

  try {
    // 期待する入力: { imageBase64: string, options?: any }
    const body = await request.json();
    const imageBase64 = body?.imageBase64;
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "imageBase64 is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ここは採点プロンプトに合わせて調整可
    const res = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "この広告バナーを評価指標に沿って採点し、点数と理由を短く出力して。" },
            // data URLでも純base64でも可（前者推奨）。純base64なら image_data: imageBase64
            { type: "input_image", image_url: imageBase64 },
          ],
        },
      ],
    });

    const text =
      // v1 SDKの汎用取り出し
      (res as any).output_text ??
      (res as any)?.output?.[0]?.content?.[0]?.text ??
      "";

    return new Response(JSON.stringify({ ok: true, result: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    // Functions Logs で追えるように出力
    console.error("analysis/single error:", err?.stack || err);
    return new Response(
      JSON.stringify({
        error: "internal_error",
        detail: String(err?.message || err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};