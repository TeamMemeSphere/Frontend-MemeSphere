import styled from "styled-components";
import CoinCardChart from "./CoinCardChart";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleCollectionButton from "./ToggleCollectionButton";

export interface Coin {
  coinId: number;
  name: string;
  symbol: string;
  image?: string;
  currentPrice: string;
  highPrice: string;
  lowPrice: string;
  priceChange: string;
  priceChangeRate: string;
  isCollected: boolean;
  marketCap?: number;
  volume?: number;
}

const CoinCard = ({
  coinId,
  name,
  symbol,
  image,
  currentPrice,
  highPrice,
  lowPrice,
  priceChange,
  priceChangeRate,
  isCollected,
}: Coin) => {
  const chartSectionRef = useRef<HTMLDivElement>(null);
  const [chartSectionWidth, setChartSectionWidth] = useState<number>(0);

  const parsedPriceChange = parseFloat(priceChange);

  const change = parsedPriceChange > 0 ? "RISE" : parsedPriceChange < 0 ? "FALL" : "EVEN";

  const navigate = useNavigate();

  useEffect(() => {
    if (chartSectionRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setChartSectionWidth(entry.borderBoxSize[0].inlineSize);
        }
      });
      observer.observe(chartSectionRef.current);

      return () => observer.disconnect();
    }
  }, []);

  function formatNumber(num: any) {
    if (num === 0) return "0";

    let str = num.toString();

    // 지수 표기법인지 확인
    if (str.includes("e")) {
      let fixed = num.toFixed(99); // 충분히 큰 자리수로 변환
      str = fixed.replace(/(?:\.0+|(\.\d*?[1-9])0+)$/, "$1"); // 불필요한 0 제거
    } else {
      str = str.replace(/(?:\.0+|(\.\d*?[1-9])0+)$/, "$1"); // 불필요한 0 제거
    }

    return str;
  }

  return (
    <Container>
      <HeaderSection
        onClick={(e) => { navigate(`/CoinDetailPage/${coinId}`); e.stopPropagation(); }}
        style={{ cursor: "pointer" }}
      >
        <ThumbnailWrapper>
          <Thumbnail src={`${image}`} alt="thumbnail"></Thumbnail>
        </ThumbnailWrapper>
        <NameWrapper>
          {name} / {symbol}
        </NameWrapper>
        <StarIcon onClick={(e) => e.stopPropagation()}>
          <ToggleCollectionButton coinId={coinId} isCollected={isCollected != null ? isCollected : true} />
        </StarIcon>
      </HeaderSection>
      <PriceInfoSection>
        <UpDownSection>
          <Icon
            src="assets/common/trending-down.svg"
            alt="trending-down"
            $margin="0px 6px 0px 0px"
          />
          {parseFloat(lowPrice)}
          <Icon
            src="assets/common/trending-up.svg"
            alt="trending-up"
            $margin="0px 6px 0px 10.5px"
          />
          {parseFloat(highPrice)}
        </UpDownSection>
        <CurrentSection>
          <CurrentPrice>&#36; {formatNumber(currentPrice)}</CurrentPrice>
          <CurrentPriceChange $change={change}>
            {change === "EVEN" ? (
              "⏤"
            ) : (
              <>
                {change === "RISE" ? "▲" : "▼"}
                &nbsp;{formatNumber(priceChange)}
                {/* &nbsp;{priceChange} */}
                &nbsp;({formatNumber(priceChangeRate)}%)
              </>
            )}
          </CurrentPriceChange>
        </CurrentSection>
      </PriceInfoSection>
      <ChartSection ref={chartSectionRef}>
        <CoinCardChart chartOptions={{ width: chartSectionWidth }} symbol={`${symbol}USDT`} />
      </ChartSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 31.2rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #26262a80;
  border-radius: 20px;
`;

// 헤더
const HeaderSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  text-decoration: none;
`;

const ThumbnailWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const NameWrapper = styled.div`
  margin-left: 17px;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StarIcon = styled.div`
  color: white;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 21px;
  cursor: pointer;
`;

// 가격정보
const PriceInfoSection = styled.div`
  box-sizing: border-box;
  width: calc(100% - 2.125rem);
  flex-shrink: 0;
  background-color: #ffffff0d;
  border-radius: 10px;
  margin: 1.125rem 1.063rem 0 1.063rem;
  padding: 15px 22px;
`;

const UpDownSection = styled.div`
  display: flex;
  color: #b5b7c0;
  font-size: 0.8rem;
`;

const CurrentSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
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
`;

// 차트
const ChartSection = styled.div`
  width: calc(100% - 2.125rem);
  height: 254px;
  margin-top: 23px;
`;

// 아이콘
interface IconProps {
  $margin?: string;
}

const Icon = styled.img<IconProps>`
  margin: ${(props) => props.$margin};
`;

export default CoinCard;
