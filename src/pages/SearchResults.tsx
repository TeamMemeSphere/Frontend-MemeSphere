import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import * as S from "../styles/Typography";
import { useLocation } from "react-router-dom";
import CoinListHeader from "../components/common/CoinListHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useChangeSortType from "../hooks/common/useChangeSortType";
import CoinRowSkeleton from "../components/common/CoinRowSkeleton";
import CoinCardListSkeleton from "../components/common/CoinCardListSkeleton";
import CoinRowListSkeleton from "../components/common/CoinRowListSkeleton";

const SearchResults = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleViewTypeChange = (viewType : "GRID" | "LIST") => {
    setViewType(viewType);
    setCurrentPage(1);
  }

  const { sortType, sortTypes, changeSortType } = useChangeSortType();

  const location = useLocation();
  const searchKeyword = location.state.keyword || {};

  const getSearchResult = async () => {
    try {
      const response = await axios.get(`http://15.164.103.195/search?searchWord=${searchKeyword}&viewType=${viewType}&sortType=${sortType}&page=${currentPage}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["searchResult", searchKeyword, currentPage, viewType, sortType],
    queryFn: getSearchResult
  });

  return (
    <Container>
      <KeyWordWrapper>
        <ArrowIcon src="/assets/SearchResults/arrow-left.svg" />
        <S.SubTitle1Typo>{searchKeyword}</S.SubTitle1Typo>
        <SearchResultType>검색결과</SearchResultType>
      </KeyWordWrapper>
      <CoinListHeader
        options={sortTypes}
        onOptionChange={changeSortType}
        viewType={viewType}
        onTypeChange={setViewType}
        marginBottom="0.81rem"
      >
      </CoinListHeader>
      {isLoading ?
        (viewType === "GRID" ?
          <CoinCardListSkeleton></CoinCardListSkeleton>
          :
          <CoinRowListSkeleton></CoinRowListSkeleton>
        )
      :
      isError ?
      <div>에러가 발생했습니다...</div>
      :
      <>
        {viewType === "GRID" ?
          <CoinList coins={data?.result?.gridItems} viewType={viewType}></CoinList>
          :
          <CoinList coins={data?.result?.listItems} viewType={viewType}></CoinList>
        }
        <PageSelector
          currentPage={currentPage}
          updateCurrentPage={setCurrentPage}
          totalPages={data.result.totalPage}
        >
        </PageSelector>
      </>
      }
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
  min-height: 100vh;
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