// 거래량 차트 카드
import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import VolumeChart from "./VolumeChart";

interface TradingCardProps {
  coinSymbol: string;
}
const TradingCard = ({ coinSymbol }: TradingCardProps) => {
  console.log(coinSymbol);

  return (
    <>
      <CardLayout>
        <NoMarginCardTitle>거래량</NoMarginCardTitle>
        <VolumeChart symbol={`${coinSymbol}USDT`} interval="1h" />
      </CardLayout>
    </>
  );
};

export default TradingCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  /* width: 43.472vw; */
  box-sizing: border-box;
  width: 100%;
  height: 334px;
  padding-bottom: 3.376rem;
  padding-top: 1.688rem;
  padding-left: 2.125rem;
  padding-right: 2.125rem;

  @media (max-width: 737px) {
    padding-top: 1.094rem;
    padding-left: 1.125rem;
    padding-right: 1.125rem;
    margin-bottom: 100px;
  }
`;

const NoMarginCardTitle = styled(StyledCardTitle)`
  padding-left: 0;
  padding-bottom: 1rem;
  padding-top: 0;
`;
