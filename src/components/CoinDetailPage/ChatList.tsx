import styled from "styled-components";
import ChatContent from "./ChatContent";
import { forwardRef, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../hooks/CoinDetailPage/useIntersectionObserver";
import { useQueryClient } from "@tanstack/react-query";

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
    isFetching: boolean,
    newMessages?: any[]
}

const ChatList = forwardRef<HTMLDivElement, ChatListProps>(({ messages, fetchNextPage, hasNextPage, isFetching, newMessages }, chatListRef) => {
    const [chatList, setChatList] = useState<any>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [prevHeight, setPrevHeight] = useState(0);
    const queryClient = useQueryClient();

    const observerRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver({ observerRef: observerRef, fetchNextPage, hasNextPage, setPrevHeight, isFetching, chatListRef, chatList });

    useEffect(() => {
        if (isFetching) return;
        if (chatListRef && 'current' in chatListRef && chatListRef.current && !isMounted && !isFetching) {
            scrollToEnd();
            setIsMounted(true);
        }
        setChatList(flattenedMessages);
    }, [messages]);

    const scrollToEnd = () => {
        if (chatListRef && 'current' in chatListRef && chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
            chatListRef?.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if (isFetching) return;
        chatListRef?.current?.scrollTo({ top: chatListRef.current.scrollHeight - prevHeight });
    }, [messages.length]);


    // 나갔다 들어왔을 때 페이지 초기화
    useEffect(() => {
        return () => {
            queryClient.removeQueries({ queryKey: ["LiveChatCard"] });
        };
    }, []);

    const flattenedMessages = messages?.flatMap((page) => page.result.content) || [];

    console.log(newMessages);

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
                        chatListRef={chatListRef}
                    />
                ))}
                {
                    newMessages && newMessages?.map((chat, index) => (
                        <ChatContent
                            key={index}
                            id={chat.id}
                            message={chat.message}
                            nickname={chat.nickname}
                            likes={chat.likes}
                            createdAt={chat.createdAt}
                            chatListRef={chatListRef}
                        />
                    ))
                }
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