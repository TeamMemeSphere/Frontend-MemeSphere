import styled from "styled-components";
import CoinList from "../components/Commons/CoinList.tsx";
import { useState } from "react";
import PageSelector from "../components/Commons/PageSeletor.tsx";
import CoinListHeader from "../components/Commons/CoinListHeader.tsx";
import ContentHeader from "../components/Commons/ContentHeader.tsx";
import useChangeSortType from "../hooks/common/useChangeSortType";
import axios from "axios";
import { API_ENDPOINTS } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import CoinCardListSkeleton from "../components/Commons/CoinCardListSkeleton.tsx";
import CoinRowListSkeleton from "../components/Commons/CoinRowListSkeleton.tsx";
import * as S from "../styles/Typography";
import { Icon } from "../components/Commons/Icon.tsx";
import { useAuth } from "../hooks/common/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const CoinCollection = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { sortType, sortTypes, changeSortType } = useChangeSortType();

  const { COLLECTION } = API_ENDPOINTS;

  const { isAuthenticated } = useAuth();
  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken");
  const navigate = useNavigate();

  const location = useLocation();

  const getCoinList = async () => {
    if (!accessToken) {
      return;
    }
    try {
      const response = await axios.get(
        `${COLLECTION}?&viewType=${viewType}&sortType=${sortType}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: [
      "CoinCollection",
      currentPage,
      viewType,
      sortType,
      isAuthenticated,
    ],
    queryFn: getCoinList,
  });

  const noResult = () => {
    return (
      <NoResultWrapper>
        <Icon src="/assets/Collection/empty-box.svg" $margin="0 0 1.125rem 0" />
        <NoResultSubTitle>컬렉션이 비어있습니다.</NoResultSubTitle>
      </NoResultWrapper>
    );
  };

  const notAuthenticated = () => {
    return (
      <NoResultWrapper>
        <Icon src="/assets/Collection/empty-box.svg" $margin="0 0 1.125rem 0" />
        <NoResultSubTitle>로그인 후 이용해주세요.</NoResultSubTitle>
      </NoResultWrapper>
    );
  }

  const isGridView = viewType === "GRID";

  return (
    <Container>
      <ContentHeader
        title="컬렉션"
        description="관심있는 밈 코인을 모아보세요."
      />
      <CoinListHeader
        options={sortTypes}
        onOptionChange={changeSortType}
        viewType={viewType}
        onTypeChange={setViewType}
        marginBottom="0.813rem"
        setCurrentPage={setCurrentPage}
      ></CoinListHeader>
      {
        !isAuthenticated ?
          notAuthenticated()
          :
          (
            isLoading ? (
              isGridView ? (
                <CoinCardListSkeleton></CoinCardListSkeleton>
              ) : (
                <CoinRowListSkeleton></CoinRowListSkeleton>
              )
            ) : isError ? (
              <div>에러가 발생했습니다.</div>
            ) : (
              <>
                {data.result.totalElements === 0 && noResult()}
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
            )
          )
      }
    </Container>
  );
};

export default CoinCollection;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 0 4.5rem 0;
  width: min(75vw, 67.5rem);
  margin: auto;
  height: fit-content;
  min-height: 100vh;
`;

const NoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
`;

const NoResultSubTitle = styled(S.SubTitle2Typo)`
  color: var(--white-50);
`;
