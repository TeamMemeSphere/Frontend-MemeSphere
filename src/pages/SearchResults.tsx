import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import { Coin } from "../components/common/CoinCard";
import * as S from "../styles/Typography";
import { useLocation } from "react-router-dom";
import CoinListHeader from "../components/common/CoinListHeader";

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
];

const SearchResults = () => {
  const [viewType, setViewType] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = viewType == "card" ? 9 : 20;
  const totalItems = dummyData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleViewTypeChange = () => {
    setViewType(viewType === "card" ? "list" : "card");
    setCurrentPage(1);
  }

  const selectOption = ["MKT cap", "price"];
  const [options, setOptions] = useState<string>("MKT cap");
  const onChangeOption = (value: string) => {
    setOptions(value);
  };

  const location = useLocation();
  const searchKeyword = location.state.keyword || {};

  return (
    <Container>
      <KeyWordWrapper>
        <ArrowIcon src="/assets/SearchResults/arrow-left.svg" />
        <S.SubTitle1Typo>{searchKeyword}</S.SubTitle1Typo>
        <SearchResultType>검색결과</SearchResultType>
      </KeyWordWrapper>
      <CoinListHeader
        options={selectOption}
        onOptionChange={onChangeOption}
        viewType={viewType}
        onTypeChange={handleViewTypeChange}
        marginBottom="0.81rem"
      >
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

export default SearchResults;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 12.5vw 4.5rem 12.5vw;
  width: 100%;
  height: fit-content;
`

const KeyWordWrapper = styled.div`
  display: flex;
  margin-bottom: 0.91rem;
`

const ArrowIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.688rem;
  align-self: center;
`

const SearchResultType = styled(S.BodyTypo)`
  color: var(--white-50);
  margin-left: 0.5rem;
  align-self: end;
`