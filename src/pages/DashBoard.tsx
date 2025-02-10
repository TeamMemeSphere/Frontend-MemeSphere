import styled from "styled-components";
import CoinList from "../components/Common/CoinList";
import { useEffect, useState } from "react";
import PageSelector from "../components/Common/PageSeletor";
import CoinListHeader from "../components/Common/CoinListHeader";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api/api";
import CoinCardListSkeleton from "../components/common/CoinCardListSkeleton";
import CoinRowListSkeleton from "../components/common/CoinRowListSkeleton";
import useChangeSortType from "../hooks/common/useChangeSortType";
//주현
import DashBoardTop from "../components/Dashboard/DashboradTop/DashboardTop";
import axios from "axios";

const DashBoard = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { sortType, sortTypes, changeSortType } = useChangeSortType();

  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken");

  const { DASHBOARD_CHART } = API_ENDPOINTS;

  const getCoinList = async () => {
    try {
      const response = await axios.get(`${DASHBOARD_CHART}?viewType=${viewType}&sortType=${sortType}&page=${currentPage}`,
        {
          headers: {
            Authorization: accessToken && `Bearer ${accessToken}`,
          },
        }
      )
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["DashBoard", currentPage, viewType, sortType, myStorage.getItem("accessToken")],
    queryFn: getCoinList
  });

  console.log(data);

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
          >
          </CoinListHeader>
          {isLoading ?
            (viewType === "GRID" ?
              <CoinCardListSkeleton></CoinCardListSkeleton>
              :
              <CoinRowListSkeleton></CoinRowListSkeleton>
            )
            : isError ?
              <div>에러가 발생했습니다...</div>
              :
              <>
                {viewType == "GRID" ? (
                  <CoinList coins={data?.result?.gridItems} viewType={viewType}></CoinList>
                ) : (
                  <CoinList coins={data?.result?.listItems} viewType={viewType}></CoinList>
                )}
                <PageSelector
                  currentPage={currentPage}
                  updateCurrentPage={setCurrentPage}
                  totalPages={data.result.totalPage}>
                </PageSelector>
              </>
          }
        </DashBoardUpper>
      </UnderContainer>
    </>
  );
};

export default DashBoard;

const UpperContainer = styled.div`
  margin: auto;
`;

// const UnderContainer = styled.div`
//   margin: auto;
//   gap: 1.736vw;
//   padding: 1.938rem 12.5vw 4.5rem 12.5vw; 

//   @media (max-width: 768px) {
//     padding: 1.938rem 0 4.5rem 0;
//   }
// `;

const UnderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 12.24vw 4.5rem 12.24vw;
  width: 100%;
  height: fit-content;
`

const DashBoardUpper = styled.div`

`;