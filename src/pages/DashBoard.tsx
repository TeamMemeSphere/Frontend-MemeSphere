import styled from "styled-components";
import CoinList from "../components/Commons/CoinList.tsx";
import { useState } from "react";
import PageSelector from "../components/Commons/PageSeletor.tsx";
import CoinListHeader from "../components/Commons/CoinListHeader.tsx";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api/api";
import CoinCardListSkeleton from "../components/Commons/CoinCardListSkeleton.tsx";
import CoinRowListSkeleton from "../components/Commons/CoinRowListSkeleton.tsx";
import useChangeSortType from "../hooks/common/useChangeSortType";
import { useAuth } from "../hooks/common/useAuth";
import DashBoardTop from "../components/Dashboard/DashboradTop/DashboardTop";
import axios from "axios";

const DashBoard = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { sortType, sortTypes, changeSortType } = useChangeSortType();

  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken");
  const { isAuthenticated } = useAuth();

  const { DASHBOARD_CHART } = API_ENDPOINTS;

  const getCoinList = async () => {
    try {
      const response = await axios.get(
        `${DASHBOARD_CHART}?viewType=${viewType}&sortType=${sortType}&page=${currentPage}`,
        {
          headers: {
            Authorization: accessToken && `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["DashBoard", currentPage, viewType, sortType, isAuthenticated],
    queryFn: getCoinList,
  });

  const isGridView = viewType === "GRID";

  return (
    <>
      <UpperContainer>
        <DashBoardTop />
      </UpperContainer>

      <UnderContainer>
        <DashBoardUpper>
          <CoinListHeader
            title="차트"
            options={sortTypes}
            onOptionChange={changeSortType}
            viewType={viewType}
            onTypeChange={setViewType}
            marginBottom="1.5rem"
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
        </DashBoardUpper>
      </UnderContainer>
    </>
  );
};

export default DashBoard;

const UpperContainer = styled.div`
  margin: auto;
  overflow-x: hidden;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const UnderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 5.125rem;
  width: min(75vw, 67.5rem);
  margin: auto; 
  height: fit-content;
`;

const DashBoardUpper = styled.div``;
