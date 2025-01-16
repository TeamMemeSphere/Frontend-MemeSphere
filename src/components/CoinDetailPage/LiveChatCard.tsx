import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

const LiveChatCard = () => {
  return (
    <>
      <CardLayout>
        <Title>실시간 채팅</Title>
        <ChatList />
        <ChatInput></ChatInput>
      </CardLayout>
    </>
  );
};

export default LiveChatCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 24.722vw;
  min-height: 31.5rem;
  max-height: 46.667vh;
  margin-top: 0.813rem;
  margin-bottom: 1.625rem;
  position: relative; 
`;

const Title = styled(StyledCardTitle)`
  background-color: var(--gray-100);
  padding-bottom: 1rem;
`
