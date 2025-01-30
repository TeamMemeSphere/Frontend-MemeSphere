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

  useEffect(() => {
    const getNews = async () => {
      const rawNews = await fetchNewsFromRSS(); // 데이터를 가져옴 (타이틀, 날짜 등)

      // 데이터를 객체로 변환하면서 고유 ID 추가
      const formattedNews = rawNews[0].map((title: string, index: number) => ({
        id: `news-${index}`, // 고유 ID 추가
        title, // 타이틀
        time: rawNews[1][index], // 날짜
        sourceName: rawNews[2][index], // 출처 이름
        link: rawNews[3][index], // 링크
      }));

      setNewsList(formattedNews); // 뉴스 리스트 업데이트
    };

    getNews();
  }, []);

  return (
    <News>
      <Header>
        <NewsTitle>뉴스</NewsTitle>
      </Header>
      <Content>
        {newsList.length === 0 ? (
          <p>뉴스를 불러오는 중...</p>
        ) : (
          newsList.map((news) => (
            <NewsCard
              key={news.id} // 고유 ID를 key로 사용
              title={news.title}
              time={news.time}
              sourceName={news.sourceName}
              link={news.link}
            />
          ))
        )}
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
