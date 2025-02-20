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
  rank?: number;
}

const CoinDetailPage = () => {
  const { coinId } = useParams<{ coinId: string }>(); // URL에서 코인 ID 가져오기
  const [coinData, setCoinData] = useState<CoinDetailInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const numericCoinId = Number(coinId) || 0;

  // API에서 코인 데이터 가져오기
  const fetchDetailData = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_ENDPOINTS.COIN_DETAIL(Number(id)));
      console.log("COIN_DETAIL 서버 응답", response);

      if (response.status === 200) {
        setCoinData(response.data.result);
      } else {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
      console.error("Error fetching coin details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchDetailData(numericCoinId);
    }
  }, [numericCoinId]);

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
      <GridWrapper>
        <LeftColumn>
          <TitleLayout coinData={coinData} navigate={navigate} />
          <CoinInfoCard
            name={coinData.name}
            symbol={coinData.symbol}
            keywords={coinData.keywords}
            description={coinData.description}
            image={coinData.image}
            rank={coinData.rank}
          />
          <LiveChatCard coinId={numericCoinId} />
        </LeftColumn>

        <RightColumn>
          <ChartCard coinId={Number(coinId)} coinSymbol={coinData.symbol} />
          <TradingCard coinSymbol={coinData.symbol} />
        </RightColumn>
      </GridWrapper>
    </Wrapper>
  );
};

export default CoinDetailPage;

const TitleLayout = ({
  coinData,
  navigate,
}: {
  coinData: CoinDetailInfo;
  navigate: ReturnType<typeof useNavigate>;
}) => {
  const isMobile = window.matchMedia("(max-width: 737px)").matches;
  console.log(isMobile);

  return (
    <StyledTitleLayout>
      <Icon
        src={arrow}
        alt="뒤로 가기"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />
      <TitleTypo>
        {isMobile ? coinData.name : `${coinData.name} 상세 정보`}
      </TitleTypo>
    </StyledTitleLayout>
  );
};

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.96fr;
  gap: 1.563rem;
  height: auto;
  background-color: var(--background-black);

  /* 부모 기준으로 중앙 정렬 */
  width: 80vw; /* 적절한 크기 제한 */
  max-width: 1200px; /* 최대 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  margin-bottom: 100px;

  @media (max-width: 1200px) {
    margin-bottom: 100px;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 737px) {
    width: 80vw;
  }
`;

const RightColumn = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  width: 48.542vw;
  margin-top: 84.5px;
  display: flex;
  flex-direction: column;

  @media (max-width: 737px) {
    width: 80vw;
    margin-top: 0px;
  }
`;

const StyledTitleLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.688rem;
  margin-top: 2.031rem;
  justify-content: flex-start;
  margin-bottom: 10px;
  white-space: nowrap;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
