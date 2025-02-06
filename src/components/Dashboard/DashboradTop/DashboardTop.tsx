import styled from "styled-components";
import {BodyTypo, SubTitle3Typo} from "../../../styles/Typography";
import GoogleTrendsWidget from "./googletrendswidget";
import TrendChartList from "./TrendCharList";
import ContentHeader from "../../Common/ContentHeader";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../../api/api";

const DashboardTop = () => {
  const [totalVolume, setTotalVolume] = useState<number | null>(null);
  const [totalCoin, setTotalCoin] = useState<number | null>(null);

  const fetchDashBoardData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.DASHBOARD_OVERVIEW);
      if (response.data.isSuccess) {
        setTotalVolume(response.data.result.totalVolume);
        setTotalCoin(response.data.result.totalCoin);
        console.log("총거래량/코인수 API 응답 데이터:", response.data);
      } else {
        console.error("총거래량 또는 거래된코인수를 가져오는 데 실패했습니다");
      }
    } catch (error) {
      console.error("api 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  const dynamicFontSize = useMemo(() => {
    if (!totalVolume) return "1.875rem"; // 기본 크기
    const length = totalVolume.toString().length;

    if (length <= 6) return "1.875rem"; // 6자리 이하
    if (length <= 9) return "1.5rem";   // 7~9자리
    if (length <= 20) return "1rem"; // 10~12자리
    return "1rem";    
  }, [totalVolume]);

  return (
    <>
    <ContentHeader title="대시보드" description="각 코인의 성과와 비즈니스 성장을 위한 인사이트를 제공합니다."></ContentHeader>
      
    <Container>
      <TopItemWrapper>
      <Item1>
        <Item1TextWrapper>
          <BodyTypo>총 거래량 (24시간)</BodyTypo>
          <DynamicStyledContent $dynamicSize={dynamicFontSize}>
            {totalVolume !== null ? `$${totalVolume.toLocaleString()}` : "Loading..."}
          </DynamicStyledContent>
        </Item1TextWrapper>
        <Image1 src="/assets/common/dashboard-top/Total Volum 3D image.svg" alt="총 거래량" />
      </Item1>

      <Item2>
        <Image2 src="/assets/common/dashboard-top/Trade coin 3D image 2.svg" alt="거래된 코인" />
        <Item2TextWrapper>
          <BodyTypo>거래된 밈 코인</BodyTypo>
          <StyledContent>
            {totalCoin !== null ? `${totalCoin}개` : "Loading..."}
          </StyledContent>
        </Item2TextWrapper>
      </Item2>
      </TopItemWrapper>

      <Item3>
        <Item34TextWrapper>연관 검색어</Item34TextWrapper>
        <GoogleTrendsWidget />
      </Item3>

      <Item4>
        <Item34TextWrapper>트렌드</Item34TextWrapper>
        <TrendChartList />
      </Item4>
    </Container>
    </>
  );
};

export default DashboardTop;

const StyledContent = styled.span`
  font-size: 1.875rem;
  font-weight: var(--font-weight-bold);
  color: white;
  margin: 0;
  padding-top: 0.375rem;
`;
const DynamicStyledContent = styled.span<{ $dynamicSize: string }>`
  font-size: ${({$dynamicSize}) => `${$dynamicSize}px`};
  font-weight: var(--font-weight-bold);
  color: white;
  margin: 0;
  padding-top: 0.375rem;
`;
const BaseItem = styled.section`
  border-radius: 20px;
`;
const BaseTextWrapper = styled(SubTitle3Typo)`
  padding-left: 25px;
`;
const StyledImage = styled.img`
  position: absolute;
  top: 0;
  object-fit: cover;
  pointer-events: none;
`;

const Container = styled.div`
  gap: 25px;
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
  gap: 25px;
  max-width: 537px;
`;

const Item1 = styled(BaseItem)`
  background-color: var(--purple);
  grid-area: Item1;
  height: 10.188rem;
  width: 100%;
  max-width: 310px;
  aspect-ratio: 310 / 163;
  min-width: 0;
  flex: 1;
  position: relative;
  overflow: hidden;
`;
const Item1TextWrapper = styled(BaseTextWrapper)`
  margin-top: 5.125rem;
`;
const Image1 = styled(StyledImage)`
  margin-left: 11.25rem;
  margin-top: 0.188rem;
`;

const Item2 = styled(BaseItem)`
  background-color: var(--pink);
  grid-area: Item2;
  height: 10.188rem;
  width: 100%;
  max-width: 202px;
  aspect-ratio: 202/163;
  position: relative;
  overflow: hidden;
  flex: 1;
`;
const Item2TextWrapper = styled(BaseTextWrapper)`
  margin-top: 5.125rem;
  padding-left: 5.5rem;
  color: white;
  z-index: 1;
  position: relative;
`;
const Image2 = styled(StyledImage)`
  margin-top: -2.563rem;
  margin-left: -1.938rem;
  position: absolute;
`;

const Item3 = styled(BaseItem)`
  background-color: var(--grey-100);
  grid-area: Item3;
  height: 21.688rem;
  width: 100%;
  max-width: 537px;
  aspect-ratio: 537/347;
  overflow: hidden;
  flex: 1;
`;

const Item4 = styled(BaseItem)`
  background-color: var(--grey-100);
  grid-area: Item4;
  height: 33.438rem;
  width: 100%;
  max-width: 518px;
  aspect-ratio: 518/535;
  flex: 1;
`;

const Item34TextWrapper = styled(BaseTextWrapper)`
  color: white;
  padding-top: 1.375rem;
`;