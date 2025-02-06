import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import { Coin } from "../components/common/CoinCard";
import * as S from "../styles/Typography";
import { useLocation } from "react-router-dom";
import CoinListHeader from "../components/common/CoinListHeader";
import dummyData from "../data/coinCardDummy.json";

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

  const selectOption = ["PRICE_CHANGE", "VOLUME_24H", "PRICE"];
  const [options, setOptions] = useState<string>("PRICE_CHANGE");
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
  padding: 1.938rem 12.24vw 4.5rem 12.24vw;
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