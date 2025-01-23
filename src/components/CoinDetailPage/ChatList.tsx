import styled from "styled-components";
import ChatContent from "./ChatContent";
import chatDummy from "../../data/chatDummy.json";
import { forwardRef } from "react";

const ChatList = forwardRef<HTMLDivElement>((props, chatListRef) => {
    return (
        <>
            <Container ref={chatListRef}>
                {chatDummy.map((chat, index) => (
                    <ChatContent
                        key={index}
                        message={chat.message}
                        nickname={chat.nickname}
                        likes={chat.likes}
                        created_at={chat.created_at}
                    />
                ))}
            </Container>
        </>
    )
})

export default ChatList;

const Container = styled.div`
    box-sizing: border-box;
    width: calc(100% - 0.75rem);
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.563rem;
    padding: 0 1.188rem 0 0.688rem;
    position: relative;

    &::-webkit-scrollbar {
        width: 3px;
        margin-bottom: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--white-60);
        border-radius: 2.5px;
    }

    &::-webkit-scrollbar-track {
        background: var(--white-30);
        border-radius: 2.5px;
    }
`