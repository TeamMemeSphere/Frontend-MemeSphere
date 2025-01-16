import styled from "styled-components";
import ChatContent from "./ChatContent";
import chatDummy from "../../data/chatDummy.json";
import { useEffect, useRef } from "react";

const ChatList = () => {
    const chatListRef = useRef<HTMLDivElement>(null);

    const scrollToEnd = () => {
        chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight);
    }

    useEffect(() => {
        scrollToEnd();
    }, [])

    return (
        <>
            <Container
                ref={chatListRef}
            >
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
}

export default ChatList;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 23.563rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 0.563rem;
    padding: 0 1.25rem;

    &::-webkit-scrollbar {
        width: 5px;
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