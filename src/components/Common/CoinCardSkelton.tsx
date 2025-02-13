import styled, { keyframes } from "styled-components"

const CoinCardSkelton = () => {
  return (
    <Container>
      <HeaderSection>
        <ThumbnailWrapper>
        </ThumbnailWrapper>
        <NameWrapper>
        </NameWrapper>
        <StarIcon>
        </StarIcon>
      </HeaderSection>
      <PriceInfoSection>
      </PriceInfoSection>
      <ChartSection>
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
      </ChartSection>
    </Container>
  );
};

export default CoinCardSkelton;

const animate = keyframes`
  to {
      background-position-x: -200%;
  }
`;

// 가격정보
const PriceInfoSection = styled.div`
  box-sizing: border-box;
  width: calc(100% - 2.125rem);
  height: 79px;
  flex-shrink: 0;
  background-color: var(--white-5);
  border-radius: 10px;
  margin: 1.125rem 1.063rem 0 1.063rem;
  padding: 15px 22px;
`;

const Container = styled.div`
  width: 100%;
  height: 29.563rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #26262a80;
  border-radius: 20px;

  & > * > *, ${PriceInfoSection} {
    background: linear-gradient(110deg, var(--white-5) 8%, var(--white-10) 18%, var(--white-5) 33%);
    background-size: 200% 100%;
    animation: ${animate} 1.5s linear infinite;
    background-attachment: fixed;
  }
`;

// 헤더
const HeaderSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  text-decoration: none;
`;

const ThumbnailWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 20px;
`;

const NameWrapper = styled.div`
  margin-left: 17px;
  height: 100%;
  width: 50%;
  border-radius: 0.625rem;
`;

const StarIcon = styled.div`
  color: var(--white-5);
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 21px;
  border-radius: 0.625rem;
`;

// 차트
const ChartSection = styled.div`
  box-sizing: border-box;
  width: calc(100% - 2.125rem);
  height: 254px;
  margin-top: 3.063rem;
  border-radius: 10px;
  display: flex;
  gap: 1.938rem;
  flex-direction: column;
`;

const ChartLine = styled.div`
  width: 100%;
  height: 1px;
`; 