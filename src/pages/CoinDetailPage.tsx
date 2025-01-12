import styled from "styled-components";
import { TitleTypo } from "../styles/Typography";

import ChartCard from "../components/CoinDetailPage/ChartCard";
import TradingCard from "../components/CoinDetailPage/TradingCard";

import coinDummy from "../data/coinDummy.json";

const CoinDetailPage = () => {
  const coin = coinDummy[0];
  return (
    <>
      <TitleLayout>
        <TitleTypo>{coin.korean_name} 상세 정보</TitleTypo>
      </TitleLayout>
      <ChartCard />
      <TradingCard />
    </>
  );
};

export default CoinDetailPage;

// styled-components
const TitleLayout = styled.div``;
