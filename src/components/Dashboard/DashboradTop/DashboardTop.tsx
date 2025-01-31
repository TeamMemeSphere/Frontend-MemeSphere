import styled from "styled-components";
import TrendChartList from "./TrendCharList";
import {BodyTypo, SubTitle3Typo} from "../../../styles/Typography";

const DashboardTop = () => {
  return (
    <Container>
      <Item1>
        <Item1TextWrapper>
          <BodyTypo>총 거래량 (24시간)</BodyTypo>
          <StyledContent>$ 29,960</StyledContent>
        </Item1TextWrapper>
        <Image1 src="/assets/common/dashboard-top/Total Volum 3D image.svg" alt="총 거래량" />
      </Item1>

      <Item2>
        <Image2 src="/assets/common/dashboard-top/Trade coin 3D image 2.svg" alt="거래된 코인" />
        <Item2TextWrapper>
          <BodyTypo>거래된 밈 코인</BodyTypo>
          <StyledContent>125개</StyledContent>
        </Item2TextWrapper>
      </Item2>

      <Item3>
        <Item34TextWrapper>연관 검색어</Item34TextWrapper>
      </Item3>

      <Item4>
        <Item34TextWrapper>트렌드</Item34TextWrapper>
        <TrendChartList />
      </Item4>
    </Container>
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

// 그리드
const Container = styled.div`
  backgroud-color: white;
  gap: 25px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "Item1 Item2 Item4"
    "Item3 Item3 Item4";
  padding-bottom: 4.625rem;
`;

// 각 코너 스타일링
const Item1 = styled(BaseItem)`
  background-color: var(--purple);
  grid-area: Item1;
  height: 10.188rem;
  aspect-ratio: 310/163;
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
  aspect-ratio: 202/163;
  position: relative;
  overflow: hidden;
`;
const Item2TextWrapper = styled(BaseTextWrapper)`
  margin-top: 5.125rem;
  padding-left: 5.5rem;
  color: white;
  z-index: 1;
  position: absolute;
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
  aspect-ratio: 537/347;
`;

const Item4 = styled(BaseItem)`
  background-color: var(--grey-100);
  grid-area: Item4;
  height: 33.438rem;
  aspect-ratio: 518/535;
`;

const Item34TextWrapper = styled(BaseTextWrapper)`
  color: white;
  padding-top: 1.375rem;
`;