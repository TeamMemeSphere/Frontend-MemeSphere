import FearGreedIndex from "../components/Community/FearGreedIndex";
import NewsCards from "../components/Community/NewsCards.tsx";
import CoinTalk from "../components/Community/CoinTalk.tsx";
import ContentHeader from "../components/Common/ContentHeader.tsx";
import styled from "styled-components";
import * as S from "./../styles/Typography.ts";
import { chatInfo, coinInfo } from "../components/Community/communityTypes.ts";

const Community = () => {
  const chatData: chatInfo[] = [
    {
      author: "코인하는 다람쥐",
      time: "8시간 전",
      content:
        "도지코인 1달러 진입은 이번 사이클에 충분히 가능하지 않을까요?\n일론머스크의 X나 테슬라 자동차 구매용으로 사용할 수도 있을 것 같고...",
      like: 25,
    },
    {
      author: "낭만자객",
      time: "8시간 전",
      content:
        "페페가 시바이누를 추월할 것 같은 느낌\n페페 0.0307 시바 0.0338 빗썸에서의 가격입니다. 조만간 역전할 것 같은 느낌입니다. 시바는 몇번 상승할 순간마다 번번히 좌절을 맛보았죠.",
      like: 25,
    },
  ];

  const coinData: coinInfo[] = [
    {
      id: 1,
      name: "도지코인",
      symbol: "DOGE",
      imgSrc: "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo: chatData[0],
    },
    {
      id: 2,
      name: "페페",
      symbol: "PEPE",
      imgSrc: "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo: chatData[1],
    },
    {
      id: 3,
      name: "봉크",
      symbol: "BONK",
      imgSrc: "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
    },
  ];

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
          {coinData.map((coin) => (
            <CoinTalk
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              imgSrc={coin.imgSrc}
              chatInfo={coin.chatInfo}
            />
          ))}
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
