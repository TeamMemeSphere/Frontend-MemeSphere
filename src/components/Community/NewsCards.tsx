import { useState, useEffect } from "react";
import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import NewsCard from "./NewsCard.tsx";
import { fetchNewsFromRSS } from "../../utils/rssParser.ts";

// 뉴스 데이터 타입 정의
export type NewsItem = {
  id: string;
  title: string;
  sourceName: string;
  time: string;
  link: string;
};

const NewsCards: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const rawNews = await fetchNewsFromRSS();
      console.log("rawNews:", rawNews); // 여기가 빈 배열

      // rawNews가 정상적인 구조인지 확인
      if (!Array.isArray(rawNews) || rawNews.length !== 4) {
        console.error("NewsCards.tsx에서 잘못된 뉴스 데이터 구조", rawNews);
        setIsLoading(false);
        return;
      }

      // `rawNews`의 요소가 배열인지 확인 후 변환
      const [titles, dates, sources, links] = rawNews;

      if (
        !Array.isArray(titles) ||
        !Array.isArray(dates) ||
        !Array.isArray(sources) ||
        !Array.isArray(links)
      ) {
        console.error("데이터 구조 문제 발생!");
        setIsLoading(false);
        return;
      }

      const formattedNews: NewsItem[] = titles.map((title, index) => ({
        id: `news-${index}`,
        title: title || "제목 없음",
        time: dates[index] || "날짜 없음",
        sourceName: sources[index] || "출처 없음",
        link: links[index] || "#",
      }));

      setNewsList(formattedNews);
      setIsLoading(false);
    };

    getNews();
  }, []);

  return (
    <News>
      <Header>
        <NewsTitle>뉴스</NewsTitle>
      </Header>
      <Content>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <NewsCard key={`skeleton-${index}`} isLoading />
            ))
          : newsList.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                time={news.time}
                sourceName={news.sourceName}
                link={news.link}
              />
            ))}
      </Content>
    </News>
  );
};

export default NewsCards;

const News = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 777px; */
  height: fit-content;
  flex-shrink: 0;
  margin-bottom: 25.488vh;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-bottom: 1.172vh;
`;

const NewsTitle = styled(S.SubTitle1Typo)``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
