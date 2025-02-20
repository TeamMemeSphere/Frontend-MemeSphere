import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { data } = await axios.get(
      "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API 요청 실패" });
  }
}

