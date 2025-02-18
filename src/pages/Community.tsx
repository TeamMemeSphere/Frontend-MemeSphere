import FearGreedIndex from "../components/Community/FearGreedIndex";
import NewsCards from "../components/Community/NewsCards.tsx";
import CoinTalk from "../components/Community/CoinTalk.tsx";
import ContentHeader from "../components/Commons/ContentHeader.tsx";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { chatInfo, coinInfo } from "../components/Community/communityTypes.ts";
import SkeletonCoinChat from "../components/Community/SkeletonCoinChat.tsx";
import axios from "axios";
import { useQueries, useInfiniteQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api/api.ts";

interface ApiResponse {
  isSuccess: boolean;
  result: {
    id: number;
    name: string;
    symbol: string;
    image: string;
    chatInfo?: chatInfo;
  };
}
const fetchCoinData = async (id: number): Promise<ApiResponse | undefined> => {
  try {
    const coinResponse = await axios.get(API_ENDPOINTS.COIN_DETAIL(id));
    if (coinResponse.status === 200 && coinResponse.data) {
      return coinResponse.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        console.warn(`No data found for ID ${id}`);
        return undefined;
      }
      console.error(`Error fetching data for ID ${id}:`, error);
    }
    return undefined;
  }
};

const Community = () => {
  const queries = useQueries({
    queries: [1, 2, 3, 4, 5, 6].map((id) => ({
      queryKey: ["coinData", id],
      queryFn: () => fetchCoinData(id),
    })),
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["coinData", "infinite"],
    queryFn: ({ pageParam = 7 }) => fetchCoinData(pageParam),
    initialPageParam: 7,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) {
        return undefined;
      }
      return lastPage.isSuccess === false ? undefined : pages.length + 7;
    },
  });

  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Container>
      <ContentHeader
        title="커뮤니티"
        description="밈 코인에 대한 아이디어를 다른 유저들과 공유해보세요."
      />
      <Content>
        <LeftSide>
          <FearGreedIndex />
          <NewsCards />
        </LeftSide>
        <RightSide>
          {queries.map((query, index) => (
            <div key={index}>
              {query.isLoading ? (
                <SkeletonCoinChat />
              ) : query.isError ? (
                <p>Error loading data</p>
              ) : !query.data ? (
                <p>no data...</p>
              ) : (
                <CoinTalk
                  key={query.data.result.id}
                  id={query.data.result.id}
                  name={query.data.result.name}
                  symbol={query.data.result.symbol}
                  image={query.data.result.image}
                />
              )}
            </div>
          ))}
          {data?.pages
            .flat()
            .map((query) =>
              query?.result ? (
                <CoinTalk
                  key={query.result.id}
                  id={query.result.id}
                  name={query.result.name}
                  symbol={query.result.symbol}
                  image={query.result.image}
                />
              ) : null,
            )}
          <div ref={observerRef} />
          {isFetchingNextPage && hasNextPage && <SkeletonCoinChat />}
        </RightSide>
      </Content>
    </Container>
  );
};

export default Community;

/** Styled Components **/

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 12.5vw 4.5rem 12.5vw;
  width: 100%;
  height: fit-content;
`;

const Content = styled.div`
  display: flex;
  gap: 1.736vw;

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서 컬럼 방향으로 변경 */
    gap: 2rem;
  }
`;

const LeftSide = styled.div`
  width: 21.528vw;
  display: flex;
  flex-direction: column;
  gap: 4.297vh;

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서 너비 100% */
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 49.931vw;
  gap: 1.953vh;

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서 너비 100% */
  }
`;
