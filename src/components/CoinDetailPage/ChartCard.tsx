import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import CoinCardChart from "../Common/CoinCardChart";
import {
  BodyTypo,
  CaptionTypoRegular,
  SubTitle3Typo,
  SmallCaptionTypo,
} from "../../styles/Typography";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import rightButton from "../../../public/assets/common/right.svg";

export interface Coin {
  name: string;
  symbol: string;
  tradePrice: number;
  highPrice: number;
  lowPrice: number;
  change: "RISE" | "FALL" | "EVEN";
  changePrice: number;
  changeRate: number;
  marketCap: number;
  volume: number;
}

export interface CoinPriceData {
  coinId: number;
  price: number;
  priceChange: number;
  priceChangeAbsolute: number;
  priceChangeDirection: string;
  priceChangeRate: number;
  weightedAveragePrice: number;
  highPrice: number;
  lowPrice: number;
  symbol?: string; // symbol 에러 방지용 추가
}

const ChartCard = ({ coinId }: { coinId: number }) => {
  const chartSectionRef = useRef<HTMLDivElement>(null);
  const [chartSectionWidth, setChartSectionWidth] = useState<number>(626);
  const [coinData, setCoinData] = useState<CoinPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("으아아", coinData?.priceChangeDirection);

  // API에서 코인 데이터 가져오기
  const fetchCoinData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_ENDPOINTS.COIN_PRICE_INFO(coinId));

      console.log("ChartCard API Response:", response.data);

      if (response.data?.result) {
        setCoinData(response.data.result);
      } else {
        setError("데이터 형식이 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("Error fetching coin data:", err);
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // coinId가 변경될 때마다 데이터 가져오기
  useEffect(() => {
    if (coinId) {
      fetchCoinData();
    }
  }, [coinId]);

  // 차트 크기 감지
  useEffect(() => {
    if (chartSectionRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setChartSectionWidth(entry.borderBoxSize[0].inlineSize);
        }
      });
      observer.observe(chartSectionRef.current);
      return () => observer.disconnect();
    }
  }, []);

  // 로딩 상태
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!coinData) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <CardLayout>
      <TitleSection>
        <NoMarginCardTitle>차트</NoMarginCardTitle>
        <FlexContainer
          as="a"
          href={`https://www.binance.com/en/trade/${coinData?.symbol}?type=spot`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledSmallCaptionTypo>거래소 바로가기</StyledSmallCaptionTypo>
          <img src={rightButton} />
        </FlexContainer>
      </TitleSection>

      <FlexLayout>
        <div>
          <BodyTypo>Price</BodyTypo>
          <CurrentSection>
            <CurrentPrice>
              &#36; {coinData?.price?.toLocaleString() ?? "N/A"}
            </CurrentPrice>
            <CurrentPriceChange
              $change={
                coinData?.priceChangeDirection === "up"
                  ? "RISE"
                  : coinData?.priceChangeDirection === "down"
                    ? "FALL"
                    : "EVEN"
              }
            >
              {coinData?.priceChangeDirection === "EVEN" ? (
                "⏤"
              ) : (
                <>
                  {coinData?.priceChangeDirection === "RISE" ? "▲" : "▼"}&nbsp;
                  {coinData?.priceChangeDirection?.toLocaleString() ?? "N/A"}
                  &nbsp; (
                  {coinData?.priceChangeDirection?.toLocaleString() ?? "N/A"}%)
                </>
              )}
            </CurrentPriceChange>
          </CurrentSection>
        </div>
        <PriceInfoContainer>
          <div>
            <StyledRegularCaption>24h change</StyledRegularCaption>
            <StyledSubTitle3>
              {coinData?.priceChange?.toLocaleString() ?? "N/A"}
            </StyledSubTitle3>
          </div>
          <div>
            <StyledRegularCaption>24h high</StyledRegularCaption>
            <StyledSubTitle3>
              {coinData?.highPrice?.toLocaleString() ?? "N/A"}
            </StyledSubTitle3>
          </div>
          <div>
            <StyledRegularCaption>24h low</StyledRegularCaption>
            <StyledSubTitle3>
              {coinData?.lowPrice?.toLocaleString() ?? "N/A"}
            </StyledSubTitle3>
          </div>
        </PriceInfoContainer>
      </FlexLayout>

      <ChartSection ref={chartSectionRef}>
        <CoinCardChart
          // symbol={coinData?.symbol ? `${coinData.symbol}USDT` : ""}
          symbol="DOGEUSDT"
          chartOptions={{
            width: chartSectionWidth,
            disableInteraction: false,
            showXAxisTicks: true,
            zoomEnabled: true,
          }}
        />
      </ChartSection>
    </CardLayout>
  );
};

export default ChartCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 43.472vw;
  margin-top: 0.813rem;
  margin-bottom: 1.625rem;
  padding-left: 2.361vw;
  padding-right: 2.361vw;
  padding-bottom: 3.889vh;
`;

const NoMarginCardTitle = styled(StyledCardTitle)`
  padding-left: 0rem;
  padding-top: 0rem;
`;

const ChartSection = styled.div`
  width: 626px;
  height: auto;
`;

const StyledRegularCaption = styled(CaptionTypoRegular)`
  margin-bottom: 0.25rem;
  text-align: center;
`;

const StyledSubTitle3 = styled(SubTitle3Typo)`
  text-align: center;
`;

const FlexContainer = styled.div`
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TitleSection = styled(FlexContainer)`
  justify-content: space-between;
  margin-top: 1rem;
`;

const PriceInfoContainer = styled(FlexContainer)`
  gap: 2.222vw;
  margin-right: 20px;
  margin-top: 12px;
`;

const FlexLayout = styled(FlexContainer)`
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.438rem;
`;

const CurrentSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: baseline;
  margin: 6px 0 0 0;
`;

const CurrentPrice = styled.div`
  color: white;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

interface CurrentPriceChangeProps {
  $change: "RISE" | "FALL" | "EVEN";
}

const CurrentPriceChange = styled.div<CurrentPriceChangeProps>`
  color: ${(props) =>
    props.$change === "RISE"
      ? "var(--red)"
      : props.$change === "FALL"
        ? "var(--blue)"
        : "white"};
  margin-left: 16px;
`;

const StyledSmallCaptionTypo = styled(SmallCaptionTypo)`
  color: var(--light-grey);
  margin-right: 0.375rem;
`;
