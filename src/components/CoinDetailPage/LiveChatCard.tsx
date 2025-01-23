import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";

const LiveChatCard = () => {
  const chatInputRef = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
      chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: 'smooth' });
  }

  useEffect(() => {
      scrollToEnd();
  }, [])

  const [chatInputHeight, setChatInputHeight] = useState(0);

  useEffect(() => {
    if (chatInputRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setChatInputHeight(entry.borderBoxSize[0].blockSize+10);
        }
      });
      observer.observe(chatInputRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <CardLayout>
        <Title>실시간 채팅</Title>
        <ChatList ref={chatListRef}/>
        <DownButton bottom={`${chatInputHeight}px`} onClick={scrollToEnd}/>
        <ChatInput ref={chatInputRef}></ChatInput>
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
  display: flex;
  flex-direction: column;
`;

const Title = styled(StyledCardTitle)`
  background-color: var(--gray-100);
  padding-bottom: 1rem;
`

interface DownButtonProps {
  bottom: string;
}

const DownButton = styled.button<DownButtonProps>`
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.375rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-image: url("assets/DetailPage/chevron-down.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--grey-100);
    
    border-radius: 1.125rem;
    border: 0.094rem solid var(--white-100);
    box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0.625rem;
    bottom: ${props => props.bottom};
    z-index: 1;
`
