import FearGreedIndex from "../components/Community/FearGreedIndex";
import NewsCards from "../components/Community/NewsCards.tsx";
import CoinTalk from "../components/Community/CoinTalk.tsx";

import ContentHeader from "../components/Common/ContentHeader.tsx";
import styled from "styled-components";
import * as S from "./../styles/Typography.ts";
import { useState, useEffect } from "react";
import { chatInfo, coinInfo } from "../components/Community/communityTypes.ts";
import SkeletonCoinChat from "../components/Community/SkeletonCoinChat.tsx";

const chatData : chatInfo[] = [
  {
    id: 1,
    memeCoin: "dogecoin",
    nickname : "코인하는 다람쥐",
    createdAt : "8시간 전",
    message : "도지코인 1달러 진입은 이번 사이클에 충분히 가능하지 않을까요?\n일론머스크의 X나 테슬라 자동차 구매용으로 사용할 수도 있을 것 같고...",
    likes : 25
  },
  {
    id:2,
    memeCoin: "Pepe",
    nickname : "낭만자객",
    createdAt : "8시간 전",
    message : "페페가 시바이누를 추월할 것 같은 느낌\n페페 0.0307 시바 0.0338 빗썸에서의 가격입니다. 조만간 역전할 것 같은 느낌입니다. 시바는 몇번 상승할 순간마다 번번히 좌절을 맛보았죠.",
    likes : 25
  }
];
  
  const coinData : coinInfo[] = [
    {
      id : 1,
      name : "도지코인",
      symbol : "DOGE",
      image : "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo : chatData[0]
    },
    {
      id : 2,
      name : "페페",
      symbol : "PEPE",
      image : "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo : chatData[1]
    },
    {
      id : 3,
      name : "봉크",
      symbol : "BONK",
      image : "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
    },
    {
      id : 4,
      name : "페페",
      symbol : "PEPE",
      image : "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo : chatData[1]
    },
    {
      id : 5,
      name : "페페",
      symbol : "PEPE",
      image : "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo : chatData[1]
    },
    {
      id : 6,
      name : "페페",
      symbol : "PEPE",
      image : "https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg",
      chatInfo : chatData[1]
    },
  
];
const Community = () => {
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const timer = setTimeout(()=> {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  },[]);

  return (
    <CommunityDiv>
      <ContentHeader title="커뮤니티" description="밈 코인에 대한 아이디어를 다른 유저들과 공유해보세요."></ContentHeader>
      <Content>
        <LeftSide>
          <FearGreedIndex value={73}></FearGreedIndex>
          <NewsCards></NewsCards>
        </LeftSide>
        <RightSide>{loading
        ? coinData.map((coin)=>{
            return <SkeletonCoinChat key={coin.id}></SkeletonCoinChat>;
          })
        : coinData.map((coin)=> { 
          return <CoinTalk 
            key = {coin.id}
            id = {coin.id}
            name = {coin.name}
            symbol= {coin.symbol}
            image= {coin.image}
            chatInfo={coin.chatInfo}
        ></CoinTalk>;
        })}
        </RightSide>
      </Content>
    </CommunityDiv>
  );
};

export default Community;


const CommunityDiv = styled.div`
  margin : auto;
`;

const Content = styled.div`
  display : flex;
  gap : 1.736vw;
`;
const LeftSide = styled.div`
  width : 19.375rem;
  display : flex;
  flex-direction : column;
  gap : 4.297vh;
`;

const RightSide = styled.div`
  display : flex;
  flex-direction : column;
  width: 49.931vw;
  gap : 1.953vh;
`;
