import styled from "styled-components";

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

const CoinCard = ({
  name,
  symbol,
  tradePrice,
  highPrice,
  lowPrice,
  change,
  changePrice,
  changeRate,
  isCollected,
}: Coin) => {

  return (
    <Container>
      <HeaderSection>
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
          />{" "}
          {lowPrice.toLocaleString()}
          <Icon
            src="assets/common/trending-up.svg"
            alt="trending-up"
            $margin="0px 6px 0px 10.5px"
          />{" "}
          {highPrice.toLocaleString()}
        </UpDownSection>
        <CurrentSection>
          <CurrentPrice>&#36; {tradePrice.toLocaleString()}</CurrentPrice>
          <CurrentPriceChange $change={change}>
            {change === "EVEN" ? "⏤" : (
              <>
              {change === "RISE" ? "▲" : "▼"}
              &nbsp;{changePrice.toLocaleString()}
              &nbsp;({changeRate.toLocaleString()}%)
              </>
            )
            }
          </CurrentPriceChange>
        </CurrentSection>
      </PriceInfoSection>
      <ChartSection></ChartSection>
    </Container>
  );
};

const Container = styled.div`
  width: 340px;
  height: 473px;
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
  width: 306px;
  height: 79px;
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: #ffffff0d;
  border-radius: 10px;
  margin: 18px 17px 0px 17px;
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
  width: 306px;
  height: 254px;
  margin-top: 23px;
  border: 1px solid #ffffff0d;
`;

// 아이콘
interface IconProps {
  $margin?: string;
}

const Icon = styled.img<IconProps>`
  margin: ${(props) => props.$margin};
`;

export default CoinCard;