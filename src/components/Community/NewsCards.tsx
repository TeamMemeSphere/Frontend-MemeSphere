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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const getNews = async () => {
      const rawNews = await fetchNewsFromRSS(); // 데이터를 가져옴 (타이틀, 날짜 등)

      // 데이터를 객체로 변환하면서 고유 ID 추가
      const formattedNews = rawNews[0].map((title: string, index: number) => ({
        id: `news-${index}`,
        title,
        time: rawNews[1][index],
        sourceName: rawNews[2][index],
        link: rawNews[3][index],
      }));

      setNewsList(formattedNews);
      setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 변경
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
  width: 19.375rem;
  height: 777px;
  flex-shrink: 0;
  margin-bottom: 25.488vh;
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
