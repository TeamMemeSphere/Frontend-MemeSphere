import styled from "styled-components";
import ChatContent from "./ChatContent";
import chatDummy from "../../data/chatDummy.json";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import useIntersectionObserver from "../../hooks/CoinDetailPage/useIntersectionObserver";

interface ChatMessage {
    id: number,
    message: string,
    nickname: string,
    memeCoin: string,
    likes: number,
    created_at: string
}

interface ChatListProps {
    messages: any[],
    fetchNextPage: () => void,
    hasNextPage: boolean,
    isFetching: boolean
}

const ChatList = forwardRef<HTMLDivElement, ChatListProps>(({ messages, fetchNextPage, hasNextPage, isFetching }, chatListRef) => {
    console.log(messages);
    const [chatList, setChatList] = useState<any>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const [prevHeight, setPrevHeight] = useState(0);


    const observerRef = useRef<HTMLDivElement>(null);
    useIntersectionObserver({ observerRef: observerRef, fetchNextPage, hasNextPage, setPrevHeight, chatListRef, chatList });

    useEffect(() => {
        console.log('isMounted');
        console.log(isMounted);
        if (chatListRef.current && !isMounted && !isFetching) {
            scrollToEnd();
            setIsMounted(true);
        }
        setChatList(flattenedMessages);
    }, []);

    const scrollToEnd = () => {
        chatListRef.current.scrollTop = chatListRef?.current?.scrollHeight;
        chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: 'smooth' });
    }

    useEffect(() => {
        if (isFetching) return;
        scrollTo({ top: document.body.scrollHeight - prevHeight });
        console.log('scrollTo');
        console.log(prevHeight);

      }, [chatList]);

    const flattenedMessages = messages?.flatMap((page) => page.result.content) || [];
    console.log('flattenedMessages');

    console.log(flattenedMessages);

    return (
        <>
            <Container ref={chatListRef}>
                <ChatTopDiv ref={observerRef} />
                {flattenedMessages.map((chat, index) => (
                    <ChatContent
                        key={index}
                        id={chat.id}
                        message={chat.message}
                        nickname={chat.nickname}
                        likes={chat.likes}
                        createdAt={chat.createdAt}
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

const ChatTopDiv = styled.div`
    width: 100%;
    height: 1rem;
    flex-shrink: 0;
`