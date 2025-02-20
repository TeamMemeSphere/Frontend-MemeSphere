import styled from "styled-components";
import CoinList from "../components/Commons/CoinList.tsx";
import { useRef, useState } from "react";
import PageSelector from "../components/Commons/PageSeletor.tsx";
import * as S from "../styles/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import CoinListHeader from "../components/Commons/CoinListHeader.tsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useChangeSortType from "../hooks/common/useChangeSortType";
import CoinCardListSkeleton from "../components/Commons/CoinCardListSkeleton.tsx";
import CoinRowListSkeleton from "../components/Commons/CoinRowListSkeleton.tsx";
import { Icon } from "../components/Commons/Icon.tsx";
import { API_ENDPOINTS } from "../api/api.ts";
import { useAuth } from "../hooks/common/useAuth.ts";

const SearchResults = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { sortType, sortTypes, changeSortType } = useChangeSortType();

  const location = useLocation();
  const searchKeyword = location?.state?.keyword || "";

  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken");
  const { isAuthenticated } = useAuth();

  const { SEARCH } = API_ENDPOINTS;

  const navigate = useNavigate();

  const getSearchResult = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(
          `${SEARCH}?searchWord=${searchKeyword}&viewType=${viewType}&sortType=${sortType}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        return response.data;
      } else {
        const response = await axios.get(
          `${SEARCH}?searchWord=${searchKeyword}&viewType=${viewType}&sortType=${sortType}&page=${currentPage}`,
        );
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: [
      "SearchResults",
      searchKeyword,
      currentPage,
      viewType,
      sortType,
      isAuthenticated,
    ],
    queryFn: getSearchResult,
  });

  const noResult = () => {
    return (
      <NoResultWrapper>
        <Icon
          src="/assets/SearchResults/search-magnifier-white.svg"
          $margin="0 0 2rem 0"
        />
        <S.SubTitle1Typo>검색 결과가 없습니다.</S.SubTitle1Typo>
        <NoResultSubTitle>
          적용된 필터나 검색어를 변경해보세요.
        </NoResultSubTitle>
      </NoResultWrapper>
    );
  };

  const isGridView = viewType === "GRID";

  const CoinListHeaderRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <KeyWordWrapper>
        <ArrowIcon
          src="/assets/SearchResults/arrow-left.svg"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <S.SubTitle1Typo>{searchKeyword}</S.SubTitle1Typo>
        <SearchResultType>검색결과</SearchResultType>
      </KeyWordWrapper>
      <CoinListHeader
        options={sortTypes}
        onOptionChange={changeSortType}
        viewType={viewType}
        onTypeChange={setViewType}
        marginBottom="0.81rem"
        ref={CoinListHeaderRef}
        setCurrentPage={setCurrentPage}
      ></CoinListHeader>
      {isLoading ? (
        isGridView ? (
          <CoinCardListSkeleton></CoinCardListSkeleton>
        ) : (
          <CoinRowListSkeleton></CoinRowListSkeleton>
        )
      ) : isError ? (
        <div>에러가 발생했습니다...</div>
      ) : data.result.totalElements === 0 ? (
        noResult()
      ) : (
        <>
          <CoinList
            coins={
              isGridView ? data?.result?.gridItems : data?.result?.listItems
            }
            viewType={viewType}
          ></CoinList>
          <PageSelector
            currentPage={currentPage}
            updateCurrentPage={setCurrentPage}
            totalPages={data.result.totalPage}
          ></PageSelector>
        </>
      )}
    </Container>
  );
};

export default SearchResults;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 0 4.5rem 0;
  width: min(75vw, 67.5rem);
  height: fit-content;
  margin: auto;
  min-height: 100vh;
`;
const KeyWordWrapper = styled.div`
  display: flex;
  margin-bottom: 0.91rem;
`;

const ArrowIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.688rem;
  align-self: center;
`;

const SearchResultType = styled(S.BodyTypo)`
  color: var(--white-50);
  margin-left: 0.5rem;
  align-self: end;
`;

const NoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
`;

const NoResultSubTitle = styled(S.BodyTypo)`
  color: var(--white-50);
  margin-top: 0.875rem;
`;
