import styled from "styled-components";
import { CommonCard, StyledCardTitle } from "./CommonCardStyle";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { API_ENDPOINTS } from "../../api/api";
import axios from "axios";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useIntersectionObserver from "../../hooks/CoinDetailPage/useIntersectionObserver";

interface LiveChatCardProps {
  coinId: number;
}

const LiveChatCard = ({ coinId }: LiveChatCardProps) => {
  const chatInputRef = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);
  const chatListTopRef = useRef<HTMLDivElement>(null);

  const { CHAT_LIST } = API_ENDPOINTS;
  useEffect(() => {
    const fetchInitialPage = async () => {
      try {
        const res = await axios.get(`${CHAT_LIST(1)}?page=0&size=10`);
        setInitialPage(res.data.result.totalPages - 1); // 초기 페이지 설정
        console.log(res.data.result.totalPages - 1)
        console.log(initialPage)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchInitialPage();
  }, []);

  const [initialPage, setInitialPage] = useState<number | undefined>(undefined);

  const [messages, setMessages] = useState<any[]>([]);
  const getAllMessages = async (page: number) => {
    try {
      const res = await axios.get(`${CHAT_LIST(1)}?page=${page}&size=10`);
      console.log(res.data);
      // console.log(res.data.result.pageable.pageNumber);
      setMessages(res.data.result.content);
      // setInitialPage(res.data.result.totalPages - 1);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    // scrollToEnd();
  }
  
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<any>({
    queryKey: ["LiveChatCard", coinId, initialPage, currentMessage],
    queryFn: ({ pageParam = initialPage }) => getAllMessages(pageParam),
    getNextPageParam: (lastPage: any) => (lastPage ?
      lastPage.result.pageable.pageNumber >= 1 ? 
      lastPage.result.pageable.pageNumber - 1  
      : 
      undefined
    :
    initialPage),
    getPreviousPageParam: (lastPage: any) => (
      lastPage ?
        lastPage.result.pageable.pageNumber >= 1 ? 
        lastPage.result.pageable.pageNumber - 1  
        : 
        undefined
      :
      initialPage
    ),
    initialPageParam: initialPage,
    select: (data) => {
      // 첫 요청에서 initialPageParam을 마지막 페이지로 설정
      if (!data.pages.length) return data;
      console.log(initialPage)
      console.log(data.pages[0]);
      const lastPage = data.pages[0].result.totalPages - 1;
      console.log(lastPage);

      console.log(data);
      return {
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      };
    },
  });

  const [stompClient, setStompClient] = useState<Client | null>(null);

  // 지금 보낸 메세지
  const socketUrl = `${import.meta.env.VITE_WEBSOCKET_URL}`;
  useEffect(() => {
    const client = new Client({
      brokerURL: socketUrl, // 백엔드 웹소켓 주소
      reconnectDelay: 5000, // 자동 재연결 간격 (5초)
      onConnect: (frame) => {
        console.log("Connected to WebSocket");
        console.log(frame);
        client.subscribe("/sub/1", (message) => {
          console.log(message.body);
          setMessages((prev) => [...prev, message.body]);
          setCurrentMessage(JSON.parse(message.body));
        });
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error("Broker error: ", frame.headers["message"]);
      },
    });
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const nickname = localStorage.getItem("nickName");

  const sendMessage = (message: string) => {
    const requestBody = {
      'nickname': nickname,
      'message': message
    };
    if (stompClient) {
      stompClient.publish({
        destination: "/pub/chat/1",
        body: JSON.stringify(requestBody),
      });
    }
    chatListRef.current.scrollTop = chatListRef?.current?.scrollHeight;
  }

  const scrollToEnd = () => {
    chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: 'smooth' });
  }

  // useEffect(() => {
  //   scrollToEnd();
  // }, [isLoading, data]);

  const [chatInputHeight, setChatInputHeight] = useState(0);

  useEffect(() => {
    if (chatInputRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setChatInputHeight(entry.borderBoxSize[0].blockSize + 10);
        }
      });
      observer.observe(chatInputRef.current);

      return () => observer.disconnect();
    }
  }, []);

  // useIntersectionObserver({ observerRef: chatListTopRef, fetchNextPage, hasNextPage });

  return (
    <>
      <CardLayout>
        <Title>실시간 채팅</Title>
        {isLoading ?
          <div>로딩중</div>
          :
          isError ?
            <div>{error?.toString()}</div>
            :
            <ChatList messages={data?.pages} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} ref={chatListTopRef} currentMessage={currentMessage} isFetching={isFetching}/>
        }
        <DownButton bottom={`${chatInputHeight}px`} onClick={() => scrollToEnd} />
        <ChatInput ref={chatInputRef} onSend={sendMessage}></ChatInput>
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
    
    background-image: url("/assets/DetailPage/chevron-down.svg");
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
