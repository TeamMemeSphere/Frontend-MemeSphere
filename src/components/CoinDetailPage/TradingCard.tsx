// 거래량 차트 카드
import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";

const TradingCard = () => {
  return (
    <>
      <CardLayout>
        <StyledCardTitle>거래량</StyledCardTitle>
      </CardLayout>
    </>
  );
};

export default TradingCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 48.194vw; /*694px*/
  height: 20.605vh; /*211px*/
`;
