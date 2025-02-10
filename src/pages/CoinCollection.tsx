import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import CoinListHeader from "../components/common/CoinListHeader";
import ContentHeader from "../components/Common/ContentHeader";
import useChangeSortType from "../hooks/common/useChangeSortType";
import axios from "axios";
import { API_ENDPOINTS } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import CoinCardListSkeleton from "../components/common/CoinCardListSkeleton";
import CoinRowListSkeleton from "../components/common/CoinRowListSkeleton";
import * as S from "../styles/Typography";
import { Icon } from "../components/common/Icon";

const CoinCollection = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { sortType, sortTypes, changeSortType } = useChangeSortType();

  const { COLLECTION } = API_ENDPOINTS;

  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken");

  const getCoinList = async () => {
    try {
      const response = await axios.get(`${COLLECTION}?&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["CoinCollection", currentPage, viewType, sortType, myStorage.getItem("accessToken")],
    queryFn: getCoinList
  });

  console.log(data);

  const noResult = () => {
    return (
      <NoResultWrapper>
        <Icon src="/assets/Collection/empty-box.svg" $margin="0 0 1.125rem 0" />
        <NoResultSubTitle>컬렉션이 비어있습니다.</NoResultSubTitle>
      </NoResultWrapper>
    )
  }

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
      ></CoinListHeader>
      {
        isLoading ?
          (
            viewType === "GRID" ?
              <CoinCardListSkeleton></CoinCardListSkeleton>
              :
              <CoinRowListSkeleton></CoinRowListSkeleton>
          )
          :
          isError ?
            <div>에러가 발생했습니다.</div>
            :
            <>
              {data.result.totalElements === 0 && noResult()}
              <CoinList
                coins={data.result.collectionItems}
                viewType={viewType}
              ></CoinList>
              <PageSelector
                currentPage={currentPage}
                updateCurrentPage={setCurrentPage}
                totalPages={data.result.totalPage}
              ></PageSelector>
            </>
      }
    </Container>
  );
};

export default CoinCollection;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 12.24vw 4.5rem 12.24vw;
  width: 100%;
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
`

const NoResultSubTitle = styled(S.SubTitle2Typo)`
  color: var(--white-50);
`
