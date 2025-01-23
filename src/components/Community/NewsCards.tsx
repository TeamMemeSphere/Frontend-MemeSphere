import { useState, useEffect } from "react";
import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import NewsCard from "./NewsCard.tsx";
import { fetchNewsFromRSS } from "../../utils/rssParser.ts";

export type news = {
  id: number;
  article: string;
  sourceName: string;
  time: string;
};
const NewsCards: React.FC = () => {
  const [titleList, setTitleList] = useState<string[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [sourceList, setSourceList] = useState<string[]>([]);
  const [linkList, setLinkList] = useState<string[]>([]);
  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNewsFromRSS();
      console.log("news", news);
      setTitleList(news[0]);
      setDateList(news[1]);
      setSourceList(news[2]);
      setLinkList(news[3]);
    };

    getNews();
  }, []);

  return (
    <News>
      <Header>
        <NewsTitle>뉴스</NewsTitle>
      </Header>
      <Content>
        {titleList.length === 0 ? (
          <p>뉴스를 불러오는 중...</p>
        ) : (
          titleList.map((title, index) => (
            <NewsCard
              title={title}
              time={dateList[index]}
              sourceName={sourceList[index]}
              link={linkList[index]}
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
