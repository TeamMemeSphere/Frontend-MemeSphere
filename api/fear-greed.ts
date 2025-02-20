// /api/fear-greed.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const API_KEY = process.env.CMC_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: "❌ API 키가 설정되지 않았습니다." });
    }

    const { data } = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", // ✅ API 엔드포인트 수정
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("API 요청 실패:", error);
    res.status(500).json({ error: "API 요청 실패", details: error });
  }
}
