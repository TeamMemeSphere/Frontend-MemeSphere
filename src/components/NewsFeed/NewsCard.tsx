import React, { useState, useEffect } from "react";
import { fetchNewsFromRSS } from "../../utils/rssParser";
import styled from "styled-components";

// 뉴스 제목을 받는 NewsCard 컴포넌트의 Props 타입 정의
interface NewsCardProps {
  title: string;
}

const NewsCardContainer = ({ title }: NewsCardProps) => {
  const [newsTitles, setNewsTitles] = useState<string[]>([]);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 뉴스 제목을 가져옵니다.
    const getNews = async () => {
      const news = await fetchNewsFromRSS();
      setNewsTitles(news); // 상태에 뉴스 제목을 저장합니다.
    };

    getNews();
  }, []);

  return (
    <Wrapper>
      <div style={{ color: "white" }}>
        {newsTitles.length === 0 ? (
          <p>뉴스를 불러오는 중...</p>
        ) : (
          newsTitles.map((title, index) => <h3 key={index}>{title}</h3>)
        )}
      </div>
    </Wrapper>
  );
};

export default NewsCardContainer;

const Wrapper = styled.div`
  width: 21.375rem;
  height: 19.875rem;
`;
