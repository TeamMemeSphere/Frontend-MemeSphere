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
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = viewType == "GRID" ? 9 : 20;
  const totalItems = dummyData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleViewTypeChange = () => {
    setViewType(viewType === "GRID" ? "LIST" : "GRID");
    setCurrentPage(1);
  };

  const selectOption = ["PRICE_CHANGE", "VOLUME_24H", "PRICE"];
  const [options, setOptions] = useState<string>("PRICE_CHANGE");
  const onChangeOption = (value: string) => {
    setOptions(value);
  };

  return (
    <>
    <UpperContainer>
      <DashBoardTop />
    </UpperContainer>
    <UnderContainer>

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
          totalPages={totalPages}>
        </PageSelector>
      </DashBoardUpper>
    </UnderContainer>
    </>
  );
};

export default DashBoard;

const UpperContainer = styled.div `
  margin: auto;
`;

const UnderContainer = styled.div`
  margin: auto;
  gap: 1.736vw;
  padding: 1.938rem 12.5vw 4.5rem 12.5vw; 

  @media (max-width: 768px) {
    padding: 1.938rem 0 4.5rem 0;
  }
`;

const DashBoardUpper = styled.div`

`;