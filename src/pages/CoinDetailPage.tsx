import styled from "styled-components";
import { TitleTypo } from "../styles/Typography";

import ChartCard from "../components/CoinDetailPage/ChartCard";
import TradingCard from "../components/CoinDetailPage/TradingCard";
import CoinInfoCard from "../components/CoinDetailPage/CoinInfoCard";
import LiveChatCard from "../components/CoinDetailPage/LiveChatCard";
import coinDummy from "../data/coinDummy.json";
import arrow from "../../public/assets/DetailPage/arrow.svg";

const CoinDetailPage = () => {
  const coin = coinDummy[0];

  return (
    <Wrapper>
      <TitleLayout>
        {/* TODO : 뒤로 가기 로직 추가 필요 -> 컴포넌트화 하자! */}
        <Icon src={arrow} alt="뒤로 가기" />
        <TitleTypo>{coin.korean_name} 상세 정보</TitleTypo>
      </TitleLayout>

      <GridWrapper>
        <LeftColumn>
          <CoinInfoCard />
          <LiveChatCard />
        </LeftColumn>

        <RightColumn>
          <ChartCard
            name={coin.korean_name}
            symbol={coin.market}
            tradePrice={coin.tradePrice}
            highPrice={coin.highPrice}
            lowPrice={coin.lowPrice}
            change={coin.change}
            changePrice={coin.changePrice}
            changeRate={coin.changeRate}
            isCollected={coin.isCollected}
            marketCap={coin.marketCap}
            volume={coin.volume}
          />
          <TradingCard />
        </RightColumn>
      </GridWrapper>
    </Wrapper>
  );
};

export default CoinDetailPage;

const Wrapper = styled.div`
  margin-left: 11.25rem;
  margin-right: 11.25rem;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.96fr; /* 좌우 열의 비율 설정 */
  gap: 1.563rem;
  height: auto;
  background-color: var(--background-black);
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.688rem;
  margin-top: 2.031rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
