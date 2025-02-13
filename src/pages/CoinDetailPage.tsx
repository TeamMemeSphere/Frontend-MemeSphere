import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TitleTypo } from "../styles/Typography";
import ChartCard from "../components/CoinDetailPage/ChartCard";
import TradingCard from "../components/CoinDetailPage/TradingCard";
import CoinInfoCard from "../components/CoinDetailPage/CoinInfoCard";
import LiveChatCard from "../components/CoinDetailPage/LiveChatCard";
import { API_ENDPOINTS } from "../api/api";
import axios from "axios";
import arrow from "../../public/assets/DetailPage/arrow.svg";

interface CoinDetailInfo {
  id: number;
  name: string;
  symbol: string;
  description: string;
  image: string;
  keywords: string[];
  collectionActive: boolean;
}

const CoinDetailPage = () => {
  const { coinId } = useParams<{ coinId: string }>(); // URL에서 코인 ID 가져오기
  const [coinData, setCoinData] = useState<CoinDetailInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // API에서 코인 데이터 가져오기
  const fetchDetailData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_ENDPOINTS.COIN_DETAIL(Number(id)));
      console.log("서버 응답", response);
      console.log("coinId", coinId);

      if (response.status === 200) {
        setCoinData(response.data.result);
        console.log(response.data.result);
      } else {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
      console.error("Error fetching coin details:", err);
    } finally {
      setLoading(false);
      console.log("finally coinData:", coinData);
    }
  };

  useEffect(() => {
    console.log("coinData:", coinData);
    if (coinId) {
      fetchDetailData(coinId);
    }
  }, [coinId]);

  if (loading)
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <p>{error}</p>
      </Wrapper>
    );
  if (!coinData)
    return (
      <Wrapper>
        <p>해당 코인의 정보를 찾을 수 없습니다.</p>
      </Wrapper>
    );

  return (
    <Wrapper>
      <TitleLayout>
        <Icon
          src={arrow}
          alt="뒤로 가기"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <TitleTypo>{coinData.name} 상세 정보</TitleTypo>
      </TitleLayout>

      <GridWrapper>
        <LeftColumn>
          <CoinInfoCard
            name={coinData.name}
            symbol={coinData.symbol}
            keywords={coinData.keywords}
            description={coinData.description}
            image={coinData.image}
          />
          <LiveChatCard />
        </LeftColumn>

        <RightColumn>
          <ChartCard coinId={coinData.id} />
          <TradingCard />
        </RightColumn>
      </GridWrapper>
    </Wrapper>
  );
};

export default CoinDetailPage;

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  margin-left: 11.25rem;
  margin-right: 11.25rem;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.96fr;
  gap: 1.563rem;
  height: auto;
  background-color: var(--background-black);
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.688rem;
  margin-top: 2.031rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
