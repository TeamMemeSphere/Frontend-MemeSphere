import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import CoinListHeader from "../components/common/CoinListHeader";
import ContentHeader from "../components/Common/ContentHeader";
import dummyData from "../data/coinCardDummy.json";

const CoinCollection = () => {
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

  return (
    <Container>
      <ContentHeader title="컬렉션" description="관심있는 밈 코인을 모아보세요." />
      <CoinListHeader
        options={selectOption}
        onOptionChange={onChangeOption}
        viewType={viewType}
        onTypeChange={handleViewTypeChange}
        marginBottom="0.813rem"
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

export default CoinCollection;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.938rem 12.24vw 4.5rem 12.24vw;
  width: 100%;
  height: fit-content;
`