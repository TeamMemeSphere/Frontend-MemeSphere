import { useEffect, useState } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

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
    console.log("useEffect 실행");

    const fetchFearGreedIndex = async () => {
      try {
        console.log("Try 구문 안");
        setLoading(true);

        // Alternative.me Fear & Greed Index API 사용
        const apiUrl = "https://api.alternative.me/fng/";

        const response = await axios.get(apiUrl);

        console.log("API 응답 데이터: ", response.data);

        // 데이터 변환 (API 구조에 맞게 매핑)
        const latestData = response.data.data[0]; // 최신 데이터 가져오기

        setIndexData({
          value: parseInt(latestData.value),
          value_classification: latestData.value_classification,
          update_time: latestData.timestamp,
        });
      } catch (err) {
        console.error("API 요청 중 오류 발생:", err);
        setError("데이터를 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFearGreedIndex();
  }, []);

  if (loading) return <SkeletonCard />; 
  if (error) return <p>{error}</p>;

  return (
    <FGIDiv>
      <FGIText>공포탐욕지수</FGIText>
      <FGIndex>{indexData?.value}</FGIndex>
    </FGIDiv>
  );
};

export default FearGreedIndex;

// Skeleton UI 애니메이션
const loadingAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Skeleton UI 컴포넌트
const SkeletonCard = styled.div`
  width: 100%;
  height: 3.875rem;
  padding: 7.5rem 0rem 1.75rem 0rem;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    background-size: 200% 200%;
    animation: ${loadingAnimation} 2s ease-in-out infinite;
  }
`;

//공포탐욕지수 카드 스타일
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

// 텍스트 스타일
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
