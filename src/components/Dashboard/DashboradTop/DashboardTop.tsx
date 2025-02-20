import styled from "styled-components";
import {
  BodyTypo,
  SubTitle1Typo,
  SubTitle3Typo,
} from "../../../styles/Typography";
import TrendChartList from "./TrendCharList";
import ContentHeader from "../../Commons/ContentHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../../api/api";
import NaverSearchTrend from "./NaverSearchTrend/NaverSearchTrend";

const DashboardTop = () => {
  const [totalVolume, setTotalVolume] = useState<number | null>(null);
  const [totalCoin, setTotalCoin] = useState<number | null>(null);

  const fetchDashBoardData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.DASHBOARD_OVERVIEW);
      if (response.data.isSuccess) {
        setTotalVolume(response.data.result.totalVolume);
        setTotalCoin(response.data.result.totalCoin);
      } else {
        console.error("총거래량 또는 거래된코인수를 가져오는 데 실패했습니다");
      }
    } catch (error) {
      console.error("총거래량/코인수 api 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return (
    <UpperContainer>
      <ContentHeader
        title="대시보드"
        description="각 코인의 성과와 비즈니스 성장을 위한 인사이트를 제공합니다."
      ></ContentHeader>

      <Container>
        <TopItemWrapper>
          <Item1>
            <Item1TextWrapper>
              <Item12Title>총 거래량 (24시간)</Item12Title>
              <StyledContent>
                {totalVolume !== null
                  ? `$${Math.round(totalVolume).toLocaleString()}`
                  : "Loading..."}
              </StyledContent>
            </Item1TextWrapper>
            <Image1
              src="/assets/common/dashboard-top/Total Volum 3D image.svg"
              alt="총 거래량"
            />
          </Item1>

          <Item2>
            <Image2
              src="/assets/common/dashboard-top/Trade coin 3D image 2.svg"
              alt="거래된 코인"
            />
            <Item2TextWrapper>
              <Item12Title>거래된 밈 코인</Item12Title>
              <Item2StyledContent>
                {totalCoin !== null ? `${totalCoin}개` : "Loading..."}
              </Item2StyledContent>
            </Item2TextWrapper>
          </Item2>
        </TopItemWrapper>

        <Item3>
          <Item34TextWrapper>검색량</Item34TextWrapper>
          <NaverSearchTrend />
        </Item3>

        <Item4>
          <Item34TextWrapper>트렌드</Item34TextWrapper>
          <TrendChartList />
        </Item4>
      </Container>
    </UpperContainer>
  );
};

export default DashboardTop;

const UpperContainer = styled.div`
  @media (max-width: 480px) {
    justify-items: center;
    max-width: 100vw;
  }
`;

const BaseItem = styled.section`
  border-radius: 20px;
  width: 100%;
`;
const BaseTextWrapper = styled(SubTitle3Typo)`
  padding-left: 1.563rem;
`;
const StyledContent = styled(SubTitle1Typo).attrs({ as: "span" })`
  color: white;
  margin: 0;
  padding-top: 0.375rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;
const StyledImage = styled.img`
  position: absolute;
  top: 0;
  object-fit: cover;
  pointer-events: none;
`;

const Container = styled.div`
  gap: 1.563rem;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: auto;
  grid-template-areas:
    "top top Item4"
    "Item3 Item3 Item4";
  padding-bottom: 4.625rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "top"
      "Item3"
      "Item4";
    justify-items: center;
  }
`;

const TopItemWrapper = styled.div`
  grid-area: top;
  display: flex;
  gap: 1.563rem;
  max-width: 537px;
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Item12Title = styled(BodyTypo)``;

const Item1 = styled(BaseItem)`
  background-color: var(--purple);
  grid-area: Item1;
  height: 143px;
  width: 100%;
  max-width: 322px;
  aspect-ratio: 322 / 143;
  min-width: 0;
  flex: 1;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 60vw;
  }
`;
const Item1TextWrapper = styled.div`
  margin-top: 4.313rem;
  padding-left: 1.688rem;
  z-index: 1;
  position: relative;

  @media (max-width: 480px) {
    padding-left: 1rem;
  }
`;
const Image1 = styled(StyledImage)`
  margin-left: 8.75rem;
  margin-top: 0.875rem;
  position: absolute;
`;

const Item2 = styled(BaseItem)`
  background-color: var(--pink);
  grid-area: Item2;
  height: 143px;
  width: 100%;
  max-width: 11.875rem;
  aspect-ratio: 190 / 143;
  position: relative;
  overflow: hidden;
  flex: 1;

  @media (max-width: 480px) {
    max-width: 35vw;
  }
`;
const Item2TextWrapper = styled.div`
  margin-top: 4.313rem;
  padding-right: 1.563rem;
  z-index: 1;
  position: relative;
  float: right;
  text-align: right;

  @media (max-width: 480px) {
    max-width: 8rem;
    padding-right: 1rem;
  }
`;
const Item2StyledContent = styled(StyledContent).attrs({ as: "span" })``;
const Image2 = styled(StyledImage)`
  margin-top: -2.563rem;
  margin-left: -1.938rem;
  position: absolute;
`;

const Item3 = styled(BaseItem)`
  background-color: var(--grey-100);
  grid-area: Item3;
  height: 347px;
  width: 100%;
  max-width: 537px;
  aspect-ratio: 537/347;
  overflow: hidden;
  flex: 1;

  @media (max-width: 480px) {
    max-width: 95vw;
    height: 21rem;
    aspect-ratio: 4 / 3;
  }
`;

const Item4 = styled(BaseItem)`
  background-color: var(--grey-100);
  grid-area: Item4;
  height: 515px;
  width: 100%;
  max-width: 518px;
  aspect-ratio: 518/515;
  flex: 1;

  @media (max-width: 480px) {
    max-width: 95vw;
  }
`;

const Item34TextWrapper = styled(BaseTextWrapper)`
  color: white;
  padding-top: 1.375rem;
`;
