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
  isCollected?: boolean;
  marketCap: number;
  volume: number;
}

const ChartCard = ({
  symbol,
  tradePrice,
  highPrice,
  lowPrice,
  change,
  changePrice,
  changeRate,
}: Coin) => {
  const chartSectionRef = useRef<HTMLDivElement>(null);
  const [chartSectionWidth, setChartSectionWidth] = useState<number>(0);
  const [exchangeLink, setExchangeLink] = useState<string>(
    "https://www.binance.com/en",
  );
  const [customSymbol, setCustomSymbol] = useState<string>("");

  useEffect(() => {
    setCustomSymbol("DOGE_USDT");
    setExchangeLink(
      `https://www.binance.com/en/trade/${customSymbol}?type=spot`,
    );
    console.log(symbol, customSymbol);

    if (chartSectionRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setChartSectionWidth(entry.borderBoxSize[0].inlineSize);
          console.log("setChartSectionWidth를 실행 후 값:", chartSectionWidth);
        }
      });
      observer.observe(chartSectionRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <CardLayout>
        <TitleSection>
          <NoMarginCardTitle>차트</NoMarginCardTitle>
          <FlexContainer
            as="a"
            href={exchangeLink}
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
              <CurrentPrice>&#36; {tradePrice.toLocaleString()}</CurrentPrice>
              <CurrentPriceChange $change={change}>
                {change === "EVEN" ? (
                  "⏤"
                ) : (
                  <>
                    {change === "RISE" ? "▲" : "▼"}
                    &nbsp;{changePrice.toLocaleString()}
                    &nbsp;({changeRate.toLocaleString()}%)
                  </>
                )}
              </CurrentPriceChange>
            </CurrentSection>
          </div>
          <PriceInfoContainer>
            <div>
              <StyledRegularCaption>24h change</StyledRegularCaption>
              <StyledSubTitle3>{changePrice}</StyledSubTitle3>
            </div>
            <div>
              <StyledRegularCaption>24h high</StyledRegularCaption>
              <StyledSubTitle3>{lowPrice.toLocaleString()}</StyledSubTitle3>
            </div>
            <div>
              <StyledRegularCaption>24h low</StyledRegularCaption>
              <StyledSubTitle3>{highPrice.toLocaleString()}</StyledSubTitle3>
            </div>
          </PriceInfoContainer>
        </FlexLayout>
        <ChartSection ref={chartSectionRef}>
          <CoinCardChart width={chartSectionWidth} symbol={symbol} />
        </ChartSection>
      </CardLayout>
    </>
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

// 가격정보
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
