import styled from "styled-components";
import CoinList from "../components/Common/CoinList";
import { useState } from "react";
import PageSelector from "../components/Common/PageSeletor";
import { Coin } from "../components/common/CoinCard";
import CoinListHeader from "../components/Common/CoinListHeader";
//주현
import DashBoardTop from "../components/Dashboard/DashboradTop/DashboardTop";
import ContentHeader from "../components/Common/ContentHeader";

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
  };

  const selectOption = ["MKT cap", "price"];
  const [options, setOptions] = useState<string>("MKT cap");
  const onChangeOption = (value: string) => {
    setOptions(value);
  };

  return (
    <Container>
      <ContentHeader title="대시보드" description="각 코인의 성과와 비즈니스 성장을 위한 인사이트를 제공합니다."></ContentHeader>
      <DashBoardTop />
      <DashBoardUpper>
        <CoinListHeader
          title="차트"
          options={selectOption}
          onOptionChange={onChangeOption}
          viewType={viewType}
          onTypeChange={handleViewTypeChange}
          marginBottom="1.5rem"
        >
        </CoinListHeader>
        <CoinList coins={dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} viewType={viewType}></CoinList>
        <PageSelector
          currentPage={currentPage}
          updateCurrentPage={setCurrentPage}
          totalPages={totalPages}
          limit={itemsPerPage}>
        </PageSelector>
      </DashBoardUpper>
    </Container>
  );
};

export default DashBoard;

{/* const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 12.5vw;
  width: 100%;
  height: fit-content;
  margin : auto;
`; */}

const Container = styled.div`
  margin: auto;
  gap: 1.736vw;
  width: 67.5rem;
  padding: 1.938rem 12.5vw 4.5rem 12.5vw;
`;

const DashBoardUpper = styled.div`

`;