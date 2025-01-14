import FearGreedIndex from "../components/Community/FearGreedIndex";
import NewsCards from "../components/Community/NewsCards.tsx";
import CoinTalk from "../components/Community/CoinTalk.tsx";

import ContentHeader from "../components/Common/ContentHeader.tsx";
import styled from "styled-components";
import * as S from "./../styles/Typography.ts";

import { chatInfo } from "../components/Community/chatInfo.ts";
import FilterSelect from "../components/Common/FilterSelect.tsx";


const Community = () => {
  const chatData : chatInfo = {
    author : "코인하는 다람쥐",
    time : "8시간 전",
    content : "도지코인 1달러 진입은 이번 사이클에 충분히 가능하지 않을까요?\n일론머스크의 X나 테슬라 자동차 구매용으로 사용할 수도 있을 것 같고...",
    like : 25
  };

  return (
    <CommunityDiv>
      <ContentHeader title="커뮤니티" description="밈 코인에 대한 아이디어를 다른 유저들과 공유해보세요."></ContentHeader>
      <Content>
        <LeftSide>
          <FearGreedIndex value={73}></FearGreedIndex>
          <NewsCards></NewsCards>
        </LeftSide>
        <RightSide>
          <CoinTalk id={1} name="도지코인" symbol="DOGE"></CoinTalk>
          <CoinTalk id={1} name="도지코인" symbol="DOGE"></CoinTalk>
          <CoinTalk id={1} name="도지코인" symbol="DOGE"></CoinTalk>
          <CoinTalk id={1} name="도지코인" symbol="DOGE" chatInfo={chatData}></CoinTalk>
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