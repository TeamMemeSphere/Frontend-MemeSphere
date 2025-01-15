import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";

const LiveChatCard = () => {
  return (
    <>
      <CardLayout>
        <StyledCardTitle>실시간 채팅</StyledCardTitle>
      </CardLayout>
    </>
  );
};

export default LiveChatCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 24.722vw;
  height: 46.667vh;
  margin-top: 0.813rem;
  margin-bottom: 1.625rem;
`;
