import styled from "styled-components";
import { CommonCard } from "./CommonCardStyle";
import { SubTitle2Typo, SmallCaptionTypo } from "../../styles/Typography";
import CoinCircleImg from "../../../public/assets/DetailPage/CoinProfile.png";
import { CaptionTypoMedium } from "../../styles/Typography";

interface CoinInfoCardProps {
  name: string;
  symbol: string;
  keywords: string[];
  description: string;
  image: string;
}

const CoinInfoCard = ({
  name,
  symbol,
  keywords,
  description,
  image,
}: CoinInfoCardProps) => {
  //const coin = coinDummy[0];

  return (
    <CardLayout>
      <MarginFlexContainer>
        <CircleImageWrapper>
          <Image src={image || CoinCircleImg} alt={`${name} 프로필`} />
          {keywords.map((keyword, index) => (
            <Keyword
              key={index}
              $angle={(index / keywords.length) * 360 + 15}
              $isHighlighted={index === 0 || index === 1}
            >
              #{keyword}
            </Keyword>
          ))}
        </CircleImageWrapper>
      </MarginFlexContainer>

      <FlexContainer>
        <StyledSubTitle2>{name}</StyledSubTitle2>
        <StyledSmallCaption>{symbol.toUpperCase()}</StyledSmallCaption>
      </FlexContainer>

      <FlexContainer>
        <StyledCaption>{description}</StyledCaption>
      </FlexContainer>
    </CardLayout>
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
  margin-bottom: 2.382rem;
`;

const CircleImageWrapper = styled.div`
  position: relative;
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

const Keyword = styled.span<{ $isHighlighted: boolean; $angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.$angle}deg)
    translate(5rem) rotate(-${(props) => props.$angle}deg);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.$isHighlighted ? "#49DF82" : "#DE8DFA"};
  color: white;
  border-radius: 16.5px;
  font-size: 0.85rem;
  height: 33px;
  min-width: 33px;
  padding: 4px 15px;
`;
