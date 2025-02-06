import styled from "styled-components";
import CoinList from "../components/common/CoinList";
import { useState } from "react";
import PageSelector from "../components/common/PageSeletor";
import CoinListHeader from "../components/common/CoinListHeader";
import ContentHeader from "../components/Common/ContentHeader";
<<<<<<< HEAD

export const dummyData: Coin[] = [
  {
    name: "DOGE",
    symbol: "DOGEUSDT",
    tradePrice: 4634,
    highPrice: 4891,
    lowPrice: 4213,
    change: "FALL",
    changePrice: -142,
    changeRate: -3.1,
    isCollected: true,
    marketCap: 23000,
    volume: 250000,
  },
  {
    name: "BONK",
    symbol: "BONKUSDT",
    tradePrice: 4212,
    highPrice: 4291,
    lowPrice: 4123,
    change: "RISE",
    changePrice: 721,
    changeRate: 17.1,
    marketCap: 23000,
    volume: 250000,
  },
  {
    name: "PEPE",
    symbol: "PEPEUSDT",
    tradePrice: 2413,
    highPrice: 2491,
    lowPrice: 2123,
    change: "EVEN",
    changePrice: 0,
    changeRate: 0,
    marketCap: 23000,
    volume: 250000,
  },
];
=======
import dummyData from "../data/coinCardDummy.json";
>>>>>>> 05cca46da2360a33223e935f3852239edee4175b

const CoinCollection = () => {
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
<<<<<<< HEAD
      <ContentHeader
        title="컬렉션"
        description="관심있는 밈 코인을 모아보세요."
      />
      {/* <PageTitle>컬렉션</PageTitle>
      <PageDescription>관심있는 밈 코인을 모아보세요.</PageDescription> */}
=======
      <ContentHeader title="컬렉션" description="관심있는 밈 코인을 모아보세요." />
>>>>>>> 05cca46da2360a33223e935f3852239edee4175b
      <CoinListHeader
        options={selectOption}
        onOptionChange={onChangeOption}
        viewType={viewType}
        onTypeChange={handleViewTypeChange}
        marginBottom="0.813rem"
      ></CoinListHeader>
      <CoinList
        coins={dummyData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )}
        viewType={viewType}
      ></CoinList>
      <PageSelector
        currentPage={currentPage}
        updateCurrentPage={setCurrentPage}
        totalPages={totalPages}
        limit={itemsPerPage}
      ></PageSelector>
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
<<<<<<< HEAD
`;

const PageTitle = styled(S.TitleTypo)`
  margin-bottom: 0.375rem;
`;

const PageDescription = styled(S.BodyTypo)`
  color: var(--white-50);
  margin-bottom: 1.188rem;
`;
=======
`
>>>>>>> 05cca46da2360a33223e935f3852239edee4175b
