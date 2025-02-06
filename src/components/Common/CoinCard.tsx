import styled from "styled-components";
import CoinCardChart from "./CoinCardChart";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export interface Coin {
  coinId: number;
  name: string;
  symbol: string;
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  priceChange: number;
  priceChangeRate: number;
  isCollected?: boolean;
  marketCap?: number;
  volume?: number;
}

const CoinCard = ({
  name,
  symbol,
  currentPrice,
  highPrice,
  lowPrice,
  priceChange,
  priceChangeRate,
  isCollected,
}: Coin) => {

  const chartSectionRef = useRef<HTMLDivElement>(null);
  const [chartSectionWidth, setChartSectionWidth] = useState<number>(0);

  const change = priceChange > 0 ? "RISE" : priceChange < 0 ? "FALL" : "EVEN";

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

  return (
    <Container>
      <HeaderSection to={"/CoinDetailPage"}>
        <ThumbnailWrapper>
          <Thumbnail
            src="https://via.placeholder.com/200"
            alt="thumbnail"
          ></Thumbnail>
        </ThumbnailWrapper>
        <NameWrapper>
          {name} / {symbol}
        </NameWrapper>
        <StarIcon>
          {isCollected ? (
            <Icon
              src="assets/common/collect-star-fill.svg"
              alt="star-fill"
            ></Icon>
          ) : (
            <Icon src="assets/common/collect-star.svg" alt="star"></Icon>
          )}
        </StarIcon>
      </HeaderSection>
      <PriceInfoSection>
        <UpDownSection>
          <Icon
            src="assets/common/trending-down.svg"
            alt="trending-down"
            $margin="0px 6px 0px 0px"
          />
          {lowPrice.toLocaleString()}
          <Icon
            src="assets/common/trending-up.svg"
            alt="trending-up"
            $margin="0px 6px 0px 10.5px"
          />
          {highPrice.toLocaleString()}
        </UpDownSection>
        <CurrentSection>
          <CurrentPrice>&#36; {currentPrice.toLocaleString()}</CurrentPrice>
          <CurrentPriceChange $change={change}>
            {change === "EVEN" ? "⏤" : (
              <>
                {change === "RISE" ? "▲" : "▼"}
                &nbsp;{priceChange.toLocaleString()}
                &nbsp;({priceChangeRate.toLocaleString()}%)
              </>
            )
            }
          </CurrentPriceChange>
        </CurrentSection>
      </PriceInfoSection>
      <ChartSection ref={chartSectionRef}>
        <CoinCardChart width={chartSectionWidth} symbol={symbol}/>
      </ChartSection>
    </Container>
  );
};

const Container = styled.div`
  /* width: max(340px, 17.708vw); */
  width: 100%;
  height: 29.563rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #26262a80;
  border-radius: 20px;
`;

// 헤더
const HeaderSection = styled(NavLink)`
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
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  padding-bottom: 100%;
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
  height: 79px;
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