import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import CoinCardChart from "../Commons/CoinCardChart";
import {
  BodyTypo,
  CaptionTypoRegular,
  SubTitle3Typo,
  SmallCaptionTypo,
} from "../../styles/Typography";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import rightButton from "../../../public/assets/common/right.svg";

export interface CoinPriceData {
  coinId: number;
  price: string;
  priceChange: string;
  priceChangeAbsolute: string;
  priceChangeDirection: string;
  priceChangeRate: string;
  weightedAveragePrice: number;
  highPrice: string;
  lowPrice: string;
  symbol?: string;
}

const ChartCard = ({
  coinId,
  coinSymbol,
}: {
  coinId: number;
  coinSymbol?: string;
}) => {
  const chartSectionRef = useRef<HTMLDivElement>(null);
  const [chartSectionWidth, setChartSectionWidth] = useState<number>(626);
  const [coinData, setCoinData] = useState<CoinPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_ENDPOINTS.COIN_PRICE_INFO(coinId));

      if (response.data?.result) {
        setCoinData(response.data.result);
      } else {
        setError("데이터 형식이 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("Error fetching coin data:", err);
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
    }
  }, [coinId]);

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
  });

  // 스켈레톤 UI 로딩 중 표시
  if (loading) return <SkeletonCard />;

  if (error) return <p>{error}</p>;
  if (!coinData) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <CardLayout>
      <TitleSection>
        <NoMarginCardTitle>차트</NoMarginCardTitle>
        <FlexContainer
          as="a"
          href={`https://www.binance.com/en/trade/${coinSymbol}_USDT?type=spot`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledSmallCaptionTypo>거래소 바로가기</StyledSmallCaptionTypo>
          <img src={rightButton} />
        </FlexContainer>
      </TitleSection>
      <div>
        <BodyTypo>Price</BodyTypo>
        <CurrentSection>
          <CurrentPrice>
            &#36;{" "}
            {coinData?.price
              ? parseFloat(coinData.price).toFixed(8).replace(/0+$/, "")
              : "N/A"}
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
                {coinData?.priceChangeDirection === "up" ? "▲" : "▼"}&nbsp; $
                {parseFloat(coinData?.priceChange || "0")
                  .toFixed(8)
                  .replace(/0+$/, "")}
                &nbsp; (
                {parseFloat(coinData?.priceChangeRate || "0")
                  .toFixed(8)
                  .replace(/0+$/, "")}
                %)
              </>
            )}
          </CurrentPriceChange>
        </CurrentSection>
      </div>
      <PriceInfoContainer>
        <div>
          <StyledRegularCaption>24h change</StyledRegularCaption>
          <StyledSubTitle3>
            {coinData?.priceChange
              ? parseFloat(coinData.priceChange).toFixed(8).replace(/0+$/, "")
              : "N/A"}
          </StyledSubTitle3>
        </div>
        <div>
          <StyledRegularCaption>24h high</StyledRegularCaption>
          <StyledSubTitle3>
            {coinData?.highPrice
              ? parseFloat(coinData.highPrice).toFixed(8).replace(/0+$/, "")
              : "N/A"}
          </StyledSubTitle3>
        </div>
        <div>
          <StyledRegularCaption>24h low</StyledRegularCaption>
          <StyledSubTitle3>
            {coinData?.lowPrice
              ? parseFloat(coinData.lowPrice).toFixed(8).replace(/0+$/, "")
              : "N/A"}
          </StyledSubTitle3>
        </div>
      </PriceInfoContainer>

      <ChartSection ref={chartSectionRef}>
        <CoinCardChart
          symbol={coinData?.symbol ? `${coinData.symbol}USDT` : "DOGEUSDT"}
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

// Skeleton UI 애니메이션
const loadingAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Skeleton UI 컴포넌트
const SkeletonCard = styled.div`
  width: 100%;
  padding-left: 2.361vw;
  padding-right: 2.361vw;
  padding-bottom: 1.35rem;
  padding-top: 0.4rem;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.625rem;

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

// Styled-Components
const CardLayout = styled(CommonCard)`
  margin-top: 0.813rem;
  margin-bottom: 1.625rem;
  padding-left: 2.361vw;
  padding-right: 2.361vw;
  padding-bottom: 1.35rem;
  padding-top: 0.4rem;
`;

const NoMarginCardTitle = styled(StyledCardTitle)`
  padding-left: 0rem;
  padding-top: 0rem;
  margin-bottom: 0.5rem;
`;

const ChartSection = styled.div`
  width: 100%;
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
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
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
