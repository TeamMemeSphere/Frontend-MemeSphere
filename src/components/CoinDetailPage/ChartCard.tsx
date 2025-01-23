import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";

const ChartCard = () => {
  return (
    <>
      <CardLayout>
        <StyledCardTitle>차트</StyledCardTitle>
      </CardLayout>
    </>
  );
};

export default ChartCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 48.194vw;
  height: 42.285vh;
  margin-top: 0.813rem;
  margin-bottom: 1.625rem;
`;
