import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import ViewTypeButton from "../components/common/ViewTypeButton";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import { Coin } from "../components/common/CoinCard";
import * as S from "../styles/Typography";

const dummyData: Coin[] = [
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },{
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },{
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },{
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },{
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },{
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "HDVS",
    symbol: "KHEA",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "NDVS",
    symbol: "SDFG",
    tradePrice: 164,
    highPrice: 191,
    lowPrice: 123,
    change: "RISE",
    changePrice: 76,
    changeRate: 46.3,
    marketCap: 23000,
    volume: 250000
  },{
    name: "DOGE",
    symbol: "USDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000
  },
  {
    name: "QWER",
    symbol: "ASDF",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000
  },
];

const DashBoard = () => {
  const [viewType, setViewType] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = viewType == "card" ? 9 : 20;
  const totalItems = dummyData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleViewTypeChange = () => {
    setViewType(viewType === "card" ? "list" : "card");
    setCurrentPage(1);
  }

  return (
    <Container>
      <h3>DashBoard</h3>
      <CoinListHeader>
        <S.SubTitle1Typo>차트</S.SubTitle1Typo>
        <ViewTypeButton viewType={viewType} onClick={handleViewTypeChange} isActive={true}></ViewTypeButton>
      </CoinListHeader>
      <CoinList coins={dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} viewType={viewType}></CoinList>
      <PageSelector
        currentPage={currentPage}
        updateCurrentPage={setCurrentPage}
        totalPages={totalPages}
        limit={itemsPerPage}>
      </PageSelector>
    </Container>
  );
};

export default DashBoard;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 143px 12.5vw;
  width: 100%;
  height: fit-content;
`

const CoinListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
`