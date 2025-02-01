import styled from "styled-components";
import CoinList from "../components/Common/CoinList";
import { useState } from "react";
import PageSelector from "../components/Common/PageSeletor";
import CoinListHeader from "../components/Common/CoinListHeader";
//주현
import DashBoardTop from "../components/Dashboard/DashboradTop/DashboardTop";
import ContentHeader from "../components/Common/ContentHeader";
import dummyData from "../data/coinCardDummy.json";

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

  const selectOption = ["PRICE_CHANGE", "VOLUME_24H", "PRICE"];
  const [options, setOptions] = useState<string>("PRICE_CHANGE");
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

// 대시보드와 동일한 레이아웃 적용 시
// const Container = styled.div`
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   padding: 1.938rem 12.24vw 4.5rem 12.24vw;
//   width: 100%;
//   height: fit-content;
// `

const DashBoardUpper = styled.div`

`;