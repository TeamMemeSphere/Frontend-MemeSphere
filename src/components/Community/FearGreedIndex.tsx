import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface FearGreedData {
  value: number;
  value_classification: string;
  update_time: string;
}

const FearGreedIndex: React.FC = () => {
  const [indexData, setIndexData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFearGreedIndex = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v3/fear-and-greed/latest", {
          headers: {
            "X-CMC_PRO_API_KEY": import.meta.env.VITE_CMC_API_KEY,
          },
        });
        setIndexData(response.data.data);
      } catch (err) {
        console.error("API 요청 중 오류 발생:", err);
        setError("데이터를 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFearGreedIndex();
  }, []);

  if (loading) return <p>데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <FGIDiv>
      <FGIText>공포탐욕지수</FGIText>
      <FGIndex>{indexData?.value}</FGIndex>
    </FGIDiv>
  );
};

export default FearGreedIndex;

const FGIDiv = styled.div`
  display: flex;
  width: 100%;
  height: 3.875rem;
  padding: 7.5rem 0rem 1.75rem 0rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.438rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: var(--Secondary-green, #49df82);
  margin-top: 0;

  @media (max-width: 768px) {
    height: 1rem;
    padding: 5rem 0rem 1.7rem 0rem;
  }
`;

const FGIText = styled.p`
  color: var(--background-black, #161616);
  font-family: Pretendard;
  font-size: 0.94rem;
  font-weight: 400;
  margin: 0;
  margin-left: 2.5vw;
  @media (max-width: 768px) {
    margin-left: 3vw;
  }
`;

const FGIndex = styled.p`
  color: var(--background-black, #161616);
  font-family: Pretendard;
  font-size: 1.47rem;
  font-weight: 700;
  margin: 0;
  margin-left: 2.5vw;
`;
