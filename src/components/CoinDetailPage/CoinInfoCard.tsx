import styled from "styled-components";
import { CommonCard } from "./CommonCardStyle";
import { SubTitle2Typo, SmallCaptionTypo } from "../../styles/Typography";
import coinDummy from "../../data/coinDummy.json";
import CoinCircleImg from "../../../public/assets/DetailPage/CoinProfile.png";
import { CaptionTypoMedium } from "../../styles/Typography";

const CoinInfoCard = () => {
  const coin = coinDummy[0];

  return (
    <>
      <CardLayout>
        <MarginFlexContainer>
          <CircleImageWrapper>
            <Image src={CoinCircleImg} alt="밈코인 프로필 사진" />
          </CircleImageWrapper>
        </MarginFlexContainer>

        <FlexContainer>
          <StyledSubTitle2>{coin.korean_name}</StyledSubTitle2>
          <StyledSmallCaption>{coin.english_name}</StyledSmallCaption>
        </FlexContainer>
        <FlexContainer>
          <StyledCaption>
            빌리 마커스와 잭슨 팔머가 2013년 12월에 라이트코인을 기반으로 만든
            오픈 소스 디지털 화폐입니다.
          </StyledCaption>
        </FlexContainer>
      </CardLayout>
    </>
  );
};

export default CoinInfoCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 24.722vw;
  height: auto;
  margin-top: 0.813rem;
  margin-bottom: 26px;
`;

const StyledSubTitle2 = styled(SubTitle2Typo)`
  text-align: center;
`;

const StyledSmallCaption = styled(SmallCaptionTypo)`
  text-align: center;
  color: var(--white-50);
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
`;

const MarginFlexContainer = styled(FlexContainer)`
  margin-top: 6.296vh;
  margin-bottom: 2.963vh;
`;

const CircleImageWrapper = styled.div`
  width: 6.875rem;
  height: 6.875rem;
  border-radius: 50%;
  background: var(--yellow);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 6.337rem;
  height: 6.337rem;
  border-radius: 50%;
`;

const StyledCaption = styled(CaptionTypoMedium)`
  text-align: center;
  width: 21.25vw;
  margin-bottom: 3.704vh;
  margin-top: 0.926vh;
`;
