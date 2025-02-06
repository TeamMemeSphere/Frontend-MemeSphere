import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../../api/api";

export interface MemeCoin {
  rank: number; 
  rankChange: "RISE" | "LOW" | "EVEN";

  coinId: number;
  image: string;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  changeAbsolute: number;
  changeDirection: "up" | "down" | "zero";
  changeRate: number | null;
}

export const useTrendList = () => {
  const [trendList, setTrendList] = useState<MemeCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendList = async () => {
      try {
        const response = await axios.get<{ result: { trendList: MemeCoin[] } }>(API_ENDPOINTS.DASHBOARD_TREND);

        if (response.data.result?.trendList) {
          const rankedList = response.data.result.trendList.slice(0, 5).map((coin, index) => ({
            ...coin,
            rank: index + 1,
            rankChange: Math.random() > 0.5 ? "RISE" : "LOW" as const, // 수정
          }));
          setTrendList(rankedList);
        } else {
          console.error("트렌드 api 오류:", response.data);
        }
      } catch (error) {
        setError("데이터를 불러오는 중 오류 발생");
        console.error("트렌드 API 요청 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendList();
  }, []);

  return { trendList, loading, error };
};
