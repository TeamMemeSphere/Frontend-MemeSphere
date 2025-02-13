// 거래량 차트 카드
import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import VolumeChart from "./VolumeChart";

const TradingCard = () => {
  return (
    <>
      <CardLayout>
        <NoMarginCardTitle>거래량</NoMarginCardTitle>
        <VolumeChart symbol="BTCUSDT" interval="1h" />
      </CardLayout>
    </>
  );
};

export default TradingCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 43.472vw;
  height: 334px;
  padding-bottom: 1.688rem;
  padding-left: 2.361vw;
  padding-right: 2.361vw;
`;

const NoMarginCardTitle = styled(StyledCardTitle)`
  padding-left: 0;
`;
